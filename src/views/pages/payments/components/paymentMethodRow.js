import React from 'react'

class PaymentMethodRow extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    const {rowData} = this.props
    return(
      <div className="card-credit">
        <div className="option">
          <input type="radio" checked={rowData.primary} value={rowData.pid} onChange={this.props.changePrimary}/>
        </div>
        <div className="details">
          <p>**** **** **** **** {rowData.details.last4}</p>
          <p className="brand">
            {rowData.details.brand}
          </p>
          <p className="valid">Valid Thru {rowData.details.exp_month}/{rowData.details.exp_year}</p>
        </div>
        <div className="card-remove">
          <i className="material-icons" onClick={()=>this.props.removeCard(rowData.pid)}>delete_outline</i>
        </div>
      </div>
    )
  }
}

export default PaymentMethodRow
