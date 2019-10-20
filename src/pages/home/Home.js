import React, { Component } from 'react'
import styled from 'styled-components';
import SignInModal from './SignInModal';
import { LimitedWidthContainer } from '../../styles/utils';
import SignUpModal from './SignUpModal';

const Header = styled(LimitedWidthContainer)`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 16px;
`;

const Logo = styled.img`
    margin-right: auto;
`;

const Main = styled.main`
  display: flex;
  align-items: center;
`;


export default class Home extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Header>
                    <Logo src={'https://via.placeholder.com/240x48.png?text=Magna+Serbia'} />
                    <SignInModal />
                    <SignUpModal />
                </Header>
                <Main>
                    Glavna strana
                </Main>
            </React.Fragment>
        )
    }
}
