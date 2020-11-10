import React from 'react'
import Navigation from "./components/layout/Navigation"
import { withRouter, Route, Switch, Redirect} from "react-router-dom"
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Signup from './views/Signup'
import ProtectedRoute from './utils/ProtectedRoutes'
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <Navigation/>
      <Switch>
        <ProtectedRoute exact path="/admin-dashboard" component={Dashboard} />
        <Route exact path="/admin-login" component={Login} />
        <Route exact path="/admin-signup" component={Signup} />
        <Route exact path="/" component={Login} />
        <Redirect to='/admin-login'/>

        {/* <Route exact path="/admin-dashboard" component={Dashboard} /> */}
      </Switch>
    </div>
  );
}

export default withRouter((props) => <App {...props} />);
