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
import Profile  from './pages/profile/Profile';
import http from './utils/http';

export const AuthContext = React.createContext();
export const FeedContext = React.createContext();
export const MyPostsContext = React.createContext();


const AppWrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  background: ${({theme}) => theme.background};
  ${({auth}) => auth && `padding-top: 48px`}
  display: flex;
  justify-content: center;
`;

export const fb = firebase;

export const fbAuth = firebase.auth();
export const fbFirestore = firebase.firestore();

const feedContextDefault = {
  posts: [],
  hasMore: true,
  filters: {},
  alive: false
}

const myPostsContextDefault = {
  posts: [],
}

class App extends React.Component {

  constructor() {
    super();
    fbAuth.onAuthStateChanged(user => {
      this.setState({
        initLoading: false,
        authContext: {
          auth: !!user
        },
        myPostsContext: {
          ...this.state.myPostsContext,
          ...myPostsContextDefault
        },
        feedContext: {
          ...this.state.feedContext,
          ...feedContextDefault
        }
      })
      if (user) {
        this.loadUserPosts();
      }
    })
  }

  async loadUserPosts () {
    const posts = await http('getMyPosts', 'GET', null, null, true);
    this.setMyPostsContext(() => ({posts}))
  }

  setAuth = (auth) => {
    this.setState({
      authContext: {
        auth,
      }
    })
  }

  setFeedContext = (func) => {
    const update = func(this.state.feedContext);
    this.setState({
      feedContext: {
        ...this.state.feedContext,
        ...update
      }
    })
  }

  // TODO Make generic
  setMyPostsContext = (func) => {
    const update = func(this.state.myPostsContext);
    this.setState({
      myPostsContext: {
        ...this.state.myPostsContext,
        ...update
      }
    })
  }

  state = {
    authContext: {
      auth: false,
      setAuth: this.setAuth,
    },
    feedContext: {
      setFeedContext: this.setFeedContext,
      ...feedContextDefault
    },
    myPostsContext: {
      ...myPostsContextDefault,
      set: this.setMyPostsContext
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
    const { authContext, initLoading, theme, feedContext, myPostsContext } = this.state;

    return (
    <ThemeProvider theme={theme}>
      <AppWrapper auth={authContext.auth}>
        <Router>
          <Loader size='massive' active={initLoading} />
          {authContext.auth && <UserNavbar />}
          {!initLoading && <AuthContext.Provider value={authContext}>
              <FeedContext.Provider value={feedContext}>
                <MyPostsContext.Provider value={myPostsContext}>
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
                    <UserRoute path="/profile">
                      <Profile />
                    </UserRoute>
                    <Route path="*">
                      <Redirect to='/' />
                    </Route>
                  </Switch>
                </MyPostsContext.Provider>
              </FeedContext.Provider>
          </AuthContext.Provider>}
        </Router>
      </AppWrapper>
    </ThemeProvider>
    );
  }
}

export default withTheme(App);
