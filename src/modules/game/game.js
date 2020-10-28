import React, {useEffect} from 'react';
import './game.scss';
import { Text } from './../../components/text/text';
import { Input } from './../../components/input/input';
import { Button } from './../../components/Button/Button';
import { Line } from './../../components/line/line';
import { connect } from 'react-redux';
import { changeBalance, 
    changeTimer, 
    changeIsFinishTimer, 
    changeBet, 
    changeIsBet, 
    changeEndRation, 
    changeUserRation, 
    changeIsTake, 
    changeRation, 
    reset, buttonClickHandler, 
    inputHandler 
} from './actionCreators';
import { ws } from '../..';
import { InitTimer } from './../../components/initTimer/initTimer';
import { WinGame } from './../../components/winGame/winGame';
import { CrashGame } from './../../components/crashGame/crashGame';



const Game = (props) => {
    const userWin = props.userRation < props.endRation;
    useEffect(() => {
        ws.onopen = () => {
            console.log('connected');
        }
        ws.onmessage = response => {
            const message = JSON.parse(response.data);
            if(message.new_balance && message.user_ration) {
                console.log(message)
                props.setBalance(message.new_balance.balance);
                props.setUserRation(message.user_ration.ration);
                props.setEndRation(message.end_ration.ration);
                setTimeout(() => {
                    props.setReset();
                }, 5000);
                return;
            }
            if(message.round_countdown && message.new_balance) {
                props.setTimer(message.round_countdown.countdown);
                props.setBalance(message.new_balance.balance);
            }
            if(message.multiplier_update) props.setRation(message.multiplier_update.multiplier)
        }
        ws.onclose = () => {
            console.log('disconnected');
        }
    }, [props]);

    useEffect(() => {
        if(props.timer > 0) {
            props.setIsFinishTimer(false);
            return;
        }
        props.setIsFinishTimer(true);
        props.setBet('')
    }, [props.timer, props]);

    return (
        <div className='game'>
            <div className='game_wrapper'>
                <div className='game_item'>
                    {props.isBet || props.isTake ? null : <InitTimer timer={props.timer} />}
                    {props.isBet && !props.isTake ? <Text style={{marginTop:20}}color='ration'>{'x'+props.ration}</Text> : null}
                    {(props.isTake && userWin) &&  <WinGame bet={props.bet} endRation={props.endRation} userRation={props.userRation}/>}
                    {(props.isTake && !userWin) && <CrashGame ration={props.ration} />}
                  
                </div>
                <Line />
                <div className='game_item'>
                    <div className='game_balance'>
                        <Text>BALANCE</Text>
                        <Text style={{fontWeight: 700, textAlign: 'left', fontSize: 32, marginTop: 15}}>{'$'+props.balance}</Text>
                    </div>
                    <Input placeholder='BET VALUE' onChange={props.inputHandler} value={props.bet} disabled={props.isFinishTimer || props.isBet || props.isTake}/>
                    <Button onClick={props.buttonClickHandler} color={props.isBet && !props.isTake ? 'danger' : 'default'} disabled={props.isFinishTimer || props.isTake}>{props.isBet && !props.isTake ? 'Take' : 'PLACE A BET'}</Button>
                </div>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTimer: (time) => dispatch(changeTimer({time})),
        setBalance: (balance) => dispatch(changeBalance({balance})),
        setIsFinishTimer: (isFinishTimer) => dispatch(changeIsFinishTimer({isFinishTimer})),
        setBet: (bet) => dispatch(changeBet({bet})),
        setIsBet: (isBet) => dispatch(changeIsBet({isBet})),
        setIsTake: (isTake) => dispatch(changeIsTake({isTake})),
        setEndRation: (endRation) => dispatch(changeEndRation({endRation})),
        setRation: (ration) => dispatch(changeRation({ration})),
        setUserRation: (userRation) => dispatch(changeUserRation({userRation})),
        setReset: () => dispatch(reset()),
        inputHandler,
        buttonClickHandler
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)