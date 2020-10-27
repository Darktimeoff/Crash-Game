import React from 'react';
import './game.scss';
import { Text } from './../../components/text/text';
import { Input } from './../../components/input/input';
import { Button } from './../../components/Button/Button';
import { Line } from './../../components/line/line';
import { connect } from 'react-redux';

export const Game = (props) => {
    return (
        <div className='game'>
            <div className='game_wrapper'>
                <div className='game_item'>
                    <Text>BE READY FOR A ROUND</Text>
                    <Text style={{ fontSize: 40, marginTop: 50 }}>5</Text>
                </div>
                <Line />
                <div className='game_item'>
                    <div className='game_balance'>
                        <Text>BALANCE</Text>
                        <Text style={{fontWeight: 700, textAlign: 'left', fontSize: 32, marginTop: 15}}>$110</Text>
                    </div>
                    <Input placeholder='BET VALUE'/>
                    <Button color='default'>PLACE A BET</Button>
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