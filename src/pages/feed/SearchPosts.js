import React, {useState, useEffect} from 'react'
import TagInput from '../../components/TagInput';

const SearchPosts = ({setFilters}) => {
    const [tags, setTags] = useState([])

    // TODO ???
    useEffect(() => {
        const filters = {};
        if (tags) filters.tags = tags.map(tag => tag.value) 
        setFilters(filters);
    }, [tags, setFilters])

    return (
        <div>
            <TagInput
                onChange={e => setTags(e)}
                placeholder="Search posts"
                value={tags}
            />
        </div>
    )
}

export default SearchPosts
