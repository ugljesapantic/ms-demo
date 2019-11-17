import React, { Component } from 'react'
import http from '../../utils/http';
import { EditInfo } from './EditInfo';
import { fbAuth } from '../../App';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 25rem;
  margin-top: 5rem;
  width: 100%;
`;

export default class Profile extends Component {
    state = {
        user: null
    }
    async componentDidMount() {
        const user = await http('getSelf', 'GET', null, null, true);

        this.setState({user})
    }
    render() {
        const {user} = this.state;
        return (
            <Wrapper>
                {/* TODO add loading */}
                {user && <EditInfo user={user} />}
                {!user && <div>Loading...</div>}
            </Wrapper>
        )
    }
}
