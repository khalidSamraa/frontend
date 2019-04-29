import React from 'react';
import classnames from 'classnames';

import './style.css';

const sortArrayAlphabetically = array => {
  if (array.length && array.length > 0) {
    if (!isNaN(parseFloat(array[0].label)) && !isNaN(array[0].label - 0)) {
      return array.sort((a, b) => a - b);
    } else {
      return array.sort(function(a, b) {
        return a.label.toString().localeCompare(b.label);
      });
    }
  } else {
    return array;
  }
};

// rewrite it on React Hooks, it's a really good candidate for it
// use than React.memo()
class DropDown extends React.PureComponent {
  state = {
    toggle: false,
    search: this.props.defaultValue || '',
    data: [],
    options: []
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    // todo why do we need the code???
    let options =
      options && options.length > 0
        ? this.state.options
        : this.props.multi
        ? sortArrayAlphabetically(
            this.state.options.length > 0
              ? this.state.options
              : this.props.options
          )
        : this.state.options.length > 0
        ? this.state.options
        : this.props.options;

    if (this.props.data) {
      let data = this.state.data.length > 0 ? this.state.data : this.props.data;
      this.setState({
        data: data
      });

      options = options.map(item => {
        let checked = false;

        data.forEach(dataItem => {
          if (dataItem.value === item.value) {
            checked = true;
          }
        });
        return { ...item, checked: checked };
      });
    }

    this.setState({
      options: options
    });

    if (this.props.options) {
      this.props.options.map(item => {
        if (item.value === this.props.value) {
          this.setState({
            label: item.label,
            search: item.label
          });
        }
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(props) {
    // todo why do we need the code???
    let options =
      options && options.length > 0
        ? this.state.options
        : props.multi
        ? sortArrayAlphabetically(
            this.state.options.length > 0 ? this.state.options : props.options
          )
        : this.state.options.length > 0
        ? this.state.options
        : props.options;

    if (props.data) {
      let data = props.data;
      this.setState({
        data: data
      });

      options = options.map(item => {
        let checked = false;

        data.forEach(dataItem => {
          if (dataItem.value === item.value) {
            checked = true;
          }
        });
        return { ...item, checked: checked };
      });
    }

    this.setState({
      options: options
    });

    if (props.options) {
      props.options.map(item => {
        if (item.value === props.value) {
          this.setState({
            label: item.label,
            search: item.label
          });
        }
      });
    }
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.state.toggle
    )
      this.toggleDropDown();
  };

  toggleDropDown = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  open = () => {
    this.setState({
      toggle: true
    });
  };

  close = () => {
    this.setState({
      toggle: false
    });
  };

  handleSelect = data => {
    if (this.props.multi) {
      this.setState(
        {
          options: this.state.options.map(item => {
            if (item.value === data.value) {
              if (!item.checked) {
                return { ...item, checked: true };
              } else {
                return { ...item, checked: false };
              }
            }
            return item;
          })
        },
        () => {
          this.setState(
            {
              data: this.state.options.filter(item => {
                return item.checked;
              })
            },
            () => {
              if (this.props.onChange) this.props.onChange(this.state.data);
            }
          );
        }
      );
    } else {
      this.setState({
        label: data.label,
        search: data.label
      });
      this.close();
      if (this.props.onChange) this.props.onChange(data);
    }
  };

  onSearch = ev => {
    this.setState({
      search: ev.target.value
    });
    if (ev.target.value) {
      this.setState({
        options: this.props.options.filter(item => {
          return item.label
            .toLowerCase()
            .startsWith(ev.target.value.toLowerCase());
        }),
        toggle: true
      });
    } else {
      this.setState({
        options: this.props.options
      });
    }
  };

  removeSelection = data => {
    this.setState(
      {
        data: this.state.data.filter(item => {
          return item.value !== data.value;
        }),
        options: sortArrayAlphabetically(
          this.state.options.map(item => {
            if (item.value === data.value) {
              return { ...item, checked: false };
            }
            return item;
          })
        )
      },
      () => {
        if (this.props.onChange) this.props.onChange(this.state.data);
      }
    );
  };

  render() {
    return (
      <div
        className={classnames('dropdown-wrp', { active: this.state.toggle })}
        ref={this.setWrapperRef}
      >
        <div className={`dropdown-head ${this.props.className}`}>
          {this.props.search ? (
            <React.Fragment>
              <input
                type="text"
                placeholder={
                  this.state.label
                    ? this.state.label
                    : this.props.label
                    ? this.props.label
                    : this.props.multi
                    ? 'search ...'
                    : 'NONE'
                }
                onChange={this.onSearch}
                autoComplete="text"
                value={this.state.search}
                onFocus={this.open}
              />
            </React.Fragment>
          ) : (
            <div className="dropdown-label" onClick={this.toggleDropDown}>
              {this.state.label
                ? this.state.label
                : this.props.label
                ? this.props.label
                : 'NONE'}
            </div>
          )}
          <div
            className={`ctx-arrow-${this.state.toggle ? 'up' : 'down'}`}
            onClick={this.toggleDropDown}
          />
        </div>
        <div className="dropdown-menu" onScroll={this.props.onScroll}>
          {this.state.toggle && (
            <ul>
              {this.state.options.map(item => {
                return (
                  <li key={item.value} onClick={() => this.handleSelect(item)}>
                    {this.props.multi && (
                      <input type="checkbox" checked={item.checked} />
                    )}{' '}
                    {item.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default DropDown;
