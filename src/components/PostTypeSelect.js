import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

import { Radio } from 'semantic-ui-react';

const PostTypeRadio = styled.div`
    display: flex;
    justify-content: space-evenly;
    max-width: 600px;
    margin: 1rem auto;
`
const PARTNER_TYPE = {name: 'Partner', value:'PARTNER'};
const SUPPLY_TYPE = {name: 'Supply', value:'SUPPLY'};
const DEMAND_TYPE = {name: 'Demand', value:'DEMAND'};

const POST_TYPES = [
    PARTNER_TYPE,
    SUPPLY_TYPE,
    DEMAND_TYPE
]

const JOB_SUB_TYPE = {name: 'Job', value:'JOB'};
const INVESTOR_SUB_TYPE = {name: 'Investor', value:'INVESTOR'};

const POST_SUB_TYPES = [
    JOB_SUB_TYPE,
    INVESTOR_SUB_TYPE,
]

export const PostTypeSelect = ({show, setFilters}) => {
    const [postType, setPostType] = useState(PARTNER_TYPE.value);
    const [postSubType, setPostSubType] = useState(JOB_SUB_TYPE.value);

    useEffect(() => {
        setFilters({
            type: postType,
            postSubType: postType !== PARTNER_TYPE.value ? postSubType : null
        })
    }, [postType, postSubType, setFilters]);


    return (
        <React.Fragment>
            {show && <PostTypeRadio>
                {POST_TYPES.map(type => <Radio 
                    key={type.value}
                    name="type"  
                    value={type.value} 
                    label={type.name} 
                    checked={type.value === postType}
                    onChange={() => setPostType(type.value)} 
                />)}
            </PostTypeRadio>}
            {PARTNER_TYPE.value !== postType && <PostTypeRadio>
                {POST_SUB_TYPES.map(type => <Radio 
                    key={type.value}
                    name="subType"  
                    value={type.value} 
                    label={type.name} 
                    checked={type.value === postSubType}
                    onChange={() => setPostSubType(type.value)} 
                />)}
            </PostTypeRadio>}
        </React.Fragment>
    )
}
