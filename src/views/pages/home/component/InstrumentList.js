import React from "react"
import InstrumentRow from "../../../component/Row/InstrumentRow.js"
import Request from '../../../../utils/Request.js';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getInstrument } from '../../../../redux/actions/homeFiltersActions/getInstrument';

class InstrumentList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
    this.lang = props.lang
    this.onReadFailed  = this.onReadFailed.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
  }

  componentDidMount() {
    this.props.getInstrument(this.lang)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang && nextProps.lang !== this.lang) {
      this.lang = nextProps.lang
      this.props.getInstrument(this.lang)
    }
  }

  onReadFailed(error) {

  }

  onItemClick(data) {
    const { onClick } = this.props
    onClick(data)
  }

  generateRow() {
    const items = this.props.instrument;
    let clusters = {}

    for(let i = 0; i < items.length; i++) {
      if (items[i].name.trim().length > 0) {
        let newData = {
          id: i,
          name: items[i].name,
          totalScore: items[i].number_scores
        }

        let firstChar = newData.name[0].toUpperCase()
        if(!clusters[firstChar]) {
          clusters[firstChar] = [newData]
        } else {
          clusters[firstChar].push(newData)
        }
      }
    }

    let row = []
    for(let cluster in clusters) {
      row.push(
        <InstrumentRow
          index={cluster}
          letter={cluster}
          key={cluster}
          instruments={clusters[cluster]}
          onClick={this.onItemClick}
        />
      )
    }
    return row
  }

  render() {
    return (
      <div className="row no-border">
        {this.generateRow()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    SessionReducer        : state.SessionReducer,
    Token                 : state.TokenReducer,
    SearchReducer         : state.SearchReducer,
    ActiveLanguageReducer : state.ActiveLanguageReducer,
    ActiveCurrencyReducer : state.ActiveCurrencyReducer,
    ActiveLocationReducer : state.ActiveLocationReducer,
    LanguageReducer       : state.LanguageReducer,
    instrument: state.instrument
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getInstrument
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentList)