import React from 'react'
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
    box-shadow: 0px 3px 7px rgba(0,0,0,.2);
    padding: 1rem;
`

export const lightText = css`
    color: rgba(0,0,0,0.6);
    font-weight: 300;
`

export const StyledTag = styled.div`
    border-radius: 0.75rem ;
    padding: 0 0.75rem;
    font-size: 0.9rem;
    line-height: 2rem;
    background: ${({matched}) => matched ? '#5cb85c' : '#337ab7'};
    color: white;
    box-shadow: 0px 0px 2px rgba(0,0,0,.5);
    margin: 0.25rem;
    cursor: pointer;
`

export const tagInputStyles = (theme) => ({
    styles : {
        control: (provided, state) => {
            const border = `none`
            const boxShadow = '0px 0px 3px rgba(0,0,0,.6)';
            const borderRadius= '1rem';
            const padding= '0.25rem';
        
            return { ...provided, border, boxShadow, borderRadius, padding };
        },
        menu: (provided, state) => {
            const display = state.options.length ? 'block' : 'none';
            return {...provided, display}
        },
        valueContainer: (provided) => {
            const padding= '0rem';
            return {...provided, padding}
        },
        input: (provided) => {
            const marginLeft= '0.5rem';
            return {...provided, marginLeft}
        },
        placeholder: (provided) => {
            const marginLeft= '0.5rem';
            return {...provided, marginLeft}
        }
        
    },
    components: {
        ClearIndicator: () => null,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        NoOptionsMessage: () => null,
        MultiValue: (provided) => (<StyledTag onClick={provided.removeProps.onClick}>{provided.children}</StyledTag>),
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
