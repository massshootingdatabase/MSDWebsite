import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Routing
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


//Screen
import PrivateScreen from './screens/PrivateScreen/PrivateScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen/ResetPasswordScreen';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen'; //data entry dashboard
import CreateIncidentScreen from './screens/DashboardScreen/DashboardScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import NewsScreen from './screens/NewsScreen/NewsScreen';
import DataScreen from './screens/DataScreen/DataScreen';
import GetInvolvedScreen from './screens/GetInvolvedScreen/GetInvolvedScreen';
import viewMapScreen from "./screens/MapScreen/MapScreen";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function App() {
  return (
    <div className="app">
    <ReactNotifications/>
    <Router>
      <NavBar />
      <div className="content">
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/data' component={DataScreen} />
        <Route path='/news' component={NewsScreen} />
        <Route path='/getInvolved' component={GetInvolvedScreen} />
        <Route path='/Map' component={viewMapScreen} />
        <Route exact path="/login" component={LoginScreen}/>
        <Route exact path="/welcome" component={PrivateScreen}/>
        <Route exact path="/register" component={RegisterScreen}/>
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
        <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen}/>
        <Route exact path="/dashboard" component={DashboardScreen}/>
        <Route exact path="/createincident" component={CreateIncidentScreen}/>
        <Route exact path="/signup" component={SignupScreen}/>
      </Switch>
      </div> 
      
    </Router>
    <Footer />
    </div>
  );
}

export default App;
