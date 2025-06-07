import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  OnApplicationShutdown,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService
  extends ConsoleLogger
  implements LoggerService, OnApplicationShutdown
{
  private readonly logFile = path.resolve(process.cwd(), 'logs', 'app.log');
  private readonly errorLogFile = path.resolve(
    process.cwd(),
    'logs',
    'error.log',
  );
  private readonly logLevel = parseInt(process.env.LOG_LEVEL || '2', 10);
  private readonly maxFileSize = parseInt(
    process.env.LOG_FILE_MAX_SIZE || '1024',
    10,
  );

  constructor() {
    super();
    this.ensureLogDirectory();
    this.setupGlobalErrorHandlers();
  }

  private ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  }

  private setupGlobalErrorHandlers() {
    process.on('uncaughtException', (error) =>
      this.logError('Uncaught Exception', error),
    );
    process.on('unhandledRejection', (reason) =>
      this.logError('Unhandled Rejection', reason),
    );
  }

  logRequest(url: string, method: string, body: any) {
    this.writeLog(
      'log',
      `Request: ${method} ${url} - Body: ${JSON.stringify(body)}`,
    );
  }

  logError(message: string, error: any) {
    this.writeLog('error', `${message}: ${error.message}`, error.stack);
  }

  logWarning(message: string) {
    this.writeLog('warn', `Warning: ${message}`);
  }

  private writeLog(level: string, message: string, ...params: any[]) {
    if (this.getLevelPriority(level) > this.logLevel) return;

    const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message} ${params.map((p) => JSON.stringify(p)).join(' ')}\n`;
    const logFilePath = level === 'error' ? this.errorLogFile : this.logFile;

    this.rotateFileIfNeeded(logFilePath);
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
    process.stdout.write(logEntry);
  }

  private rotateFileIfNeeded(filePath: string) {
    if (
      fs.existsSync(filePath) &&
      fs.statSync(filePath).size / 1024 > this.maxFileSize
    ) {
      fs.renameSync(filePath, `${filePath}.${Date.now()}`);
    }
  }

  private getLevelPriority(level: string): number {
    return { error: 0, warn: 1, log: 2, verbose: 3 }[level] ?? 3;
  }

  onApplicationShutdown() {
    this.writeLog('log', 'Application shutting down');
  }
}
