import React from "react"
import classnames from "classnames"
import { setSearchQuery } from "../../../redux/actions/SearchAction.js"
import { UpdatedCurrency, changeCurrency } from "../../../redux/actions/ActiveCurrencyAction.js"
import Presenter from '../../../user/presenter.js';
import Request from '../../../user/utils/request.js';
import { changeLanguage } from "../../../redux/actions/ActiveLanguageAction.js"
import { changeLocation } from "../../../redux/actions/ActiveLocationAction.js"
import SearchSettings from "./component/SearchSettings"
import HomeFilters from './HomeFilters'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0,
      searchQuery: this.props.SearchReducer.query,
    }
    // Bind
    this.toggleTab = this.toggleTab.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleComposerClick = this.handleComposerClick.bind(this)
    this.keyPress = this.keyPress.bind(this)

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailed  = this.onFailed.bind(this);

    this.searchInput = null
  }

  componentDidMount() {
    this.searchInput.focus()
    this.searchInput.selectionStart = this.searchInput.value.length
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchQuery: nextProps.SearchReducer.query,
    })
    this.searchInput.focus()
    this.searchInput.selectionStart = this.searchInput.value.length
  }

  // Toogle Tab
  toggleTab(tab=null) {
    if(!tab || this.state.activeTabIndex === tab) {
      this.setState({
        activeTabIndex: 0
      })
    } else {
      this.setState({
        activeTabIndex: tab
      })
    }
  }

  handleChange(event) {
    this.setState({searchQuery: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.RunRedux(setSearchQuery(this.state.searchQuery))
    this.props.history.push("/catalog/?q=" + this.state.searchQuery)
  }

  keyPress(event) {
    if(event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  delete(event) {
     event.preventDefault();
    this.setState({searchQuery: ''});
  }

  handleComposerClick(data) {
    let {searchQuery} = this.state
    if (data.name.trim() !== "") {
      if (searchQuery.trim() && !searchQuery.endsWith(' ')) {
        searchQuery += ' '
      }
      searchQuery += data.name
      this.setState({searchQuery: searchQuery})
    }
    this.toggleTab()
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    if (!localStorage.getItem('curr') && !localStorage.getItem('country')) {
      Presenter.ReadCurLocLang(Request.ReadCurLocLang(this, this.onSuccess, this.onFailed));
    }
  }

  onSuccess(params, response) {
    let { languages } = this.props.LanguageReducer.data;
    var languageData = languages.filter(language => (language.code == response.data.language))[0];
    this.props.RunRedux(changeLanguage(languageData));

    this.props.RunRedux(changeLocation(response.data.country));

    let { currencies } = this.props.LanguageReducer.data;
    var currencyData = currencies.filter(currency => (currency.code == response.data.currency))[0];

    this.props.RunRedux(changeCurrency(currencyData));
  }

  filterDitector = (filter) => {
    this.setState({
      filter
    })
  }
  

  onFailed(response) {
  }

  render() {
    
    const { words, lang } = this.props.ActiveLanguageReducer
    
    return (
      <div className="home-page">
        {/*search and folters*/}
        <div className='content' style={this.state.filter === '3' ? {backgroundImage: "url(./media/images/jazz-bg.png)", backgroundPositionY: '0'} : {}}>
          <section className="search-area">
            <div className='container'>
              <div className="hero-text">
                  {/*<h3>What do you <span>Wanna</span> play today?</h3>*/}
                  <h3>{words.home_title}</h3>
              </div>
              <div className="row search-form-box">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <form>
                  <div className="search-input">
                    <button type="button" onClick={()=>this.toggleTab(6)} className={classnames("controls-copy", {active: this.state.activeTabIndex === 6})}>
                      <span className='copy-icon' style={{backgroundImage: "url(media/images/controls_copy.png)"}}></span>
                    </button>
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder={words.home_search}
                        onChange={this.handleChange}
                        onKeyDown={this.keyPress}
                        className="search-text"
                        value={this.state.searchQuery}
                        ref={input => this.searchInput = input}
                      />
                      {this.state.searchQuery != '' &&
                        <div className="delete-btn" onClick={this.delete.bind(this)}><span style={{backgroundImage: "url(media/images/icon/delete.svg)"}} className="delete-icon"></span></div>
                      }
                    </div>
                    <div className="search-btn">
                      <button className="send-search" onClick={this.handleSubmit}>{words.home_find}<span style={{backgroundImage: "url(media/images/search-icon.png)"}} className="search-icon"></span></button>
                    </div>
                  </div>
                </form>
                <div className={this.state.activeTabIndex === 6 ? "settings-menu jtab-content composer show" : "settings-menu jtab-content composer"}>
                    <SearchSettings words={words} filterDitector={this.filterDitector} />
                </div>
              </div>
            </div>
              <HomeFilters
                toggleTab={this.toggleTab}
                activeTabIndex={this.state.activeTabIndex}
                handleComposerClick={this.handleComposerClick}
                lang={lang}
                props={this.props}
                words={words}
              />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default HomeScreen;
