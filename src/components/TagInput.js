import React from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable';
import {withTheme} from 'styled-components';
import { tagInputStyles } from '../styles/shared';
import http from '../utils/http';

const TagInput = ({theme, placeholder, value, onChange}) => {

    const loadOptions = async name => {
        const result = await http('searchTag', 'GET', {name});
        return result.map(option => ({label: option.name, value: option._id}))
    };
    const onCreateOption = async name => {
        const option = await http('createTag', 'POST', null, {name});
        onChange([...value, ({label: option.name, value: option._id})])
    };

    return (
        <AsyncCreatableSelect
            isMulti
            blurInputOnSelect={false}
            value={value}
            loadOptions={loadOptions}
            formatCreateLabel={val => `Create ${val}?`}
            onChange={onChange}
            onCreateOption={onCreateOption}
            placeholder={placeholder}
            {...tagInputStyles(theme)}
        />
    )
}

export default withTheme(TagInput);
