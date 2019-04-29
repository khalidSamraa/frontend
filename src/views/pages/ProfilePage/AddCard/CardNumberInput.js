import React from 'react';

const CardNumberComponent = ({number, handleInput, cardType}) => {
    return (
        <div className='row'>
            <div className='form-group col-xs-6 card-number'>
                <label>Add number card</label>
                <input type='text' className={`form-control ${number && 'valid'}`} name='number' value={number} onChange={handleInput} onKeyDown={handleInput} />
                {cardType === 'all' ? 
                    <ul className='all-cards'>
                        <li><i className='card-icon visa' /></li>
                        <li><i className='card-icon master' style={{right: '57px'}} /></li>
                        <li><i className='card-icon american-express' style={{right: '129px'}} /></li>
                        <li><i className='card-icon discover' style={{right: '93px'}} /></li>
                        <li><i className='card-icon diners-club' style={{right: '165px'}} /></li>
                    </ul>
                : 
                    <i className={`card-icon ${cardType}`} />
                }
            </div>
        </div>
    );
}

export default CardNumberComponent;