import React from 'react';

const NewFooter = ({ActiveLanguageReducer}) => {
    const {words} = ActiveLanguageReducer;
    return (
        <footer className='new-footer'>
            <div className='container'>
                <div className='content'>
                    <ul className='nav-menu'>
                        <li><img src='/media/images/icon/Logo_svg.svg' width='20' height='20' /></li>
                        <li><a href='#'>Help</a></li>
                        <li><a href='#'>{words.general_contact}</a></li>
                        <li><a href='#'>Privacy</a></li>
                        <li><a href='#'>{words.general_imprint}</a></li>
                        <li><a href='#'>Copyright</a></li>
                    </ul>
                    <div className='copy-right'>© 2018 - {new Date().getFullYear()} dimusco</div>
                </div>
            </div>
        </footer>
    )
}

export default NewFooter;