const parseParams  = (obj) => Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')

export default async (base, method, params, body)  => {
    const url = params ? `${base}?${parseParams(params)}` : base;
    // const response = await fetch(`http://localhost:5000/ms-demo-f173d/us-central1/${url}`, {
    const response = await fetch(`https://us-central1-ms-demo-f173d.cloudfunctions.net/${url}`, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return await response.json(); 
}