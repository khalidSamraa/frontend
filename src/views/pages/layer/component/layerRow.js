import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Options from '../../../component/Option/Options.js'

const propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  active: PropTypes.bool,
  loading: PropTypes.bool,

  onClick: PropTypes.func,
}

const defaultProps = {
  active: false,
  loading: false,

  onClick() {}
}

class LayerRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      new_name     : props.data.name,
      mode         : null,
      newId        : props.newId
    }

    this.rename            = this.rename.bind(this)
    this.renderLayerAction = this.renderLayerAction.bind(this)
    this.cancelUpdate      = this.cancelUpdate.bind(this)
    this.saveUpdate        = this.saveUpdate.bind(this)
  }

  rename() {
    this.setState({
      mode: 'update',
      newId: null,
      new_name: this.props.data.name
    })
  }

  saveUpdate(lid) {
    this.props.onUpdate(lid, this.state.new_name)
    this.setState({
      mode: null,
      newId: null,
    })
  }

  cancelUpdate() {
    this.setState({
      mode: null,
      newId: null,
      new_name: this.props.data.name
    })
  }

  renderLayerItem(data) {
    const {mode, new_name, newId} = this.state

    if(mode === "update" || newId === data.lid) {
      return(
        <div role="button">
          <input
            type="text"
            value={new_name}
            onChange={(e) => this.setState({new_name: e.target.value})}
          />
        </div>
      )
    } else {
      return(<div role="button">{data.name}</div>)
    }
  }

  renderLayerAction(data) {
    const {mode, newId} = this.state

    if(mode === "update" || newId == data.lid) {
      return (
        <div>
          <input type="button" className="btn-arb" value="Save" onClick={()=>this.saveUpdate(data.lid)} />
          <input type="button" className="btn-arb red-i" value="Cancel" onClick={this.cancelUpdate} />
        </div>
      )
    } else {
      return(
        <Options items={[
            {text: 'Rename', onClick: this.rename, className: "text-center"},
            {text: 'Delete', onClick: (e)=>this.props.onDelete(data.lid), className: "text-center"},
          ]} iconClassName={"sm-icon"} />
      )
    }
  }

  render() {
    const {data, active, onClick} = this.props

    return (
      <li role="button" className={classnames('align-left member transition-all', {'member-active' : active })} onClick={(e)=>{this.props.onClick(this.props.index, this.props.data)}}>
        <div className="member-name">
          {this.renderLayerItem(data)}
        </div>
        {this.renderLayerAction(data)}
      </li>
    );
  }
}

LayerRow.propTypes = propTypes
LayerRow.defaultProps = defaultProps
export default LayerRow
