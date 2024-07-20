class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // 緯度と経度を持つオブジェクト
    this.id = new Date().toString() + Math.random().toString();
  }
}
