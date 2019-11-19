import React, { Component } from 'react'
import http from '../../utils/http';
import { EditInfo } from './EditInfo';
import { MyPostsContext } from '../../App';
import styled from 'styled-components';
import Posts from '../feed/Posts';
import { LimitedWidthContainer } from '../../styles/utils';

const ProfileWrapper = styled.div`
  max-width: 25rem;
  margin: 3rem auto;
  width: 100%;
`;

const ProfileContainer = styled(LimitedWidthContainer)`
    
`

const MyPostsContainer = styled.div`
    display: grid;
    grid-row-gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: min-content;
`

export default class Profile extends Component {
    state = {
        user: null,
    }

    async componentDidMount() {
        const user = await http('getSelf', 'GET', null, null, true);

        this.setState({user})
    }

    render() {
        const {user} = this.state;
        return (
            <ProfileContainer>
                {/* TODO add loading */}
                {user && 
                    <ProfileWrapper>
                        <EditInfo user={user} />
                    </ProfileWrapper>
                }
                {!user && <div>Loading...</div>}
                {user && <MyPostsContext.Consumer>
                    {value => <MyPostsContainer>
                        <Posts posts={value.posts} />
                    </MyPostsContainer>}
                </MyPostsContext.Consumer>}
            </ProfileContainer>
        )
    }
}
