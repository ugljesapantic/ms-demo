import React from 'react';
import styled from 'styled-components';
import './App.scss';
import 'typeface-roboto';

import { BrowserRouter as Router, Switch } from 'react-router-dom'
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
  background: ${({auth}) => auth ? '#F5F5F5' : '#A0A0A0'};
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
        <Loader size='massive' active={initLoading} />
        {authContext.auth && <UserNavbar />}
        {!initLoading && <AuthContext.Provider value={authContext}>
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
      </AppWrapper>
    );
  }
}

export default App;
