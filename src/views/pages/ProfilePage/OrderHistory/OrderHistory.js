import React, { Component } from 'react';
import Request from "../../../../utils/Request";
import {dateText, dateInput} from "../../../../utils/dateFormating";
import Auth from '../../../../redux/account/authToken';

import DropDown from "../../../component/DropDown";

class OrderHistory extends Component {
    constructor (props) {
        super(props);
        this.token = Auth.getActiveToken();
        this.state = {
            items: [],
            scoreSortType: 'asc',
            dateSortType: 'asc',
            activeSortType: 'asc'
        }
        this.onLoadFailed = this.onLoadFailed.bind(this);
        this.handleDate  = this.handleDate.bind(this);
        this.handleDropDown  = this.handleDropDown.bind(this);
        this.onSort  = this.onSort.bind(this);
    }

    componentDidMount() {
        this.props.getOrdersHistory(this.state, undefined, this.onLoadFailed)
    }

    onLoadFailed(error) {
        console.log('error: ', error);
    }   

    handleDate (ev) {
        if (ev.keyIdentifier == "Down") {
            ev.preventDefault()
        }
        this.setState({
            [ev.target.name]: ev.target.value
        }, () => {
            this.props.getOrdersHistory(this.state)
        })

    }

    handleDropDown ({ value }) {
        this.setState({
            active:  value
        }, () => {
            this.props.getOrdersHistory(this.state)
        })
    }

    onSort (sortby, type) {
        if (sortby === 'score') {
            if (type === 'asc') {
                this.setState({
                    scoreSortType: 'des'
                })
                this.setState({
                    items: this.state.items.sort((a ,b) => {
                        if(a.book.play.title < b.book.play.title) { return -1; }
                        if(a.book.play.title > b.book.play.title) { return 1; }
                    })
                })
            } else if (type === 'des') {
                this.setState({
                    scoreSortType: 'asc'
                })
                this.setState({
                    items: this.state.items.sort((a ,b) => {
                        if(a.book.play.title < b.book.play.title) { return 1; }
                        if(a.book.play.title > b.book.play.title) { return -1; }
                    })
                })
            }
        } else if (sortby === 'date') {
            if (type === 'asc') {
                this.setState({
                    dateSortType: 'des'
                })
                this.setState({
                    items: this.state.items.sort(function(a,b){
                        return new Date(b.created) - new Date(a.created);
                    })
                })
            } else if (type === 'des') {
                this.setState({
                    dateSortType: 'asc'
                })
                this.setState({
                    items: this.state.items.sort(function(a,b){
                        return new Date(a.created) - new Date(b.created);
                    })
                })
            }
        } else if (sortby === 'active') {
            if (type === 'asc') {
                this.setState({
                    activeSortType: 'des'
                })
                this.setState({
                    items: this.state.items.sort(function(a,b){
                        return (a.state === b.state)? 0 : a.state? -1 : 1;
                    })
                })
            } else if (type === 'des') {
                this.setState({
                    activeSortType: 'asc'
                })
                this.setState({
                    items: this.state.items.sort(function(a,b){
                        return (b.state === a.state)? 0 : b.state? -1 : 1;
                    })
                })
            }
        }
    }

    render () {
        const { ActiveLanguageReducer: { words } } = this.props;
        const items = this.props.ordersHistory;
        
        return (
            <div className='order-histroy'>
                <h2>{words['profile_menu_ord-hist']}</h2>
                <div className='filters'>
                    <div className='right-cont'>
                        <div className='start-date'>
                            <label>{words.order_from}:</label>
                            <input type='date' name='start_date' onChange={this.handleDate} id='start-date' />
                        </div>
                        <div className='end-date'>
                            <label>TO:</label>
                            <input type='date' name='end_date' onChange={this.handleDate} />
                        </div>
                    </div>
                    <div className='left-cont'>
                        <label>Active</label>
                        
                        <DropDown
                            options={[
                                {value: '', label: 'None'},
                                {value: 1, label: 'Yes'},
                                {value: 2, label: 'No'},
                            ]}
                            onChange={this.handleDropDown}
                        />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th />
                            <th style={{width: '340px'}}><a onClick={() => this.onSort('score', this.state.scoreSortType)}>Score <i className='sort-icon' /></a></th>
                            <th><a onClick={() => this.onSort('date', this.state.dateSortType)}>{words.library_ordered} <i className='sort-icon' /></a></th>
                            <th><a onClick={() => this.onSort('active', this.state.activeSortType)}>Active <i className='sort-icon' /></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((item) => {
                            return (
                                <tr key={item.pid}>
                                    <td>
                                    <div className="lite-product" role="button" onClick={this.gotoProduct}>
                                        <div className="top-row">
                                        <img src="../media/images/product.jpg" width="93" height="83" />
                                        </div>
                                        <div className="middle-row">
                                            <a tabIndex="0" role="button" className="link-to-product">
                                                <h2 className="product-title">{item.book.play.title}</h2>
                                            </a>
                                            <ul>
                                                {item.book.play.composer && <li>{words.similarproduct_composer}: <span>{item.book.play.composer}</span></li>}
                                                {item.book.play.category && <li>{words.catalog_category}: <span>{item.book.play.category}</span></li>}
                                                {item.book.edition && <li>{words.similarproduct_edition}: <span>{item.book.edition}</span></li>}
                                                {item.book.instrument && <li>{words.similarproduct_instrument}: <span>{item.book.instrument}</span></li>}
                                            </ul>
                                        </div>
                                    </div>
                                    </td>
                                    <td style={{width: '386px'}}>
                                        <p>
                                            <strong>{item.book.play.title}</strong>
                                            {item.book.play.composer && `, ${item.book.play.composer}`}
                                            {item.book.play.category && `, ${item.book.play.category}`}
                                            {item.book.edition && `, ${item.book.edition}`}
                                            {item.book.instrument && `, ${item.book.instrument}`}
                                            {item.book.play.duration && `, ${item.book.play.duration}`}
                                        </p>
                                    </td>
                                    <td><span>{dateText(item.created)}</span></td>
                                    <td><span>{item.state? 'Yes': 'No'}</span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OrderHistory;