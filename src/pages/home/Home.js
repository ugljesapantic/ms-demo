import React, { Component } from 'react'
import styled from 'styled-components';
import SignInModal from './SignInModal';
import { LimitedWidthContainer } from '../../styles/utils';
import SignUpModal from './SignUpModal';
import { Logo } from '../../styles/shared';
import { LanguageSelect } from '../../intl/LanguageSelect';

import graphics from '../../assets/graphics.gif';

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
    max-width: 1240px;
    padding: 0 16px;
    flex: 1;
    width: 100%;
    margin: 0 auto;
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
    color: darkslategray;
`;

const Text = styled.div`
    color: darkslategray;
    line-height: 1.5;
    font-size: 3rem;
    font-weight: bold;
    flex: 0 1 auto;
`;

const Graphics = styled.img`
    width: 680px;
    flex: 0 1 auto;
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
                    <Text>Welcome</Text>
                    <Graphics src={graphics}/>
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