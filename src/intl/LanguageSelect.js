import React, { useContext } from 'react'
import { LANGUAGES, Context } from './Intl';
import { Dropdown } from 'semantic-ui-react';

export const LanguageSelect = (props) => {
    const context = useContext(Context);

    return (
        <Dropdown
            {...props}
            value={context.id}
            selection
            onChange={(_, option) => context.switchTo(option.value)}
            options={Object.keys(LANGUAGES).map(key => ({
                value: key,
                key: key,
                text: LANGUAGES[key].name
            }))}
        />
    )
}
