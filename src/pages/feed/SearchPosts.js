import React from 'react'
import TagInput from '../../components/TagInput';
import { PostTypeSelect } from '../../components/PostTypeSelect';
import Button from '../../components/Button';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const SearchPosts = ({setFilters, filters}) => {
    const intl = useIntl();

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
                placeholder={intl.formatMessage({id: 'feed.search'})}
                value={filters.tags}
            />
            <PostTypeSelect
                show={true}
                filters={filters.typeFilters}
                setFilters={setTypeFilters}
            />
            <Button secondary center text={intl.formatMessage({id: 'feed.clear-filters'})} onClick={() => setTypeFilters({})} /> 
        </Wrapper>
    )
}

export default SearchPosts
