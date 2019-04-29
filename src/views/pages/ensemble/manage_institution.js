import React from "react"
import { connect } from "react-redux"

import Presenter from "../../../ensemble/presenter.js"
import Request from "../../../ensemble/utils/request.js"
import checkSession from "../../../utils/check_session.js"

/* Session */
import { RemoveInstitutionSession } from "../../../redux/account/institution/presenter.js"
import { RemovePublisherSession } from "../../../redux/account/publisher/presenter.js"

import { CreateEnsembleSession } from "../../../redux/account/ensemble/presenter.js"
import { WriteTokenEnsemble, RemoveTokenInstitution, RemoveTokenPublisher } from "../../../redux/account/token/presenter.js"

// Component
import InstitutionRow from "./components/InstitutionRow.js"
import Pagination from "../../component/pagination.js"
import Animated from "../../component/animated.js"
import { InstitutionList } from "../../component/animation.js"

class ManageInstitutionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.loggedIn = checkSession.isLoggedIn(props.history, props.SessionReducer.is_auth)

    this.state = {
      isLoading: true,
      isError: false,
      isSwitching: false,
      rowElement: null,
      limit: 0,
      count: 0,
      currentPage: 0,
      nextLink: null,
      prevLink: null,
    }

    this.onRead = this.onRead.bind(this)
    this.onReadSuccess = this.onReadSuccess.bind(this)
    this.onReadFailed = this.onReadFailed.bind(this)
    this.goTo = this.goTo.bind(this)
    this.onSwitch = this.onSwitch.bind(this)
    this.generateRow = this.generateRow.bind(this)

    this.createInstitution = this.createInstitution.bind(this)

    this.getTokenInstitutionSuccess = this.getTokenInstitutionSuccess.bind(this)
    this.getTokenInstitutionFailed = this.getTokenInstitutionFailed.bind(this)

  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <InstitutionRow
          rowData={val}
          key={val.eid}
          history={this.props.history}
          onSwitch={this.onSwitch}
          isSwitching={this.state.isSwitching}
        />
      )
    })
    return element
  }

  onSwitch(eid) {
    this.setState({ isSwitching: true })
    this.getTokenInstitution(eid)
  }

  getTokenInstitution(institutionId) {
    Presenter.GetTokenInstitution(
      Request.GetTokenInstitution(institutionId, this, this.getTokenInstitutionSuccess, this.getTokenInstitutionFailed)
    )
  }

  getTokenInstitutionSuccess(params, response) {
    const { words } = this.props.ActiveLanguageReducer
    this.setState({ isSwitching: false })
    this.props.RunRedux(WriteTokenEnsemble(response.data.token))

    // Logout From Institution
    this.props.RunRedux(RemoveTokenInstitution())
    this.props.RunRedux(RemoveInstitutionSession())

    //Logout from publisher
    this.props.RunRedux(RemoveTokenPublisher())
    this.props.RunRedux(RemovePublisherSession())

    this.props.RunRedux(CreateEnsembleSession(response.data))
    this.props.history.push("/ensemble")
    window.scrollTo(0, 0)
  }

  getTokenInstitutionFailed(response) {
    this.setState({ isSwitching: false })
  }

  onRead(page) {
    this.setState({ isLoading: true })
    Presenter.Read(
      Request.Read(this, this.onReadSuccess, this.onReadFailed, page)
    )
  }

  onReadSuccess(params, response) {
    this.setState({
      isLoading: false,
      isError: false,
      limit: response.data.results.length,
      count: response.data.count,
      nextLink: response.data.next,
      prevLink: response.data.previous,
      currentPage: response.data.current,
      rowElement: this.generateRow(response.data.results)
    })
  }

  onReadFailed(response) {
    this.setState({
      isLoading: false,
      isError: true,
    })
  }

  goTo(page) {
    window.scrollTo(0, 0)
    this.onRead(page)
  }

  /* Check Session */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.SessionReducer.is_auth) {
      nextProps.history.push("/login")
    }
  }

  componentDidMount() {
    this.onRead(1)
  }

  createInstitution() {
    this.props.history.push("/create-ensemble")
  }

  render() {
    if (!this.loggedIn) return (null)
    const { words } = this.props.ActiveLanguageReducer

    const {
      isLoading,
      rowElement,
      count,
    } = this.state
    return (
      <section className="user-content institution-content">
        <div className="container-fluid">
          <div className="row center-xs bb">
            <div className="col-md-3">
              {/*<button>Create Institution</button>*/}
            </div>
            <div className="col-md-6 col-xs-10">
              <div className="box musinote-center">
                <h3 className="no-margin">{words.manageensemble_title}</h3>
              </div>
            </div>
            <div className="col-md-3 center-content">
              <div>
                <button className='btn black small' onClick={this.createInstitution} style={{textTransform: 'capitalize'}}>{words.manageensemble_button_create}</button>
              </div>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-6 col-xs-10">
              <div className="box">
                <Animated total={5} loading={isLoading} count={count} text={words.manageensemble_empty} animation={<InstitutionList />}>
                  {rowElement}
                </Animated>
              </div>
            </div>
          </div>
          <div className="row page-numeration-box">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="page-numeration"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    EnsembleReducer: state.EnsembleReducer,
    ActiveLanguageReducer: state.ActiveLanguageReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RunRedux: (data) => {
      dispatch(data)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageInstitutionScreen)
