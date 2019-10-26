import React, {useState} from 'react'
import TagInput from '../../components/TagInput';

const SearchPosts = ({setFilters}) => {
    const [value, setValue] = useState([])

    const onChange = e => {
        setValue(e);
        setFilters(e.map(option => option.label));
    }

    return (
        <div>
            <TagInput
                onChange={onChange}
                placeholder="Search posts"
                value={value}
            />
        </div>
    )
}

export default SearchPosts
