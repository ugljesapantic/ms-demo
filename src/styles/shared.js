import styled, {css} from 'styled-components';
import responsive from './responsive';

export const Logo = styled.div`
    height: 48px;
    width: 48px;
    background-image: url('https://via.placeholder.com/48x48.png?text=Magna+Serbia');

    ${responsive.tablet(css`
        background-image: url('https://via.placeholder.com/240x48.png?text=Magna+Serbia');
        width: 240px;
    `)}
`;

export const boxStyles = css`
    background-color: white;
    border-radius: 4px;
    border: 1px solid ${({theme}) => theme.backgroundDark};
    padding: 16px;
`
