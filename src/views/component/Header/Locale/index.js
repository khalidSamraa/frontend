import React, { useState } from 'react';

import DropDownDynamic from '../../DropDownDynamic';
import LanguageRow from './LanguageRow';
import CurrencyRow from './CurrencyRow';

// make it a PureComponent
const Locale = props => {
  const [isLanguageOpened, setIsLanguageOpened] = useState(false);
  const [isCurrencyOpened, setIsCurrencyOpened] = useState(false);
  const { isLogin } = props;

  const toogleLanguage = isOpened => {
    setIsLanguageOpened(isOpened);
    setIsCurrencyOpened(false);
  };

  const toogleCurrency = isOpened => {
    setIsCurrencyOpened(isOpened);
    setIsLanguageOpened(false);
  };

  return (
    <div className={`lang-box pointer col-md-${isLogin ? '4' : '12'}`}>
      <DropDownDynamic toRight triger={<span className="world-icon" />}>
        <section className="context-menu-dekstop ctx-lang">
          <div className="context-menu-inner">
            <LanguageRow isOpened={isLanguageOpened} toogle={toogleLanguage} />
            <CurrencyRow isOpened={isCurrencyOpened} toogle={toogleCurrency} />
          </div>
        </section>
      </DropDownDynamic>
    </div>
  );
};

export default Locale;
