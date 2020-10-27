import React, {useState, useEffect, useRef} from 'react';
import './game.scss';
import { Text } from './../../components/text/text';
import { Input } from './../../components/input/input';
import { Button } from './../../components/Button/Button';
import { Line } from './../../components/line/line';
import { connect } from 'react-redux';
import { ws } from '../../index';



export const Game = (props) => {
    const [balance, setBalance] = useState(100);
    const [timer, setTimer] = useState(5);
    const [isFinishTimer, setIsFinishTimer] = useState(false);
    const [ration, setRation] = useState(1.0);
    const [userRation, setUserRation] = useState(undefined);
    const [endRation, setEndRation] = useState(4.0);
    const [isTake, setIsTake] = useState(false)
    const idTimer = useRef(0);
    const idRation = useRef(undefined);
    const [bet, setBet] = useState('');
    const [isBet, setIsBet] = useState(false);

    const inputHandler = ({target}) => {
        if(Number(target.value) >= balance) {
            setBet(balance);
            return;
        }
        setBet(target.value)
    }

    const buttonClickHandler = ({target}) => {
        if(!isTake && isBet) {
            setIsTake(true);
            setIsBet(false);
            setUserRation(ration);
        }
        setIsBet(true);
        clearTimeout(idTimer.current);
    }


    useEffect(() => {
        if(timer <= 0) {
            setIsFinishTimer(true);
            setTimeout(() => {
                setIsFinishTimer(false);
                setTimer(5);
            }, 5000)
            clearTimeout(idTimer.current);
            return;
        }

        idTimer.current = setTimeout(() => {
            setTimer(prevState => prevState - 1)
        }, 1000)
    }, [timer])

    useEffect(() => {
        if(!isBet) return;
        idRation.current = setTimeout(() => {
            setRation(prevState => {
                const number = prevState + 0.1;
                return Number(number.toFixed(1));
            });
        }, 40)
    }, [isBet, ration])

    useEffect(() => {
        if(!userRation) return;
        if(userRation < endRation) {
            setBalance(prevState => prevState += bet * userRation);
        } else {
            setBalance(prevState => prevState - bet);
        }
        setTimeout(() => {
            setIsBet(false);
            setIsTake(false);
            setTimer(5);
            setRation(1.0);
            setUserRation(undefined)
            idTimer.current = undefined;
            idRation.current = undefined;
        }, 5000);
        setBet('');
        clearTimeout(idRation.current);
    }, [userRation]); 

    return (
        <div className='game'>
            <div className='game_wrapper'>
                <div className='game_item'>
                    {isBet || isTake ? null : <Text>BE READY FOR A ROUND</Text>}
                    <Text style={{ fontSize: 40, marginTop: 20 }} color={isBet ? 'ration' : ''}>{isBet ? 'x'+ration : timer}</Text>
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
function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game)