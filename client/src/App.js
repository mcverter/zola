import React, { Component } from 'react';

import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import './css/App.css';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import UsersGrid from "./containers/UserGrid";
import LoginForm from './components/LoginForm'

class App extends Component {

    render() {
        const store = configureStore();

        return (
            <Provider store={store}>
                <MuiThemeProvider>
                <Router>
                    <Switch>
                        <Route path="/users" component={UsersGrid} />
                        <Route path="/" component={LoginForm} />
                    </Switch>
                </Router>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
