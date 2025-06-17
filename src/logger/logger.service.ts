import {
  ConsoleLogger,
  Injectable,
  OnApplicationShutdown,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService
  extends ConsoleLogger
  implements OnApplicationShutdown
{
  private readonly logFile: string = path.resolve(
    process.cwd(),
    'logs',
    'app.log',
  );
  private readonly errorLogFile: string = path.resolve(
    process.cwd(),
    'logs',
    'error.log',
  );
  private readonly logLevel: number = Number(process.env.LOG_LEVEL) || 2;
  private readonly maxFileSize: number =
    Number(process.env.LOG_FILE_MAX_SIZE) || 1024;

  constructor() {
    super();
    this.ensureLogDirectory();
    this.setupGlobalErrorHandlers();
  }

  private ensureLogDirectory(): void {
    fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
  }

  private setupGlobalErrorHandlers(): void {
    process.on('uncaughtException', (error: Error) =>
      this.error('Uncaught Exception', error),
    );
    process.on('unhandledRejection', (reason: unknown) =>
      this.error('Unhandled Rejection', reason),
    );
  }

  log(message: string, ...params: unknown[]): void {
    this.writeLog('log', message, params);
  }

  error(message: string, ...params: unknown[]): void {
    this.writeLog('error', message, params);
  }

  warn(message: string, ...params: unknown[]): void {
    this.writeLog('warn', message, params);
  }

  verbose(message: string, ...params: unknown[]): void {
    this.writeLog('verbose', message, params);
  }

  private writeLog(level: string, message: string, params: unknown[]): void {
    if (this.getLevelPriority(level) > this.logLevel) return;

    const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message} ${params.map((p) => JSON.stringify(p)).join(' ')}\n`;
    const filePath = level === 'error' ? this.errorLogFile : this.logFile;

    this.rotateFileIfNeeded(filePath);
    fs.appendFileSync(filePath, logEntry, 'utf8');
    process.stdout.write(logEntry);
  }

  private rotateFileIfNeeded(filePath: string): void {
    if (
      !fs.existsSync(filePath) ||
      fs.statSync(filePath).size / 1024 < this.maxFileSize
    )
      return;
    fs.renameSync(filePath, `${filePath}.${Date.now()}`);
  }

  private getLevelPriority(level: string): number {
    return { error: 0, warn: 1, log: 2, verbose: 3 }[level] ?? 3;
  }

  onApplicationShutdown(): void {
    this.log('Application shutting down');
  }
}
