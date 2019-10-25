import React from 'react'
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
    text-align: center;
`;

const LoadMore = (props) => {
    return (
        <Wrapper {...props}>
            <Button secondary text='Load more' />
        </Wrapper>
    )
}

export default LoadMore
