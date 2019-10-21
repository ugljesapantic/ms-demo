import React, { Component } from 'react'
import styled from 'styled-components';
import SignInModal from './SignInModal';
import { LimitedWidthContainer } from '../../styles/utils';
import SignUpModal from './SignUpModal';
import { Logo } from '../../styles/shared';

const Header = styled(LimitedWidthContainer)`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 16px;
`;

const HeaderContainer = styled.div`
  background-color: #A0A0A0;
`;

const Main = styled.main`
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
    margin-right: auto;
`


export default class Home extends Component {
    
    render() {
        return (
            <React.Fragment>
                <HeaderContainer>
                    <Header>
                        <StyledLogo />
                        <SignInModal />
                        <SignUpModal />
                    </Header>
                </HeaderContainer>
                <Main>
                    Glavna strana
                </Main>
            </React.Fragment>
        )
    }
}
