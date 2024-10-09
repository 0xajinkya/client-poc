import http from "http";

const options = {
  socketPath: '/var/run/docker.sock',
  path: '/v1.47/containers/json',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.write(JSON.stringify({
  Image: 'nodejs',
  Cmd: ['echo', 'hello world']
}));

req.end();
