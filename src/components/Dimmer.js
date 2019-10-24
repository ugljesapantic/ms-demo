import React from 'react'
import styled, {css} from 'styled-components';

const Wrapper = styled.div`
    &:focus-within {
        box-shadow: 0 0 0 100vmax rgba(0,0,0,.3);
    }
    /* TODO maybe a param */
    border-radius: 4px;


    ${({loading}) => loading && `
        opacity: 0.5;
        pointer-events: none;
    `}
`;


const Dimmer = ({children, loading}) => {

    return <Wrapper loading={loading}>
        {children}
    </Wrapper>
}

export default Dimmer
