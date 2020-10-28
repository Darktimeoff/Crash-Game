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
    RESET
} from './actionType';
const initialState = {
    balance: 0,
    timer: 5,
    isFinishTimer: false,
    ration: 1.0,
    userRation: 0,
    endRation: 0,
    isTake: false,
    bet: '',
    isBet: false
} 

export const gameReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case CHANGE_TIMER:
            return {
                ...state,
                timer: payload.time
            }
        case CHANGE_BALANCE: 
            return {
                ...state,
                balance: payload.balance
            }
        case CHANGE_IS_FINISH_TIMER:
            return {
                ...state,
                isFinishTimer: payload.isFinishTimer
            }
        case CHANGE_BET: 
            return {
                ...state,
                bet: payload.bet
            }
        case CHANGE_IS_BET:
            return {
                ...state,
                isBet: payload.isBet
            }
        case CHANGE_IS_TAKE:
            return {
                ...state,
                isTake: payload.isTake
            }
        case CHANGE_END_RATION: 
            return {
                ...state,
                endRation: payload.endRation
            }
        case CHANGE_RATION: 
            return {
                ...state,
                ration: payload.ration
            }
        case CHANGE_USER_RATION: 
            return {
                ...state,
                userRation: payload.userRation
            }
        case RESET:
            return {
                ...initialState,
                balance: state.balance
            }
        default: return state;
    }
}