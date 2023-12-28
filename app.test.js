const net = require('net');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        myEmitter.emit('request', data, socket);
    });
});

myEmitter.on('request', (data, socket) => {
    console.log(`Received data: ${data}`);
    socket.end('Hello from custom server!\n');
});

server.listen(3002, () => {
    console.log('Server listening on port 3002');
});
