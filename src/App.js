import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Feed from './pages/feed/Feed';
import Home from './pages/home/Home';
import GuestRoute from './navigation/GuestRoute';
import UserRoute from './navigation/UserRoute';
import { getFirebase } from './utils/firebase';

export const AuthContext = React.createContext();



class App extends React.Component {

  constructor() {
    super();
    getFirebase().auth().onAuthStateChanged((x) => {
      this.setAuth(!!x)
      this.setState({initLoading: false})
    })
  }

  setAuth = (auth) => {
    this.setState({
      authContext: {
        auth,
      }
    })
  }

  state = {
    authContext: {
      auth: false,
      setAuth: this.setAuth,
    },
    initLoading: true,
  }
  

  render() {
    const { authContext, initLoading } = this.state;

    return (
      <div className="App">
        {initLoading ? <div>loading....</div> : <AuthContext.Provider value={authContext}>
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
        </AuthContext.Provider>}
      </div>
    );
  }
}

export default App;
