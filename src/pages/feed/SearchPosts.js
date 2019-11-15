import React from 'react'
import TagInput from '../../components/TagInput';
import { PostTypeSelect } from '../../components/PostTypeSelect';
import Button from '../../components/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const SearchPosts = ({setFilters, filters}) => {
    const setTypeFilters = typeFilters => {
        setFilters({
            ...filters,
            typeFilters
        })
    }

    const setTags = tags => {
        setFilters({
            ...filters,
            tags
        })
    }

    return (
        <Wrapper>
            <TagInput
                onChange={e => setTags(e)}
                placeholder="Search posts"
                value={filters.tags}
            />
            <PostTypeSelect
                show={true}
                filters={filters.typeFilters}
                setFilters={setTypeFilters}
            />
            <Button secondary center text='Clear' onClick={() => setTypeFilters({})} /> 
        </Wrapper>
    )
}

export default SearchPosts
