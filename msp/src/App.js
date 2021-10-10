import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home';
import News from './News';
import Data from './Data';
import GetInvolved from './GetInvolved';
import NavBar from './NavBar';
import Footer from './Footer';

function App() {
  return (
    <div>
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/data' component={Data} />
        <Route path='/news' component={News} />
        <Route path='/getInvolved' component={GetInvolved} />
      </Switch>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
