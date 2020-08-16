import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import Settings from './components/Settings';
import { history } from './helpers/history';
import ProtectedRoute from './helpers/protected.route';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute exact path="/main" component={Main} />
          <ProtectedRoute exact path="/settings" component={Settings} />
        </Switch>
      </Router>
    </div>
  );
}

// export default connect(mapStateToProps)(App);
export default App;
