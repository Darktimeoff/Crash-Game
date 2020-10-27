import { START_TIMER, RESET_TIMER } from './actionType';

const initialState = {
    balance: 100,
    timer: 5,
    isFinishTimer: false,
    ration: 1.0,
    userRation: undefined,
    endRation: 4.0,
    isTake: false,
    idTimer: undefined,
    idRation: undefined,
    bet: '',
    isBet: false
} 

export const gameReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case START_TIMER: 
            return {
                ...state,
                timer: timer - 1,
                idTimer: payload.id
            }
        case FINISH_TIMER: 
            return {
                ...state,
                isFinishTimer: false,
                timer: 5
            }
        case RESET_TIMER
        default: return state;
    }
}