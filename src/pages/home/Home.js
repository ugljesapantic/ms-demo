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
`

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
            </Wrapper>
        )
    }
}


export default Home;