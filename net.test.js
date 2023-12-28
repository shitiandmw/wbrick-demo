const net = require('net');

const proxyServer = net.createServer(clientSocket => {
    const targetSocket = net.createConnection({
        host: 'localhost',
        port: TARGET_PORT // 目标端口
    });

    clientSocket.pipe(targetSocket);
    targetSocket.pipe(clientSocket);

    clientSocket.on('error', err => console.error('Client Socket Error:', err));
    targetSocket.on('error', err => console.error('Target Socket Error:', err));
});


const LISTEN_PORT = 8000; // 代理服务器监听端口
const TARGET_PORT = 3000; // 目标服务器端口

proxyServer.listen(LISTEN_PORT, () => {
    console.log(`Proxy server is running on port ${LISTEN_PORT}`);
});


