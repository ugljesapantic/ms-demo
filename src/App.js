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
import {Chats} from './pages/chats/Chats';
import { querySnapshotToArray } from './utils/firebase';
import Intl from './intl/Intl';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const AuthContext = React.createContext();
export const FeedContext = React.createContext();
export const MyPostsContext = React.createContext();
export const ChatsContext = React.createContext();


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

const CONTEXTS = {
  'chats': {
    chats: [],
    participants: {}
  },
  'auth': {
    auth: false
  },
  'myPosts': {
    posts: []
  },
  'feed': {
    posts: [],
    hasMore: true,
    filters: {},
    alive: false
  }
};

class App extends React.Component {
  
  constructor() {
    super();
    fbAuth.onAuthStateChanged(user => {

      this.setState({
        initLoading: false,
        ...this.getContextsState(),
        authContext: {
          auth: !!user,
        }
      })
      if (user) {
        this.loadUserPosts();
        this.loadUserChats();
      }
    })
  }

  async loadUserPosts () {
    const posts = await http('getMyPosts', 'GET', null, null, true);
    this.state.myPostsContext.set(() => ({posts}))
  }

  async loadUserChats() {
    fbFirestore
      .collection('chats')
      .where('participants', 'array-contains', fbAuth.currentUser.uid)
      .orderBy('lastMessageTime', 'desc')
      .onSnapshot(async doc => {
        const {chatsContext} = this.state;
        const chats = querySnapshotToArray(doc);
        const participantIds = chats.reduce((acc, curr) => new Set([...acc, ...curr.participants]), new Set());
        const newParticipants = [...participantIds].filter(id => !chatsContext.participants[id]);
        const userData = await Promise.all(newParticipants.map(id => http('getUser', 'GET', {id})));
        const participants = userData.reduce((acc, curr) => ({
          ...acc,
          [curr.id]: curr
        }), {})
        chatsContext.set(c => ({chats, participants: {...c.participants, ...participants}}))
      })
  }

  getContextsState() {
    return Object.keys(CONTEXTS).reduce((acc, contextName) => ({
      ...acc,
      [`${contextName}Context`]: {
        ...CONTEXTS[contextName],
        set: this.getContextSetter(contextName)
      },
    }), {})
  }

  getContextSetter = (contextName) =>  (func) => {
    const varName = `${contextName}Context`;
    const update = func(this.state[varName])
    this.setState({
      [varName]: {
        ...this.state[varName],
        ...update
      }
    })
  }

  state = {
    ...this.getContextsState(),
    initLoading: true,
    theme: {
      primary: '#094074',
      primaryDark: '#07335C',
      secondary: '#FFAB00',
      secondaryDark: '#CC8800',
      background: '#f5f5f5',
      backgroundDark: '#A0A0A0',
      negative: '#f44336'
    }
  }
  

  render() {
    const { authContext, initLoading, theme, feedContext, myPostsContext, chatsContext } = this.state;

    return (
      <Intl>
        <ThemeProvider theme={theme}>
          <AppWrapper auth={authContext.auth}>
            <Router>
              <Loader size='massive' active={initLoading} />
              <ToastContainer />
            
              {/* TODO Get rid of this hell */}
              {!initLoading && <AuthContext.Provider value={authContext}>
                  <FeedContext.Provider value={feedContext}>
                    <MyPostsContext.Provider value={myPostsContext}>
                      <ChatsContext.Provider value={chatsContext}>
                        {authContext.auth && <UserNavbar />}
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
                          <UserRoute path="/chat">
                            <Chats />
                          </UserRoute>
                          <UserRoute path="/profile">
                            <Profile />
                          </UserRoute>
                          <Route path="*">
                            <Redirect to='/' />
                          </Route>
                        </Switch>
                      </ChatsContext.Provider>
                    </MyPostsContext.Provider>
                  </FeedContext.Provider>
              </AuthContext.Provider>}
            </Router>
          </AppWrapper>
        </ThemeProvider>
      </Intl>
    );
  }
}

export default withTheme(App);
