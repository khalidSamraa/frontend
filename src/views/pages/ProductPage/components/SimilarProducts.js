import React from 'react';
import OwlCarousel from 'react-owl-carousel';

import SimilarProductRow from './SimilarProductRow';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const SimilarProducts = props => {
  const { words, rows, loadProduct, imgLoadQueue, history } = props;
  const responsiveBreakpoints = {
    0: {
      items: 1
    },
    440: {
      items: 2
    },
    767: {
      items: 3
    },
    991: {
      items: 4
    },
    1199: {
      items: 5
    }
  };

  if (!rows || !rows.length) return null;

  return (
    <React.Fragment>
      <h4 className="simular-book text-center">
        {words.product_similar_score}
      </h4>
      <div className="slider-wrp">
        <OwlCarousel
          className="owl-theme"
          margin={8}
          nav
          items={6}
          dots={false}
          responsive={responsiveBreakpoints}
        >
          {rows.map(row => (
            <SimilarProductRow
              key={row.sid}
              words={words}
              rowData={row}
              history={history}
              loadProduct={loadProduct}
              imgLoadQueue={imgLoadQueue}
            />
          ))}
        </OwlCarousel>
      </div>
    </React.Fragment>
  );
};

export default SimilarProducts;
