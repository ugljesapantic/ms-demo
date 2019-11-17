import { fbAuth } from "../App";

const parseParams  = (obj) => Object
  .keys(obj)
  .filter(key => obj[key] !== null && obj[key] !== undefined)
  .map(key => `${key}=${obj[key]}`).join('&')

export default async (base, method, params, body, withToken)  => {
  if (withToken) {
    const token = await fbAuth.currentUser.getIdToken(true);
    if (!params) params = {};
    params.token = token;
  }
  const url = params && Object.keys(params).length ? `${base}?${parseParams(params)}` : base;
  const response = await fetch(`https://us-central1-ms-demo-f173d.cloudfunctions.net/${url}`, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body && JSON.stringify(body)
  });

  return await response.json(); 
}