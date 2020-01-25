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

const StyledButton = styled(Button)`
    margin-top: 0.75rem;
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

    const hasFilters = filters.tags.length || filters.typeFilters.type

    return (
        <Wrapper>
            <PostTypeSelect
                show={true}
                filters={filters.typeFilters}
                setFilters={setTypeFilters}
            />
            <TagInput
                onChange={e => setTags(e || [])}
                placeholder={intl.formatMessage({id: 'feed.search'})}
                value={filters.tags}
            />
            {/* TODO Consider clear all tags */}
            {hasFilters && <StyledButton secondary center text={intl.formatMessage({id: 'feed.clear-filters'})} onClick={() => {
                setFilters({
                    typeFilters: {},
                    from: filters.from,
                    tags: []
                });
            }} />}
        </Wrapper>
    )
}

export default SearchPosts
