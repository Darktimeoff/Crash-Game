const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });
let balance = 110;
let bet = undefined;
let timer = 5;
let timerId = undefined;

wss.on('connection', ws => {
    ws.send(JSON.stringify({
        new_balance: {
            balance
        },
    }));

    timerId = setInterval(() => {
        console.log(timer)
        ws.send(JSON.stringify({
            round_countdown: {
                countdown: timer
            }
        }))
        timer -= 1;
    }, 1000);
   

    if (timer <= 0) {
        timer = 5;
        clearInterval(timerId);
        console.log({timer}, 'str 35')
    }

    ws.on('message', data => {
        const clientData = JSON.parse(data);
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                if(clientData.make_bet) bet = clientData.make_bet.value;   
                
            }
        });
    });
});
