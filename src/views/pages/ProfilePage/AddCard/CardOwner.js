import React from 'react';

const CardOwner = ({handleInput, first_name, last_name}) => {
    return (
        <div className='form-group'>
            <label>Cardowner</label>
            <div className='row'>
                <div className='col-xs-6'>
                    <input type='text' className='form-control' placeholder='Your First name' name='first_name' onChange={handleInput} value={first_name} />
                </div>
                <div className='col-xs-6'>
                    <input type='text' className='form-control' placeholder='Your Last name' name='last_name' onChange={handleInput} value={last_name} />
                </div>
            </div>
        </div>
    )
}

export default CardOwner;