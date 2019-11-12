import React, {useState, useEffect} from 'react'
import TagInput from '../../components/TagInput';
import { PostTypeSelect } from '../../components/PostTypeSelect';
import Button from '../../components/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const SearchPosts = ({setFilters}) => {
    const [tags, setTags] = useState([])
    const [typeFilters, setTypeFilters] = useState({});

    // TODO ???
    useEffect(() => {
        const filters = {
            ...typeFilters
        };

        if (tags) filters.tags = tags.map(tag => tag.value)

        setFilters(filters);
    }, [tags, typeFilters, setFilters])

    return (
        <Wrapper>
            <TagInput
                onChange={e => setTags(e)}
                placeholder="Search posts"
                value={tags}
            />
            <PostTypeSelect
                show={true}
                filters={typeFilters}
                setFilters={setTypeFilters}
            />
            <Button secondary center text='Clear' onClick={() => setTypeFilters({})} /> 
        </Wrapper>
    )
}

export default SearchPosts
