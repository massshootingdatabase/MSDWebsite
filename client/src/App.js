import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Routing
import PrivateRoute from './components/routing/PrivateRoute';


//Screen
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import Dashboard from './components/entryScreens/Dashboard'; //data entry dashboard
import CreateIncident from './components/entryScreens/CreateIncident';

import Home from './Home';
import News from './News';
import Data from './Data';
import GetInvolved from './GetInvolved';
import NavBar from './NavBar';
import Footer from './Footer';
import viewMap from "./Map";
function App() {
  return (
    <div className="app">
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/data' component={Data} />
        <Route path='/news' component={News} />
        <Route path='/getInvolved' component={GetInvolved} />
        <Route path='/Map' component={viewMap} />
        <Route exact path="/login" component={LoginScreen}/>
        <Route exact path="/welcome" component={PrivateScreen}/>
        <Route exact path="/register" component={RegisterScreen}/>
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
        <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/createincident" component={CreateIncident}/>
      </Switch>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
