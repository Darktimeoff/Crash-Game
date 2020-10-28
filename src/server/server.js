const WebSocket = require('ws');

let wss = new WebSocket.Server({ port: 3030 });
let balance = 120;
let bet = undefined;
let timer = 5
let ration = 1.0;
let rationEnd = getRandomEndRation(1, 20);
let rationIds = [];
let timerId = undefined;

wss.on('connection', ws => {
    ws.on('message', data => {
        const clientData = JSON.parse(data);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                console.log('enter'); 
                if(clientData.make_bet) {
                    bet = clientData.make_bet.value;
                    rationIds.push(setInterval(rationGenerator, 40));
                    console.log(bet)
                } 
                if(clientData.take) {
                    rationIds.forEach(id => {
                        clearInterval(id);
                    });

                    rationGenerator = () => {};
            
                    if((ration - 0.1) < rationEnd) {
                        const json = JSON.stringify({
                            new_balance: {
                                balance: Math.round(balance + ((ration - 0.1) * bet))
                            },
                            user_ration: {
                                ration: +(ration - 0.1).toFixed(1)
                            }, 
                            end_ration: {
                                ration: rationEnd.toFixed(1)
                            }
                        });
                        wss.clients.forEach(client => {
                            client.send(json);
                        });
                    } else {
                        wss.clients.forEach(client => {
                            client.send(JSON.stringify({
                                new_balance: {
                                    balance: balance - bet
                                },
                                user_ration: {
                                    ration: +(ration - 0.1).toFixed(1)
                                },
                                end_ration: {
                                    ration: rationEnd.toFixed(1)
                                }
                            }));
                        });
                    }
                    setTimeout(() => {
                        bet = undefined;
                        rationIds = [];
                        timer = 5
                        rationEnd = 4.0;
                        timerId = undefined;
                    }, 5000);
                }
            }
        });
    });
});

function initTimer() {
    if(bet) {
        clearInterval(timerId);
        return;
    }

    let json = JSON.stringify({
        new_balance: {
            balance
        },
        round_countdown: {
            countdown: timer
        }
    });

    wss.clients.forEach(client => {
        client.send(json);
        console.log('Sent: ' + json);
    });

    timer -= 1
    if (timer < 0) {
        timer = 5;
    }
}

function rationGenerator() {
    let json = JSON.stringify({
        multiplier_update: {
            multiplier: ration
        }
    });
    wss.clients.forEach(client => {
        client.send(json);
        console.log('sent' + json); 
    });

    ration = Number(+ration + 0.1).toFixed(1);
}

function getRandomEndRation(min, max) {
    return Math.random() * (max - min) + min;
}

timerId = setInterval(initTimer, 1000);
