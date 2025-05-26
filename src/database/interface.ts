export interface User {
  readonly id: string;
  login: string;
  password: string;
  version: number;
  readonly createdAt: number;
  updatedAt: number;
}

export interface Artist {
  readonly id: string;
  name: string;
  grammy: boolean;
}

export interface Album {
  readonly id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface Track {
  readonly id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Favorites {
  artists: string[] | null;
  albums: string[] | null;
  tracks: string[] | null;
}
