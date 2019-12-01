import React, { Component } from 'react'
import styled from 'styled-components';
import SignInModal from './SignInModal';
import { LimitedWidthContainer } from '../../styles/utils';
import SignUpModal from './SignUpModal';
import { Logo } from '../../styles/shared';
import { LanguageSelect } from '../../intl/LanguageSelect';

const Header = styled(LimitedWidthContainer)`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 16px;
`;

const HeaderContainer = styled.div`
  background-color: ${({theme}) => theme.backgroundDark};
`;

const Main = styled.main`
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
    margin-right: auto;
`

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Footer = styled.footer`
    height: 4rem;
    line-height: 4rem;
    align-items: center;
    display: flex;
    justify-content: space-evenly;
    margin-top: auto;
    background-color: lightgray;
`

const Copyright = styled.div`
  
`;

class Home extends Component {
    
    render() {
        return (
            <Wrapper>
                <HeaderContainer>
                    <Header>
                        <StyledLogo />
                        <SignInModal />
                        <SignUpModal />
                    </Header>
                </HeaderContainer>
                <Main>
                    
                </Main>
                <Footer>
                    <Copyright>&copy; Magna Serbia 2019</Copyright>
                    <LanguageSelect />
                </Footer>
            </Wrapper>
        )
    }
}


export default Home;