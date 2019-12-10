import styled, {css} from 'styled-components';
import responsive from './responsive';

import Textarea from 'react-textarea-autosize';

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
    border: 1px solid ${({theme}) => theme.border};
    padding: 16px;
`


export const tagInputStyles = (theme) => ({
    styles : {
        control: (provided, state) => {
            const border = `1px solid ${state.isFocused ? theme.secondary : theme.border}`
            const boxShadow = 'none';
        
            return { ...provided, border, boxShadow };
        },
        menu: (provided, state) => {
            const display = state.options.length ? 'block' : 'none';
            return {...provided, display}
        }
    },
    components:{
        ClearIndicator: () => null,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        NoOptionsMessage: () => null
    }
})

export const StyledArea = styled(Textarea)`
    width: 100%;
    border: none;
    resize: none;
    border: 1px solid ${({theme}) => theme.border};
    border-radius: 4px;
    line-height: 1.4rem;
    padding: 8px;
    ::-webkit-scrollbar { 
        display: none; 
    }

    &:focus {
        border-color: ${({theme}) => theme.secondary};
        outline: none;
    }
`;


export const UnreadCount = styled.div`
  grid-column: 3;
  grid-row: 2;
  border-radius: 0.75rem;
  background-color: #06d755;
  color: white;
  width: min-content;
  min-width: 1.5rem;
  line-height: 1.5rem;
  height: 1.5rem;
  font-weight: bold;
  text-align: center;
  justify-self: center;
  font-size: 0.8rem;
  padding: 0 0.4rem;
`;
