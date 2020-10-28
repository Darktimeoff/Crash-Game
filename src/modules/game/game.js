import React, {useState, useEffect, useCallback} from 'react';
import './game.scss';
import { Text } from './../../components/text/text';
import { Input } from './../../components/input/input';
import { Button } from './../../components/Button/Button';
import { Line } from './../../components/line/line';
import { connect } from 'react-redux';
import { parseJSON } from '../../utils';
import WebSocket from 'isomorphic-ws';



export const Game = (props) => {
    const [balance, setBalance] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isFinishTimer, setIsFinishTimer] = useState(false);
    const [ration, setRation] = useState(1.0);
    const [userRation, setUserRation] = useState(undefined);
    const [endRation, setEndRation] = useState(undefined);
    const [isTake, setIsTake] = useState(false);
    const [bet, setBet] = useState('');
    const [isBet, setIsBet] = useState(false);
    const [ws, setWs] = useState(new WebSocket('ws://localhost:3030'));
    const title = { fontSize: 40, marginTop: 20 };

    useEffect(() => {
        ws.onopen = () => {
            console.log('connected');
        }
        ws.onmessage = response => {
            const message = parseJSON(response.data);
            if(message.new_balance && message.user_ration) {
                console.log(message)
                useMemo()
                setUserRation(message.user_ration.ration);
                setEndRation(message.end_ration.ration);
                setTimeout(() => {
                    setIsBet(false);
                    setIsTake(false);
                    setTimer(5);
                    setRation(1.0);
                    setUserRation(undefined)
                    setBet('')
                }, 5000);
            }
            if(message.round_countdown && message.new_balance) {
                setTimer(message.round_countdown.countdown);
                setBalance(message.new_balance.balance);
            }
            if(message.multiplier_update) setRation(message.multiplier_update.multiplier)
        }
        ws.onclose = () => {
            console.log('disconnected');
            setWs(new WebSocket('ws://localhost:3000'))
        }
    }, []);

    const inputHandler =({target}) => {
        if(Number(target.value) >= balance) {
            setBet(balance);
            return;
        }
        setBet(target.value)
    }

    const buttonClickHandler = () => {
        if(!isTake && isBet) {
            setIsTake(true);
            setIsBet(false);
            setUserRation(ration);
            ws.send(JSON.stringify({take: {}}));
        }
        setIsBet(true);
        ws.send(JSON.stringify({make_bet: {
            value: bet
        }}));
    }

    useEffect(() => {
        if(timer > 0) {
            setIsFinishTimer(false);
            return;
        }
        setIsFinishTimer(true);
        setBet('')
    }, [timer]);

    console.log('1')
    return (
        <div className='game'>
            <div className='game_wrapper'>
                <div className='game_item'>
                    {isBet || isTake ? null : <Text>BE READY FOR A ROUND</Text>}
                    {
                        isTake && (userRation < endRation) ? 
                                <Text style={title} color={isBet ? 'ration' : ''}>{'x'+endRation}</Text> 
                              : <Text style={isBet ? title :  {...title, marginTop: 50 }} color={isBet ? 'ration' : ''}>{isBet ? 'x'+ration : timer}</Text>
                    }

                    {isTake && (userRation < endRation) ? <Text style={{ fontSize: 30, color: '#00C208'}}>Won ${bet} x{userRation}</Text> : null}
                    {isTake && (userRation > endRation) ? <Text style={{ fontSize: 30, color: '#C20000'}}>Crashed you lose</Text> : null}
                </div>
                <Line />
                <div className='game_item'>
                    <div className='game_balance'>
                        <Text>BALANCE</Text>
                        <Text style={{fontWeight: 700, textAlign: 'left', fontSize: 32, marginTop: 15}}>{'$'+balance}</Text>
                    </div>
                    <Input placeholder='BET VALUE' onChange={inputHandler} value={bet} disabled={isFinishTimer || isBet}/>
                    <Button onClick={buttonClickHandler} color={isBet && !isTake ? 'danger' : 'default'} disabled={isFinishTimer}>{isBet && !isTake ? 'Take' : 'PLACE A BET'}</Button>
                </div>
            </div>
        </div>
    )
}

