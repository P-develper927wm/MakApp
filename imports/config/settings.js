// If you're running on a device or in the Android simulator be sure to change
let METEOR_URL = 'wws://dev.knotel.com/websocket';
if (process.env.NODE_ENV === 'production') {
  METEOR_URL = 'ws://dev.knotel.com/websocket'; // your production server url
}

export const settings = {
  env: process.env.NODE_ENV,
  METEOR_URL,
};

export default settings;
