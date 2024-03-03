const HOST = 'lexart-backend-delta.vercel.app';

export default async function fetchAPI(path, callback, options) {
  try {
    const response = await fetch(`https://${HOST}${path}`, options);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
}