import React from 'react';

import MobileCart from './MobileCart';
import UserMenu from './UserMenu';

// todo figure out what is toggleSnackbarLanguage?
const Language = () => (
  <div className="lang-box text-center" role="button" onClick={() => {}}>
    <span className="material-icons lang-icon dp32">language</span>
  </div>
);

const MobileMenu = props => {
  const { countCart, previewMode } = props;

  return (
    <div className="row menu-mobile">
      <div className="col-md-4 col-sm-4 col-xs-4">
        <MobileCart countCart={countCart} previewMode={previewMode} />
      </div>
      <div className="col-md-4 col-sm-4 col-xs-4">
        <UserMenu />
      </div>
      <div className="col-md-4 col-sm-4 col-xs-4">
        {/* Lang */}
        <Language />
      </div>
    </div>
  );
};

export default MobileMenu;
