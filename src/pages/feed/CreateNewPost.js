import React, { useState } from 'react'
import useForm from '../../hooks/forms';
import Textarea from 'react-textarea-autosize';

import styled, {withTheme} from 'styled-components';
import Dimmer from '../../components/Dimmer';
import Button from '../../components/Button';
import { boxStyles } from '../../styles/shared';
import TagInput from '../../components/TagInput';
import http from '../../utils/http';
import { withUserUid } from '../../utils/firebase';
import { Radio } from 'semantic-ui-react';


const StyledArea = styled(Textarea)`
    width: 100%;
    border: none;
    resize: none;
    border: 1px solid transparent;
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

const StyledButton = styled(Button)`
  margin-top: 8px;
`;

const Wrapper = styled.div`
   ${boxStyles}
`;

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


const CreateNewPost = ({theme}) => {
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [postType, setPostType] = useState(PARTNER_TYPE.value);
    const [postSubType, setPostSubType] = useState(JOB_SUB_TYPE.value);

    const {values, onChange, reset} = useForm({
        content: ''
    }, []);

    const resetAndUnfocus = () => {
        reset();
        setTags([]);
        document.activeElement.blur();
    }

    const createPostHandler = async () => {
        setLoading(true);
        await http('createPost', 'POST', null, withUserUid({
            ...values,
            type: postType,
            subType: postSubType,
            tags: tags.map(t => t.value)
        }));
        resetAndUnfocus();
        setLoading(false);
    };

    const iProps={values,onChange};

    return (
        <Dimmer loading={loading ? 1 : 0}>
            <Wrapper>
                <StyledArea
                    {...iProps}
                    value={values.content}
                    minRows={1}
                    name="content"
                    onKeyDown={e => e.key === "Escape" && resetAndUnfocus()}
                    placeholder={'What are you thinking about? :D'}
                />
                {values.content && <TagInput 
                    onChange={e => setTags(e)}
                    placeholder="Add your tags"
                    value={tags}
                />}
                {!!tags.length && <PostTypeRadio>
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
                {!!tags.length && <StyledButton onClick={createPostHandler} secondary text="Post" width="100%" />}
            </Wrapper>
        </Dimmer>
    )
}

export default withTheme(CreateNewPost)
