const WebSocket = require('ws');

let wss = new WebSocket.Server({ port: 3030 });
let balance = 120;
let bet = undefined;
let timer = 5
let ration = 1.0;
let rationEnd = getRandomEndRation(1, 20);
let rationIds = [];
let timerId = undefined;
let timersId = [];

wss.on('connection', ws => {
    ws.on('message', data => {
        const clientData = JSON.parse(data);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                if(clientData.make_bet) {
                    bet = clientData.make_bet.value;

                    rationIds.push(setInterval(rationGenerator, 40));

                    clearIntervals(timersId);
                } 
                if(clientData.take) {

                    clearIntervals(rationIds);

                    if((ration - 0.1) < rationEnd) {
                        balance = Math.round(balance + ((ration - 0.1) * bet));
                        const json = JSON.stringify({
                            new_balance: {
                                balance
                            },
                            user_ration: {
                                ration: +(ration - 0.1).toFixed(1)
                            }, 
                            user_win: {

                            }
                        });
                        wss.clients.forEach(client => {
                            client.send(json);
                        });
                    } else {
                        balance -= bet;
                        wss.clients.forEach(client => {
                            client.send(JSON.stringify({
                                new_balance: {
                                    balance
                                },
                                user_ration: {
                                    ration: +(ration - 0.1).toFixed(1)
                                }
                            }));
                        });
                    }
                    setTimeout(() => {
                        bet = undefined;
                        rationIds = [];
                        timer = 5;
                        ration = 1.0;
                        rationEnd = getRandomEndRation(1, 20);
                        timerId = undefined;
                        timersId= [];
                        timerId = setInterval(initTimer, 1000);
                        timersId.push(timerId);
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
        }, 
        end_ration: {
            ration: Number(rationEnd.toFixed(1))
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

    ration = Number((ration + 0.1).toFixed(1))
}

function clearIntervals(ids) {
    ids.forEach(id => {
        clearInterval(id);
    });
}

function getRandomEndRation(min, max) {
    return Math.random() * (max - min) + min;
}

timerId = setInterval(initTimer, 1000);
