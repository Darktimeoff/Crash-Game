import { ws } from '../../index';
import { store } from './../../store';
import { 
    CHANGE_TIMER, 
    CHANGE_BALANCE, 
    CHANGE_IS_FINISH_TIMER, 
    CHANGE_BET, 
    CHANGE_IS_BET, 
    CHANGE_IS_TAKE,
    CHANGE_END_RATION,
    CHANGE_RATION,
    CHANGE_USER_RATION,
    CHANGE_IS_WIN,
    RESET
} from './actionType';

export function changeTimer(payload) {
    return {
        type: CHANGE_TIMER,
        payload
    }
}
export function changeBalance(payload) {
    return {
        type: CHANGE_BALANCE,
        payload
    }
}
export function changeIsFinishTimer(payload) {
    return {
        type: CHANGE_IS_FINISH_TIMER,
        payload
    }
}

export function changeBet(payload) {
    return {
        type: CHANGE_BET,
        payload
    }
}

export function changeIsBet(payload) {
    return {
        type: CHANGE_IS_BET,
        payload
    }
}

export function changeIsTake(payload) {
    return {
        type: CHANGE_IS_TAKE,
        payload
    }
}

export function changeEndRation(payload) {
    return {
        type: CHANGE_END_RATION,
        payload
    }
}

export function changeRation(payload) {
    return {
        type: CHANGE_RATION,
        payload
    }
}

export function changeUserRation(payload) {
    return {
        type: CHANGE_USER_RATION,
        payload
    }
}
export function changeIsWin() {
    return {
        type: CHANGE_IS_WIN,
    }
}

export function reset() {
    return { 
        type: RESET
    }
}

export const buttonClickHandler = () => {
    const state = {...store.getState()}
    const {dispatch} = store;

    if(!state.isTake && state.isBet) {
        dispatch(changeIsTake({isTake: true}));
        dispatch(changeIsBet({isBet: false}));
        dispatch(changeUserRation({userRation: state.ration}));
        ws.send(JSON.stringify({take: {}}));
        return;
    }

    dispatch(changeIsBet({isBet: true}));
    ws.send(JSON.stringify({make_bet: {
        value: state.bet
    }}));
}

export const inputHandler =({target}) => {
    const state = {...store.getState()}
    const {dispatch} = store;

    if(Number(target.value) >= state.balance) {
        dispatch(changeBet({bet: state.balance}));
        return;
    }

    dispatch(changeBet({bet: target.value}));
}