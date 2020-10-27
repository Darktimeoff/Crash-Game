import { START_TIMER, RESET_TIMER } from './actionType';

const initialState = {
   /*  balance: 100,
    timer: 5,
    isFinishTimer: false,
    ration: 1.0,
    userRation: undefined,
    endRation: 4.0,
    isTake: false,
    idTimer: undefined,
    idRation: undefined,
    bet: '',
    isBet: false */
} 

export const gameReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        default: return state;
    }
}