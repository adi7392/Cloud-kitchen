/**
 * Gets the current GPS coordinates of the device via browser geolocation.
 */
export async function getCurrentGPSPosition() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      return reject(new Error("GEOLOCATION_UNSUPPORTED"));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          reject(new Error("LOCATION_PERMISSION_DENIED"));
        } else {
          reject(new Error("GEOLOCATION_ERROR"));
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}
