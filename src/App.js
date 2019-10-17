import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Feed from './pages/feed/Feed';
import Home from './pages/home/Home';
import GuestRoute from './navigation/GuestRoute';
import UserRoute from './navigation/UserRoute';

export const AuthContext = React.createContext();

class App extends React.Component {
  setAuth = (auth) => {
    this.setState({
      authContext: {
        auth
      }
    })
  }

  state = {
    authContext: {
      auth: false,
      setAuth: this.setAuth
    }
  }

  render() {
    const { authContext } = this.state;

    return (
      <div className="App">
        <AuthContext.Provider value={authContext}>
          <Router>
            <Switch>
              <GuestRoute path="/" exact>
                <Home />
              </GuestRoute>
              <UserRoute path="/feed">
                <Feed />
              </UserRoute>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
