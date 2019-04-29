import React, { Component } from 'react';

import Radio from "../../../component/Radio";
import DropDown from "../../../component/DropDown";

class SearchSettings extends Component {
    state = {
        genreValue: '1',
        styleValue: '1',
    }

    handleGenre = ({ value }) => {
        this.setState({
            genreValue: value
        });
        this.props.filterDitector(value)
    }

    handleStyle = ({ value }) => {
        this.setState({
            styleValue: value
        });
    }
    
    render () {
        const {words} = this.props;
        return (
            <form>
                <div className='row field-group'>
                <div className='col-md-3 col-sm-6 col-xs-12'><label className='main-label'>{words.home_style_genre}</label></div>
                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <Radio
                    value='1'
                    label={words['home_style_classical-music']}
                    onChange={this.handleGenre}
                    name='genre'
                    checked={this.state.genreValue === '1'}
                    />
                </div>
                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <Radio
                    value='2'
                    label={words['home_style_rock-pop']}
                    onChange={this.handleGenre}
                    name='genre'
                    checked={this.state.genreValue === '2'}
                    />
                </div>
                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <Radio
                    value='3'
                    label={words.home_style_jazz}
                    onChange={this.handleGenre}
                    name='genre'
                    checked={this.state.genreValue === '3'}
                    />
                </div>
                </div>
                <div className='row field-group'>
                <div className='col-md-3 col-sm-6 col-xs-12'><label className='main-label'>{words.home_style_style}</label></div>
                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <Radio
                    value='1'
                    label={words.home_style_minimal}
                    onChange={this.handleStyle}
                    name='style'
                    checked={this.state.styleValue === '1'}
                    />
                </div>
                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <Radio
                    value='2'
                    label={words.home_style_lists}
                    onChange={this.handleStyle}
                    name='style'
                    checked={this.state.styleValue === '2'}
                    />
                </div>
                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <Radio
                    value='3'
                    label={words.home_style_news}
                    onChange={this.handleStyle}
                    name='style'
                    checked={this.state.styleValue === '3'}
                    />
                </div>
                </div>
                <div className='row field-group'>
                <div className='col-md-3 col-sm-6 col-xs-12'><label className='main-label'>{words.home_style_preselection}</label></div>
                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <label className='label'>{words.general_instrument}</label>
                    <DropDown
                    label={words.general_blank}
                    options={[
                        {value: 1, label: 'Bass clarinet'},
                        {value: 2, label: 'Bass trombone'},
                        {value: 3, label: 'Basson'},
                        {value: 4, label: 'Cello'},
                        {value: 5, label: 'Clarnet'}
                    ]}
                    />
                </div>
                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <label className='label'>{words.general_edition}</label>
                    <DropDown
                    label={words.general_blank}
                    options={[
                        {value: 1, label: 'Bass clarinet'},
                        {value: 2, label: 'Bass trombone'},
                        {value: 3, label: 'Basson'},
                        {value: 4, label: 'Cello'},
                        {value: 5, label: 'Clarnet'}
                    ]}
                    />
                </div>
                <div className='col-md-3 col-sm-6 col-xs-12'>
                    <label className='label'>{words.general_category}</label>
                    <DropDown
                    label={words.general_blank}
                    options={[
                        {value: 1, label: 'Bass clarinet'},
                        {value: 2, label: 'Bass trombone'},
                        {value: 3, label: 'Basson'},
                        {value: 4, label: 'Cello'},
                        {value: 5, label: 'Clarnet'}
                    ]}
                    />
                </div>
                </div>
            </form>
        )
    }
}

export default SearchSettings;