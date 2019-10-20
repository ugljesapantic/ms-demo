import React from 'react';
import styled from 'styled-components';
import './App.scss';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Feed from './pages/feed/Feed';
import Home from './pages/home/Home';
import GuestRoute from './navigation/GuestRoute';
import UserRoute from './navigation/UserRoute';
import { getFirebase } from './utils/firebase';
import { Loader } from 'semantic-ui-react';
import UserNavbar from './navigation/UserNavbar';

export const AuthContext = React.createContext();

const AppWrapper = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
  ${({auth}) => auth && `padding-top: 48px`}
`;

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
      <AppWrapper auth={authContext.auth}>
        <Router>
          <Loader size='massive' active={initLoading} />
          {authContext.auth && <UserNavbar />}
          {!initLoading && <AuthContext.Provider value={authContext}>
            
              <Switch>
                <GuestRoute path="/" exact>
                  <Home />
                </GuestRoute>
                <UserRoute path="/feed">
                  <Feed />
                </UserRoute>
                <Route path="*">
                  <Redirect to='/' />
                </Route>
              </Switch>
            
          </AuthContext.Provider>}
        </Router>
      </AppWrapper>
    );
  }
}

export default App;
