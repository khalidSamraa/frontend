import React from 'react';

const Image = ({ icon, isLoading, togglePreviewMode }) => (
  <div className="col-md-4 col-xs-12">
    {isLoading ? null : (
      <img
        className="product-image"
        src={icon}
        alt={'Preview'}
        width="360"
        height="480"
        onClick={togglePreviewMode}
      />
    )}
  </div>
);

export default Image;
