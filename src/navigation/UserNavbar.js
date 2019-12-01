import React, {useState, useContext} from 'react'
import { LimitedWidthContainer, ButtonLink } from '../styles/utils';
import styled, {css} from 'styled-components';
import { signOut } from '../services/auth';
import Button from '../components/Button';
import { Logo, UnreadCount } from '../styles/shared';
import { Icon } from 'semantic-ui-react';
import useDevice from '../hooks/responsive';
import { useHistory } from 'react-router-dom'
import { ChatsContext, fbAuth } from '../App';
import { getUnreadKey } from '../utils/misc';
import { useIntl } from 'react-intl';


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

const ChatsButton = styled.div`
  display: flex;
  ${UnreadCount} {
      margin-left: 0.5rem;
  }
`;

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

const MenuItems = ({close, chats}) => {
    const intl = useIntl();

    return (
        <React.Fragment>
            <ButtonLink activeClassName="selected" to='/feed' onClick={close}>{intl.formatMessage({id: 'nav.feed'})}</ButtonLink>
            {chats && <ButtonLink activeClassName="selected" to='/chat' onClick={close}>
                <ChatsButton>
                    <div>{intl.formatMessage({id: 'nav.messages'})}</div>
                    {!!chats.count && <UnreadCount>{chats.count}</UnreadCount>}
                </ChatsButton>
            </ButtonLink>}
            <ButtonLink activeClassName="selected" to='/profile' onClick={close}>{intl.formatMessage({id: 'nav.profile'})}</ButtonLink>
            <StyledButton onClick={() => signOut()} text={intl.formatMessage({id: 'nav.sign-out'})} />
        </React.Fragment>
    )
}

const UserNavbar = () => {
    const [visible, setVisible] = useState(false);
    const chatsContext = useContext(ChatsContext);
    const { isMobile } = useDevice();
    const history = useHistory();

    let chats;
    if (chatsContext.chats.length) {
        const key = getUnreadKey(fbAuth.currentUser.uid);
        const count = chatsContext.chats.reduce((acc, curr) => curr[key] ? acc + 1 : acc , 0)
        chats = {count};
    }

    return (
        <Wrapper>
            <Navbar>
                <StyledLogo />
                {isMobile ? <React.Fragment>
                    <Icon inverted name='bars' onClick={() => setVisible(true)} />
                    <Sidebar visible={visible}>
                        {/* TODO Reuse */}
                        <MenuItems history={history} chats={chats} close={() => setVisible(false)} />
                    </Sidebar>
                    <Dimmer onClick={() => setVisible(false)} visible={visible} />
                </React.Fragment> : <MenuItems history={history} chats={chats} close={() => setVisible(false)}/>}
            </Navbar>
        </Wrapper>
    )
}

export default UserNavbar
