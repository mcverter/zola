import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';

import {SERVER_URL} from './../config';
import {signOutUser} from "./../actions/auth/authActions";

import User from '../components/User';

class UsersGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            categories:[],
            filter: '',
            sort: '',
        };
    }

    componentWillMount() {
        fetch(`${SERVER_URL}/users`, {
            headers: new Headers({
            })})
            .then(response => response.json())
            .then(data=>{
                let categories = {};
                const users = data.users;
                users.forEach(user=>{
                    categories[user.category] = 1
                });
                this.setState({
                    users: users,
                    categories: Object.keys(categories)
                })
            });
    }

    setSort(type) {
        this.setState({
            sort: type
        })
    }

    setFilter(type) {
        this.setState({
            filter: type
        })
    }

    sortPriority(users) {
        return users.sort((user1, user2)=>
            user1.priority-user2.priority);
    }

    sortAlphabetically(users, direction) {
        return users.sort((user1, user2)=>
            direction*(user1.name.localeCompare(user2.name)));
    }

    filterByCategory(users, category){
        return category ? users.filter(user=>user.category===category):
            users;
    }

    applySortsAndFilters() {
        let users = this.state.users.slice();
        let {filter, sort} = this.state;
        switch (sort) {
            case 'alpha':
                users = this.sortAlphabetically(users, 1);
                break;
            case 'revAlpha':
                users = this.sortAlphabetically(users, -1);
                break;
            case 'priority':
                users = this.sortPriority(users);
                break;
            default:
                break;
        }
        return this.filterByCategory(users, filter)
    }

    render() {
        const {authenticated} = this.props;

        if (!authenticated) {
            return <Redirect to="/"/>
        }

        const users = this.applySortsAndFilters();

        return (
            <div className="container">
                <h1>Users </h1>
                <div className="users-grid">
                    {users.map((user, index) =>(<User key={index}{... user} />))}
                    {users.length % 3 === 2 && <div className="user-column-spacer" /> }
                </div>

                <div className="sort-panel">
                    <h1> Sort Users </h1>
                    <div className="sorts-row">
                        <button className="filter-radio" onClick={()=>{this.setSort('alpha')}}> Alphabetical Sort </button>
                        <button className="filter-radio" onClick={()=>{this.setSort('revAlpha')}}> Reverse Alphabetical Sort </button>
                        <button className="filter-radio" onClick={()=>{this.setSort('priority')}}> Priority Sort </button>
                        <button className="filter-radio" onClick={()=>{this.setSort('')}}>Clear Sorting </button>
                    </div>
                </div>

                <div className="filter-panel">
                    <h1> Filter Users </h1>
                    <div className="sorts-row">
                        {this.state.categories.map((cat)=>(
                            <div className="filter-radio" key={cat}>
                                <input type="radio" id="category-{cat}" name="category" value={cat}
                                       onClick={()=>this.setFilter(cat)}
                                />{cat}
                            </div>
                        ))}
                        {this.state.categories.length > 0 &&
                        <div>
                            <input key="-1" type="radio" id="category-none" name="category" value="none"
                                   onClick={()=>this.setFilter("")}
                            />Remove Filter
                        </div>}

                    </div>
                </div>

                <div>
                    <RaisedButton style={{marginTop: 20}} onClick={this.props.signOutUser}>Logout</RaisedButton>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOutUser: () => {
            dispatch(signOutUser());
        }
    };
};


function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersGrid)

