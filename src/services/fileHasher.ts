export class FileHasherService {
  static async generateSHA256(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  static async getFileMetadata(file: File) {
    let location = 'Unknown';
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      });
      location = `${position.coords.latitude},${position.coords.longitude}`;
    } catch (error) {
      console.log('Geolocation not available');
    }

    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      timestamp: Date.now(),
      location
    };
  }
}