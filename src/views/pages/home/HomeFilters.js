import React from 'react';
import ComposerList from "./component/ComposerList.js";
import InstrumentList from "./component/InstrumentList.js";
import CategoryList from "./component/CategoryList.js";
import EditionList from "./component/EditionList.js";
import Duration from "./component/Duration.js";
import classnames from "classnames";

const HomeFilters = ({toggleTab, activeTabIndex, handleComposerClick, lang, props, words}) => {
    return (
        <div className="search-controls">
            <ul id="tab" className=" row jtab-ul">
                <li onClick={()=>toggleTab(1)} className={classnames("col-xs-6 col-sm-3 col-md-2_4", {active: activeTabIndex === 1})}>
                <a className="box" id="composer">{words.home_composer_tab}<p /></a>
                </li>
                <li onClick={()=>toggleTab(2)} className={classnames("col-xs-6 col-sm-3 col-md-2_4", {active: activeTabIndex === 2})}>
                <a className="box" id="edition">{words.home_edition_tab}<p /></a>
                </li>
                <li onClick={()=>toggleTab(3)} className={classnames("col-xs-6 col-sm-3 col-md-2_4", {active: activeTabIndex === 3})}>
                <a className="box" id="instrument">{words.home_instrument_tab}<p /></a>
                </li>
                <li onClick={()=>toggleTab(4)} className={classnames("col-xs-6 col-sm-3 col-md-2_4", {active: activeTabIndex === 4})}>
                <a className="box" id="category">{words.home_category_tab}<p /></a>
                </li>
                <li onClick={()=>toggleTab(5)} className={classnames("col-xs-12 col-sm-12 col-md-2_4", {active: activeTabIndex === 5})}>
                <a className="box" id="duration">{words.home_duration_tab}<p /></a>
                </li>
            </ul>

            {/*content filters*/}
            <div className="jtab-content-list">
                <div id="tab_composer" className={activeTabIndex === 1 ? "jtab-content composer show" : "jtab-content composer"}>
                <ComposerList {...props} onClick={handleComposerClick} lang={lang} />
                </div>

                <div id="tab_edition" className={activeTabIndex === 2 ? "jtab-content composer show" : "jtab-content composer"}>
                <EditionList {...props} onClick={handleComposerClick} lang={lang} />
                </div>

                <div id="tab_instrument" className={activeTabIndex === 3 ? "jtab-content composer show" : "jtab-content composer"}>
                <InstrumentList {...props} onClick={handleComposerClick} lang={lang} />
                </div>

                <div id="tab_category" className={activeTabIndex === 4 ? "jtab-content composer show" : "jtab-content composer"}>
                <CategoryList {...props} onClick={handleComposerClick} lang={lang} />
                </div>

                <div id="tab_durtion" className={activeTabIndex === 5 ? "jtab-content duration show" : "jtab-content duration"}>
                <Duration {...props} onDurationClick={handleComposerClick} maxHours={5} steps={6} />
                </div>
            </div>
            </div>
    )
}

export default HomeFilters;