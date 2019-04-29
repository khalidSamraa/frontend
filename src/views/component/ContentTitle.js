import React from "react"

class ContentTitle extends React.Component {
  render() {
    const {title} = this.props
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 standart-height subtitle">
          <h3 className="no-margin"><small>{title}</small></h3>
        </div>
      </div>
    )
  }
}

export default ContentTitle