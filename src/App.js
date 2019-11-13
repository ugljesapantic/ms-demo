import React from 'react';
import styled, {ThemeProvider, withTheme} from 'styled-components';
import './App.scss';
import firebase from './config/firebaseConfig';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Feed from './pages/feed/Feed';
import Home from './pages/home/Home';
import GuestRoute from './navigation/GuestRoute';
import UserRoute from './navigation/UserRoute';
import { Loader } from 'semantic-ui-react';
import UserNavbar from './navigation/UserNavbar';
import { PostDetails } from './pages/post-details/PostDetails';

export const AuthContext = React.createContext();

const AppWrapper = styled.div`
  min-height: 100vh;
  background: ${({theme}) => theme.background};
  ${({auth}) => auth && `padding-top: 48px`}
  display: flex;
  justify-content: center;
`;

export const fb = firebase;

export const fbAuth = firebase.auth();
export const fbFirestore = firebase.firestore();


class App extends React.Component {

  constructor() {
    super();
    fbAuth.onAuthStateChanged(user => {
      this.setState({initLoading: false})
      this.setAuth(!!user);
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
    theme: {
      primary: '#094074',
      primaryDark: '#07335C',
      secondary: '#FFAB00',
      secondaryDark: '#CC8800',
      background: '#f5f5f5',
      backgroundDark: '#A0A0A0'
    }
  }
  

  render() {
    const { authContext, initLoading, theme } = this.state;

    return (
    <ThemeProvider theme={theme}>
      <AppWrapper auth={authContext.auth}>
        <Router>
          <Loader size='massive' active={initLoading} />
          {authContext.auth && <UserNavbar />}
          {!initLoading && <AuthContext.Provider value={authContext}>
            
              <Switch>
                <GuestRoute path="/" exact>
                  <Home />
                </GuestRoute>
                <UserRoute path="/feed/:id">
                  <PostDetails />
                </UserRoute>
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
    </ThemeProvider>
    );
  }
}

export default withTheme(App);
