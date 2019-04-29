import React from "react"
import { connect } from "react-redux"

import Presenter from "../../../publisher/presenter.js"
import Request from "../../../publisher/utils/request.js"
import checkSession from "../../../utils/check_session.js"

/* Session */
import { RemoveEnsembleSession } from "../../../redux/account/ensemble/presenter.js"
import { RemoveInstitutionSession } from "../../../redux/account/institution/presenter.js"

import { CreatePublisherSession } from "../../../redux/account/publisher/presenter.js"
import { WriteTokenPublisher, RemoveTokenEnsemble, RemoveTokenInstitution } from "../../../redux/account/token/presenter.js"

// Component
// import PublisherRow from "./components/PublisherRow.js"
import PublisherRow from "../publisher/components/PublisherRow.js"
import Pagination from "../../component/pagination.js"
import Animated from "../../component/animated.js"
import { InstitutionList } from "../../component/animation.js"

export class ManagePublisherScreen extends React.Component {
  constructor(props) {
    super(props)

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

    this.createPublisher = this.createPublisher.bind(this)

    this.getTokenPublisherSuccess = this.getTokenPublisherSuccess.bind(this)
    this.getTokenPublisherFailed = this.getTokenPublisherFailed.bind(this)

  }

  generateRow(row) {
    var element = row.map((val, index) => {
      return (
        <PublisherRow
          rowData={val}
          key={val.pid}
          history={this.props.history}
          onSwitch={this.onSwitch}
          isSwitching={this.state.isSwitching}
        />
      )
    })
    return element
  }

  onSwitch(pid) {
    this.setState({ isSwitching: true })
    this.getTokenPublisher(pid)
  }

  getTokenPublisher(publisherId) {
    Presenter.GetTokenPublisher(
      Request.GetTokenPublisher(publisherId, this, this.getTokenPublisherSuccess, this.getTokenPublisherFailed)
    )
  }

  getTokenPublisherSuccess(params, response) {
    this.setState({ isSwitching: false })
    this.props.RunRedux(WriteTokenPublisher(response.data.token))

    // Logout from ensemble
    this.props.RunRedux(RemoveTokenEnsemble())
    this.props.RunRedux(RemoveEnsembleSession())

    // Logout from institution
    this.props.RunRedux(RemoveTokenInstitution())
    this.props.RunRedux(RemoveInstitutionSession())

    this.props.RunRedux(CreatePublisherSession(response.data))

    this.props.history.push("/publisher")
    window.scrollTo(0, 0)
  }

  getTokenPublisherFailed() {
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

    let msg = localStorage.getItem("message_create_publisher")
    if (msg !== null && msg !== undefined && msg !== "") {
      setTimeout(function () {
        alert(msg)
        localStorage.removeItem("message_create_publisher")
      }, 1500)
    }

  }

  createPublisher() {
    this.props.history.push("/create-publisher")
  }


  render() {
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
                <h3 className="no-margin">{words.managepublisher_title}</h3>
              </div>
            </div>
            <div className="col-md-3 center-content">
              <div>
                <button className='btn black small' onClick={this.createPublisher} style={{textTransform: 'capitalize'}}>{words.managepublisher_create}</button>
              </div>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-6 col-xs-10">
              <div className="box">
                <Animated total={5} loading={isLoading} count={count} text={words.managepublisher_publisher_empty} animation={<InstitutionList />}>
                  {rowElement}
                </Animated>
              </div>
            </div>
          </div>
          <div className="row page-numeration-box">
            <div className="col-md-12 col-sm-12 col-xs-12">
              {/*<Pagination
                total       ={count}
                limit       ={limit}
                to          ={this.goTo}
                currentPage ={currentPage}
                nextLink    ={nextLink}
                prevLink    ={prevLink}
              />*/}
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
    PublisherReducer: state.PublisherReducer,
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
export default connect(mapStateToProps, mapDispatchToProps)(ManagePublisherScreen)
