export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = {lat: location.lat, lng: location.lng}; // 緯度と経度を持つオブジェクト
    this.id = new Date().toString() + Math.random().toString();
  }
}
