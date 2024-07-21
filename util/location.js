const GOOGLEAPI_KEY = "AIzaSyB-FMlPktcL4Rd-FlTBHWqi-8g3gfmXJK4";
export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLEAPI_KEY}`;
  return imagePreviewUrl;
}
