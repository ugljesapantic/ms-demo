import React, {useState} from 'react'
import { LimitedWidthContainer, ButtonLink } from '../styles/utils';
import styled, {css} from 'styled-components';
import { signOut } from '../services/auth';
import Button from '../components/Button';
import { Logo } from '../styles/shared';
import { Icon } from 'semantic-ui-react';
import useDevice from '../hooks/responsive';
import { useHistory } from 'react-router-dom'


const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${({theme}) => theme.primary};
  height: 48px;
  z-index: 100;
`;

const Navbar = styled(LimitedWidthContainer) `
    margin: 0 auto;
    display: flex;
    align-items: center;
`

const StyledLogo = styled(Logo)`
  margin-right: auto;
`;

const mobSidebarStyles = css`
    height: 100%;
    position: fixed;
    top: 0;
`

const StyledButton = styled(Button)``

const Sidebar = styled.div`
    ${mobSidebarStyles}
    width: 240px;
    left: ${({visible}) => visible ? 'calc(100% - 240px)' : '100%'};
    background: ${({theme}) => theme.primary};
    z-index: 1010;
    transition: left 0.25s ease-in-out;
    align-items: left;
    flex-direction: column;
    display: flex;

    ${StyledButton} {
        text-align: left;
    }
`

const Dimmer = styled.div`
    ${mobSidebarStyles}
    width: 100%;
    z-index: 1005;
    background-color: rgba(0,0,0,0.7);
    left: ${({visible}) => visible ? '0' : '100%'};
    opacity: ${({visible}) => visible ? '1' : '0'};
    transition: opacity 0.25s ease-in-out;
`

const MenuItems = ({history, close}) => {
    const goTo = state => {
        history.push(`/${state}`);
        close();
    };
    // TODO Fix selected
    return (
        <React.Fragment>
            <ButtonLink activeClassName="selected" onClick={() => goTo('feed')}>Feed</ButtonLink>
            <ButtonLink activeClassName="selected" onClick={() => goTo('chat')}>Messages</ButtonLink>
            <ButtonLink activeClassName="selected" onClick={() => goTo('profile')}>Profile</ButtonLink>
            <StyledButton onClick={() => signOut()} text='Sign out' />
        </React.Fragment>
    )
}

const UserNavbar = () => {
    const [visible, setVisible] = useState(false);
    const { isMobile } = useDevice();
    const history = useHistory();

    return (
        <Wrapper>
            <Navbar>
                <StyledLogo />
                {isMobile ? <React.Fragment>
                    <Icon inverted name='bars' onClick={() => setVisible(true)} />
                    <Sidebar visible={visible}>
                        <MenuItems history={history} close={() => setVisible(false)} />
                    </Sidebar>
                    <Dimmer onClick={() => setVisible(false)} visible={visible} />
                </React.Fragment> : <MenuItems history={history} close={() => setVisible(false)}/>}
            </Navbar>
        </Wrapper>
    )
}

export default UserNavbar
