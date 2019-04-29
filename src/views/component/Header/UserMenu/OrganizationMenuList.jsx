import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

const OrganizationMenuList = (props) => {
    const {
        words,
        isLoginAsInstitution,
        isLoginAsEnsemble,
        isLoginAsPublisher,
        onLogout } = props;
    let linkManage, linkLibrary;

    if (isLoginAsInstitution) {
        linkManage = '/institution';
        linkLibrary = '/assignment';
    } else if (isLoginAsEnsemble) {
        linkManage = '/ensemble';
        linkLibrary = '/assignment';
    } else if (isLoginAsPublisher) {
        linkManage = '/publisher';
        linkLibrary = '/pub-library';
    }

    return (
        <span>
            <p>
                <Link className="link" to={linkLibrary}>
                    {words.header_library}
                </Link>
            </p>
            {
                isLoginAsInstitution && isLoginAsEnsemble &&
                <p>
                    <Link className="link" to="/layers">
                        {words.header_layers}
                    </Link>
                </p>
            }
            <p>
                <Link className="link" to={linkManage}>
                    {words.header_manage}
                </Link>
            </p>
            <p>
                <Link className="link" to="/score-upload">
                    {words.header_upload}
                </Link>
            </p>
            {
                isLoginAsPublisher &&
                <Fragment>
                    <p>
                        <Link className="link" to="/set-price">
                            {words.header_set_price}
                        </Link>
                    </p>
                    <p>
                        <Link className="link" to="/set-discount">
                            {words.header_set_discount}
                        </Link>
                    </p>
                </Fragment>
            }
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
            {isLoginAsInstitution && 
                <p>
                    <Link className="link" to="/layers">
                        {words.general_layers}
                    </Link>
                </p>
            }
            <p onClick={() => onLogout()}>
                <Link className="link red-i" to="/home">
                    {words.header_logout}
                </Link>
            </p>
        </span>
    );
}

export default withRouter(OrganizationMenuList);