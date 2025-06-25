export interface ArchiveEntry {
  name: string;
  type: string;
  lastModified: number;
  size: number;
}

export class Archive {
  readonly checksum: number;
  constructor(buffer: ArrayBufferLike);
  entries(): ArchiveEntry[];
  exists(name: string): boolean;
  file(name: string): File;
}

export function bundle(entries: FileList | File[]): Promise<Uint8Array>;
