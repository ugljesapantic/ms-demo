import React from 'react'
import styled from 'styled-components';

import { Radio } from 'semantic-ui-react';
import { POST_TYPES, POST_SUB_TYPES } from '../utils/consts';

const PostTypeRadio = styled.div`
    display: flex;
    justify-content: space-evenly;
    min-width: 300px;
    margin: 0.75rem auto;
`

export const PostTypeSelect = ({show, filters, setFilters}) => {

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
                {POST_TYPES.map(type => <Radio 
                    key={type.value}
                    name="type"  
                    value={type.value} 
                    label={type.name} 
                    checked={type.value === (filters && filters.type)}
                    onChange={() => onTypeChange(type.value)} 
                />)}
            </PostTypeRadio>
            {filters && filters.type && <PostTypeRadio>
                {POST_SUB_TYPES.map(type => <Radio 
                    key={type.value}
                    name="subType"  
                    value={type.value} 
                    label={type.name} 
                    checked={type.value === (filters && filters.subType)}
                    onChange={() => onSubTypeChange(type.value)} 
                />)}
            </PostTypeRadio>}
        </React.Fragment>
    )
}
