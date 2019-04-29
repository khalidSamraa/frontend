import React from 'react';

import ContextMenu from './ContextMenu';
import OverlayMenu from './OverlayMenu';
import DropDownDynamic from './../../DropDownDynamic';

const ContentMenu = props => {
  let context = true;

  return (
    <DropDownDynamic
      toRight
      closeOnSelect
      triger={
        <div className="open-menu-box">
          <button className="open-menu hamburger">
            <span />
            <span />
            <span />
          </button>
        </div>
      }
    >
      {context ? <ContextMenu {...props} /> : <OverlayMenu {...props} />}
    </DropDownDynamic>
  );
};

export default ContentMenu;
