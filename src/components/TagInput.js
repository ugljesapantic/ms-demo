import React from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable';
import {withTheme} from 'styled-components';
import { tagInputStyles } from '../styles/shared';

const TagInput = ({theme, placeholder, value, onChange}) => {
    return (
        <AsyncCreatableSelect
            isMulti
            blurInputOnSelect={false}
            value={value}
            loadOptions={null}
            formatCreateLabel={val => val}
            onChange={onChange}
            placeholder={placeholder}
            {...tagInputStyles(theme)}
        />
    )
}

export default withTheme(TagInput);
