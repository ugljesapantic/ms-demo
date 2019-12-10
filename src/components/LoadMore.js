import React from 'react'
import styled from 'styled-components';
import Button from './Button';
import { Loader } from 'semantic-ui-react';
import { Loading } from './Loading';

const Wrapper = styled.div`
    text-align: center;
    height: 40px;
    line-height: 40px;
`;

const LoadMore = ({loading, ...rest}) => {
    return (
        <Wrapper {...rest}>
            {loading ? <Loading /> : <Button secondary text='Load more' /> }
        </Wrapper>
    )
}

export default LoadMore
