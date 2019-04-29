import React from "react"
import { connect } from "react-redux"
import classnames from "classnames"
import axios from "axios"
import server from "../../config/server.js"
import urls from "../../config/urls.js"

export class UploadScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: "pdf",
      progress: 0,
      disabled: true,
      name_of: ""
    }

    this.payload = []
    this.data = new FormData()

    this.onUpload = this.onUpload.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handlePDF = this.handlePDF.bind(this)
    this.handleCSV = this.handleCSV.bind(this)
  }

  handlePDF(e) {
    this.setState({
      mode: e.target.value
    })

  }

  handleCSV(e) {
    this.setState({
      mode: e.target.value
    })
  }

  reset() {
    this.data.delete("files")
    this.data.delete("csv")
    this.fileInputPDF.value = ""
    this.fileInputCSV.value = ""
  }

  onUpload() {
    let config = {
      onUploadProgress: function (progressEvent) {
        let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        this.setState({
          progress: percent,
          disabled: true,
        })
      }.bind(this)
    }

    axios.defaults.headers.common = {}
    axios.defaults.headers.common["Content-Type"] = "multipart/form-data"
    axios.post(server.API_WUL + urls.upload, this.payload, config)
      .then(function (res) {
        this.reset()
        this.setState({
          progress: 0,
          disabled: true
        })

      }.bind(this))

      .catch(function (err) {
        this.setState({
          progress: 0,
          disabled: true
        })

      }.bind(this))
  }

  handleFileUpload(e) {
    let file = e.target.files

    if (this.state.mode === "pdf") {
      for (let i = 0; i < e.target.files.length; i++) {
        this.data.append("files", file[i])
      }

    } else {
      this.data.append("csv", file[0])
    }

    this.payload = this.data

    this.setState({
      disabled: false
    })

  }

  componentDidMount() {
    const { SessionReducer, InstitutionReducer, EnsembleReducer, PublisherReducer } = this.props
    if (SessionReducer.is_auth) {
      this.data.append("uid", SessionReducer.user.uid)
      this.setState({ name_of: SessionReducer.user.name })
    }

    if (InstitutionReducer.is_auth) {
      this.data.append("iid", InstitutionReducer.institution.iid)
      this.setState({ name_of: InstitutionReducer.institution.name })
    }

    if (EnsembleReducer.is_auth) {
      this.data.append("eid", EnsembleReducer.ensemble.eid)
      this.setState({ name_of: EnsembleReducer.ensemble.name })
    }

    if (PublisherReducer.is_auth) {
      this.data.append("pid", PublisherReducer.publisher.pid)
      this.setState({ name_of: PublisherReducer.publisher.name })
    }
  }

  renderProgress() {
    if (this.state.progress > 0) {
      if (this.state.progress === 100) {
        return (<p className="text-center">please wait, processing uploads...</p>)
      } else {
        return (<p className="text-center">Uploading {this.state.progress} %</p>)
      }
    }
  }

  toggleAction() {
    this.props.history.goBack()
  }

  render() {
    // const {toggle, toggleAction} = this.props
    return (
      <div className={classnames("upload-overlay", { "overlay-y-active": false })}>
        <button onClick={() => this.toggleAction()} className="material-icons close-overlay overlay-y-active">close</button>
        <div className="text-center">
          <h4>Upload in the name of {this.state.name_of}</h4>
        </div>
        <div className="row container-2rem">
          <div className="col-md-4">
            <label className="control control--checkbox">
              Upload one or more PDF
              <input type="checkbox" onChange={this.handlePDF} value="pdf" checked={this.state.mode === "pdf"} />
              <div className="control__indicator"></div>
            </label>
            <label className="control control--checkbox">
              Upload one CSV
              <input type="checkbox" onChange={this.handleCSV} value="csv" checked={this.state.mode === "csv"} />
              <div className="control__indicator"></div>
            </label>
          </div>
          <div className="col-md-4">
            <form encType="multipart/form-data">
              <input
                type="file"
                onChange={this.handleFileUpload}
                multiple accept="application/pdf"
                ref={ref => this.fileInputPDF = ref}
                className={classnames("", { "hide": this.state.mode === "csv" })}
              />
              <input
                type="file"
                onChange={this.handleFileUpload}
                accept=".csv"
                ref={ref => this.fileInputCSV = ref}
                className={classnames("", { "hide": this.state.mode === "pdf" })}
              />
            </form>
          </div>
          <div className="col-md-4 text-center">
            <button className="btn-upload" onClick={this.onUpload} disabled={this.state.disabled}>Upload</button>
          </div>
        </div>
        <div className="info-uploading">
          {this.renderProgress()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    SessionReducer: state.SessionReducer,
    TokenReducer: state.TokenReducer,
    InstitutionReducer: state.InstitutionReducer,
    EnsembleReducer: state.EnsembleReducer,
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
export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen)
