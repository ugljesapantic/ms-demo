import React, {useState} from 'react'
import { LimitedWidthContainer, ButtonLink } from '../styles/utils';
import styled, {css} from 'styled-components';
import { signOut } from '../services/auth';
import Button from '../components/Button';
import { Logo } from '../styles/shared';
import { Icon } from 'semantic-ui-react';
import useDevice from '../hooks/responsive';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #313163;
  height: 48px;
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
    background: #313163;
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

const MenuItems = () => {
    return (
        <React.Fragment>
            <ButtonLink activeClassName="selected" to='feed'>Feed</ButtonLink>
            <ButtonLink activeClassName="selected" to='messages'>Messages</ButtonLink>
            <ButtonLink activeClassName="selected" to='profile'>Profile</ButtonLink>
            <StyledButton onClick={() => signOut()} text='Sign out' />
        </React.Fragment>
    )
}

const UserNavbar = () => {
    const [visible, setVisible] = useState(false);
    const { isMobile } = useDevice();
    return (
        <Wrapper>
            <Navbar>
                <StyledLogo />
                {isMobile ? <React.Fragment>
                    <Icon inverted name='bars' onClick={() => setVisible(true)} />
                    <Sidebar visible={visible}>
                        <MenuItems />
                    </Sidebar>
                    <Dimmer onClick={() => setVisible(false)} visible={visible} />
                </React.Fragment> : <MenuItems />}
            </Navbar>
        </Wrapper>
    )
}

export default UserNavbar
