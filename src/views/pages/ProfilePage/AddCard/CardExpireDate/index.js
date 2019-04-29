import React from 'react';
import DropDown from '../../../../component/DropDown';
import moment from 'moment';

import './styles.css';

const CardExpireDate = ({cvc, handleInput, handleMonth, handleYear, exp_month, exp_year}) => {
    let currentYear = parseInt(moment().format('YY'));
    let arr = Array.from({length: 11}, (v, k) => currentYear + k);

    let month = 1;
    let monthArr = Array.from({length: 12}, (v, k) => month + k);
    
    return (
        <div className='row'>
        <div className='form-group col-xs-6'>
            <div className='card-details'>
                <div className='card-date-wrp'>
                    <label>Сard expiry date</label>
                    <div className='card-date'>
                        <DropDown
                            options={monthArr.map((item) => {
                                return {value: item, label: item};
                            })}
                            onChange={handleMonth}
                            label={exp_month}
                            className='form-control'
                        />
                        <span>/</span>
                        <DropDown
                            options={arr.map((item) => {
                                return {value: item, label: item};
                            })} 
                            onChange={handleYear}
                            label={exp_year}
                            className='form-control'
                        />
                    </div>
                </div>
                <div className='security-code'>
                    <label >Security code</label>
                    <input type='text' className='form-control' name='cvc' value={cvc} onChange={handleInput} />
                </div>
            </div>
        </div>
    </div>
    );
}

export default CardExpireDate;






