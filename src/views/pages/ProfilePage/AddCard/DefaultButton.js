import React from 'react';

class DefaultButton extends React.PureComponent {
    render() {
        const { value, onChange } = this.props;

        return (
            <div className="form-group">
                <label className="btn black small" htmlFor="primary">
                    <i
                        className={
                            value ? 'check-icon' : 'uncheck-icon'
                        }
                    />{' '}
                    Default
                          </label>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    name="primary"
                    style={{ display: 'none' }}
                    id="primary"
                />
            </div>
        )
    }
}

export default DefaultButton;