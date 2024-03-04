const HOST = 'lexart-backend-delta.vercel.app';

async function fetchAPI(path, callback, options) {
  try {
    const response = await fetch(`https://${HOST}${path}`, options);
    const data = await response.json();
    callback(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAPI(path, callback, token) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  };
  await fetchAPI(path, callback, options);
}

export async function postAPI(path, callback, body, token) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(body),
  };
  await fetchAPI(path, callback, options);
}

export async function putAPI(path, callback, body, token = '') {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(body),
  };
  await fetchAPI(path, callback, options);
}

export async function deleteAPI(path, token) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  };

  try {
    await fetch(`https://${HOST}${path}`, options);
  } catch (error) {
    console.log(error);
  }
}