import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const UserMenuList = (props) => {
    const { onLogout, words } = props;

    return (
        <span>
            <p>
                <Link className="link" to={'/score-upload'}>
                    {words.header_upload}
                </Link>
            </p>
            <p>
                <Link className="link" to={'/book'}>
                    {words.header_library}
                </Link>
            </p>
            <p>
                <Link className="link" to="/profile">
                    {words.header_profile}
                </Link>
            </p>
            <p>
                <Link className="link" to="/invitation">
                    {words.general_invitation}
                </Link>
            </p>
            <p onClick={() => onLogout()}>
                <Link className="link red-i" to="/home">
                    {words.header_logout}
                </Link>
            </p>
        </span>
    );
}

export default withRouter(UserMenuList);