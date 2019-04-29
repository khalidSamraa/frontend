import React from "react"
import CategoryRow from "../../../component/Row/CategoryRow.js"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import{getCategories} from '../../../../redux/actions/homeFiltersActions/getCategories';

class CategoryList extends React.Component {
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
    this.props.getCategories(this.lang, undefined, this.onReadFailed);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang && nextProps.lang !== this.lang) {
      this.lang = nextProps.lang
      this.props.getCategories(this.lang, undefined, this.onReadFailed);
    }
  }

  onReadFailed(error) {

  }

  onItemClick(data) {
    const { onClick } = this.props
    onClick(data)
  }

  generateRow() {
    const items = this.props.categories
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
        <CategoryRow
          index={cluster}
          letter={cluster}
          key={cluster}
          categories={clusters[cluster]}
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
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getCategories
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)