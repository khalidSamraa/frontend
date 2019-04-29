import React from "react";
import ComposerRow from "../../../component/Row/ComposerRow.js";

import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import {getComposer} from '../../../../redux/actions/homeFiltersActions/getComposer';

class ComposerList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
    this.lang = props.lang
    this.onReadFailed  = this.onReadFailed.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
  }

  componentDidMount() {
    this.props.getComposer(this.lang)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang && nextProps.lang !== this.lang) {
      this.lang = nextProps.lang
      this.props.getComposer(this.lang, undefined, this.onReadFailed)
    }
  }

  onReadFailed(error) {

  }

  onItemClick(data) {
    const { onClick } = this.props
    onClick(data)
  }

  generateRow() {
    const items = this.props.composer
    let clusters = {}

    for(let i = 0; i < items.length; i++) {
      if (items[i].name.trim().length > 0) {
        let newData = {
          cid: i.toString(),
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
        <ComposerRow
          index={cluster}
          letter={cluster}
          key={cluster}
          composers={clusters[cluster]}
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
    composer: state.composer
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getComposer
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ComposerList)