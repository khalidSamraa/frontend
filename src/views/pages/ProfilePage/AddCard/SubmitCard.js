import React from 'react';
import { Link } from 'react-router-dom';

const SubmitCard = ({ validate }) => {
    return (
        <div className='btns-wrp'>
            <Link className='btn black' to='/profile/creditCards'>«back</Link>
            <button className='btn black' type='submit' disabled={validate}>add</button>
        </div>
    )
}

export default SubmitCard;




