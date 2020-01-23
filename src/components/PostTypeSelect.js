import React from 'react'
import styled, {css} from 'styled-components';

import { POST_TYPES, POST_SUB_TYPES } from '../utils/consts';
import { useIntl } from 'react-intl';

const PostTypeRadio = styled.div`
    display: flex;
    justify-content: space-evenly;
    min-width: 300px;
    margin: 0.75rem auto 0.75rem;

    ${({horizontal}) => horizontal && `
        flex-direction: column;
        height: 12rem;
        align-items: center;
        margin-top: 0rem;
    `}
`

const PostTypeOption = styled.div`
    width: 20rem;
    max-width: 40vw;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 1rem;
    border: 1px solid ${({theme}) => theme.border };
    color: black;
    cursor: pointer;
    text-align: center;
    margin: 0 0.5rem;
    background: white;

    ${({checked, theme}) => checked && css`
        color: white;
        background: ${theme.primary};
    `}

    ${({horizontal}) => horizontal && `
        max-width: 80vw;
    `}
`

export const PostTypeSelect = ({filters, setFilters}) => {
    const intl = useIntl();

    const onTypeChange = type => {
        setFilters({
            type,
            subType: null
        })
    }

    const onSubTypeChange = subType => {
        setFilters({
            ...filters,
            subType
        })
    }
    
    return (
        <React.Fragment>
            <PostTypeRadio>
                {POST_TYPES.map(type => <PostTypeOption 
                    key={type.value}
                    checked={type.value === (filters && filters.type)}
                    onClick={() => onTypeChange(type.value)} 
                >{intl.formatMessage({id: type.name})}</PostTypeOption>)}
            </PostTypeRadio>
            {filters && filters.type && <PostTypeRadio horizontal>
                {POST_SUB_TYPES.map(type => <PostTypeOption 
                    horizontal
                    key={type.value} 
                    checked={type.value === (filters && filters.subType)}
                    onClick={() => onSubTypeChange(type.value)} 
                >{intl.formatMessage({id: type[filters.type]})}</PostTypeOption>)}
            </PostTypeRadio>}
        </React.Fragment>
    )
}
