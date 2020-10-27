const WebSocket = require('ws')
const balance = 100;
let roundCountDown = 6;
let id = 0;

const server = new WebSocket.Server({
    port: 3000
})

server.on('connection', ws => {
    ws.send(JSON.stringify({balance}));

    if(roundCountDown <= 0) {
        clearTimeout(id);
    }

    ws.on('message', message => {
        server.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN) {
                id = setTimeout(() => {
                    ws.send(JSON.stringify({round_countdown: roundCountDown--}))
                }, 1000);
            }
        })
    })
})