import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux';

import Login from './pages/login'
// import User from './pages/user'
// import About from './pages/about'
// import Help from './pages/help'
import Management from './pages/management'
// import CreateModel from './pages/management/sections/createmodel'
// import DeleteModel from './pages/management/sections/deletemodel'
import ModelLogs from './pages/management/sections/modellogs'
import CallHierarchy from './pages/management/sections/callhierarchy'
import Groups from './pages/groups'
import Users from './pages/users'
import Authorizations from './pages/authorizations'
import Modeling from './pages/modeling'
import CodeEditor from './pages/codeEditor'
import TabList from './pages/tablist'
import Projection from './pages/projection'
import Workflow from './pages/workflow'
import NotFound from './pages/notfound'

import { PrivateRoute } from './routes'
import { alertActions } from '../actions';
import { history } from '../utils';
import './index.css'
import Scheduled from './pages/scheduled';

class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
    
    render() {
        const { alert } = this.props;
        return (
            <div id="container">
                {/* <Switch>
                    <Route exact path='/' render={() => <Login store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/user' render={() => <User store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/about' render={() => <About store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/help' render={() => <Help store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/management' render={() => <Management store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/management/model' render={() => <Management store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/management/model/create' render={() => <CreateModel store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/management/model/delete' render={() => <DeleteModel store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/management/model/logs' render={() => <ModelLogs store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/management/groups' render={() => <Groups store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/management/users' render={() => <Users store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/management/authorizations' render={() => <Authorizations store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/modeling' render={() => <Modeling store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/codeEditor' render={() => <CodeEditor store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/workflow' render={() => <Workflow store={this.props.store} history={this.props.history} />} />
                    <Route exact path='/projection' render={() => <Projection store={this.props.store} history={this.props.history} />} />
                    <Route exact path='*' render={() => <NotFound store={this.props.store} history={this.props.history} />} />
                </Switch > */}
                {alert && alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path='/' component={Management} />
                        <PrivateRoute exact path='/management' component={Management} />
                        <PrivateRoute exact path='/management/model' component={Management} />
                        <PrivateRoute exact path='/management/model/logs' component={ModelLogs} />
                        <PrivateRoute exact path='/management/model/hierarchie' component={CallHierarchy} />
                        <PrivateRoute exact path='/management/groups' component={Groups} />
                        <PrivateRoute exact path='/management/users' component={Users} />
                        <PrivateRoute exact path='/management/authorizations' component={Authorizations} />
                        <PrivateRoute exact path='/modeling' component={Modeling} />
                        <PrivateRoute exact path='/codeEditor' component={CodeEditor} />
                        <PrivateRoute exact path='/workflow' component={Workflow} />
                        <PrivateRoute exact path='/projection' component={Projection} />
                        <PrivateRoute exact path='/scheduled' component={Scheduled} />
                        <PrivateRoute exact path='/tablist' component={TabList} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path='*' component={NotFound} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App)
