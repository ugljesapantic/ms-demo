import React from 'react'
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
    text-align: center;
    height: 40px;
    line-height: 40px;
`;

const LoadMore = ({loading, ...rest}) => {
    return (
        <Wrapper {...rest}>
            {loading ? <div>Loading...</div> : <Button secondary text='Load more' /> }
        </Wrapper>
    )
}

export default LoadMore
