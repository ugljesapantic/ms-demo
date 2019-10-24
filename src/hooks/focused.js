import { useState, useEffect } from 'react';

export const useFocused = () => {
    const [focused, setFocused] = useState(false);

    const onFocus = () => {
        setFocused(true)
    }

    const onBlur = () => {
        setFocused(false)
    }

    const focusedProps = {
        onBlur,
        onFocus
    }

    return {
        focused,
        focusedProps,
    };
}

export default useFocused;