import React from 'react'
import { LimitedWidthContainer } from '../styles/utils';
import styled from 'styled-components';
import { signOut } from '../services/auth';
import Button from '../components/Button';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #283E4A;
  height: 48px;
`;

const Navbar = styled(LimitedWidthContainer) `
    margin: 0 auto;
    display: flex;
    align-items: center;
`

const Logo = styled.img`
  margin-right: auto;
  height: 100%;
`;

const MenuItems = () => {
    return (
        <React.Fragment>
            <Button white text='Feed' />
            <Button white text='Messages' />
            <Button white text='Profile' />
            <Button white text='Sign out' onClick={() => signOut()} />
        </React.Fragment>
    )
}

const UserNavbar = () => {
    // const [visible, setVisible] = useState(false)
    return (
        <Wrapper>
            <Navbar>
                {/* <Icon inverted name='bars' onClick={() => setVisible(true)} /> */}
                {/* <Sidebar
                    as={Menu}
                    animation='overlay'
                    onHide={() => setVisible(false)}
                    vertical
                    direction='right'
                    visible={visible}
                    width='thin'
                >
                    <MenuItems />
                </Sidebar> */}
                <Logo src={'https://via.placeholder.com/240x48.png?text=Magna+Serbia'} />
                <MenuItems />
            </Navbar>
        </Wrapper>
    )
}

export default UserNavbar
