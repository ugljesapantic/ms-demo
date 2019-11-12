import React from 'react'
import styled from 'styled-components';

import { Radio } from 'semantic-ui-react';
import { PARTNER_TYPE, POST_TYPES, POST_SUB_TYPES } from '../utils/consts';

const PostTypeRadio = styled.div`
    display: flex;
    justify-content: space-evenly;
    min-width: 300px;
    margin: 0.75rem auto;
`

export const PostTypeSelect = ({show, filters, setFilters}) => {

    const onTypeChange = postType => {
        const postSubType = postType !== PARTNER_TYPE.value ? filters.postSubType : null
        setFilters({
            postType,
            postSubType
        })
    }

    const onSubTypeChange = postSubType => {
        setFilters({
            ...filters,
            postSubType
        })
    }

    return (
        <React.Fragment>
            {show && <PostTypeRadio>
                {POST_TYPES.map(type => <Radio 
                    key={type.value}
                    name="type"  
                    value={type.value} 
                    label={type.name} 
                    checked={type.value === filters.postType}
                    onChange={() => onTypeChange(type.value)} 
                />)}
            </PostTypeRadio>}
            {PARTNER_TYPE.value !== filters.postType && <PostTypeRadio>
                {POST_SUB_TYPES.map(type => <Radio 
                    key={type.value}
                    name="subType"  
                    value={type.value} 
                    label={type.name} 
                    checked={type.value === filters.postSubType}
                    onChange={() => onSubTypeChange(type.value)} 
                />)}
            </PostTypeRadio>}
        </React.Fragment>
    )
}
