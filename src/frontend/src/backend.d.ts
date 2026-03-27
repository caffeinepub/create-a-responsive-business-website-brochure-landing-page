export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface PhotoData {
    blob: ExternalBlob;
    name: string;
}
export interface backendInterface {
    addPhoto(id: string, blob: ExternalBlob, name: string): Promise<boolean>;
    removePhoto(id: string): Promise<boolean>;
    getPhotos(): Promise<Array<[string, PhotoData]>>;
    clearPhotos(): Promise<void>;
}
