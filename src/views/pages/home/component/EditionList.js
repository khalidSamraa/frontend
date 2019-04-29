import React from "react";
import EditionRow from "../../../component/Row/EditionRow.js";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getEdition } from '../../../../redux/actions/homeFiltersActions/getEdition';

class EditionList extends React.Component {
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
    this.props.getEdition(this.lang)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang && nextProps.lang !== this.lang) {
      this.lang = nextProps.lang
      this.props.getEdition(this.lang, undefined, this.onReadFailed)
    }
  }

  onReadFailed(error) {

  }

  onItemClick(data) {
    const { onClick } = this.props
    onClick(data)
  }

  generateRow() {
    const items = this.props.edition;
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
        <EditionRow
          index={cluster}
          letter={cluster}
          key={cluster}
          editions={clusters[cluster]}
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
    edition: state.edition
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getEdition
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditionList)