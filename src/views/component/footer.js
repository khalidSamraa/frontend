import React from "react"
import classnames from "classnames"

export default class Footer extends React.Component {
  render() {
    const {previewMode} = this.props
    const {words} = this.props.ActiveLanguageReducer

    return (
      <footer className={classnames("footer", {"visible-on":previewMode})}>
        <div className="container-fluid">
          <div className="row bottom-xs">
            <div className="col-md-6 col-sm-6 col-xs-12 newsletter-box">
              <p> <span style={{backgroundImage: "url(/media/images/icon/newsletter.svg)"}} className="newsletter-icon"></span>{words.signup_for_newsletter}:</p>
              <form action="">
                <input 
                  type="text" 
                  placeholder={words.enter_your_email} 
                  className="email-newsletter"
                />
                <button className="submit-email-newsletter"> <span>{words.submit}</span></button>
              </form>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-6 conntect-box"><a href="">{words.imprint}</a></div>
            <div className="col-md-3 col-sm-3 col-xs-6 contact-link"><a href="">{words.contact}</a></div>
          </div>
        </div>
      </footer>
    )
  }
}
