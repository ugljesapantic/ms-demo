import { useState, useEffect } from 'react';

export const useForm = (init, vs) => {
    const [values, setValues] = useState(init);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [markError, setMarkError] = useState({});
    const [valid, setValid] = useState(false);
    const [validators] = useState(vs);

    useEffect(() => {
        const _errors = {};
        // TODO Use filter + map/reduce
        // TODO Dont test all validators ??
        validators.forEach(validator => {
            if (!validator.test(values)) _errors[validator.name] = validator.error;
        })
        setErrors(_errors);
        setValid(!Object.keys(_errors).length) 
    }, [values, validators]);

    useEffect(() => {
        const _markError = Object.keys(errors).filter(key => touched[key]).reduce((ac, key) => ({...ac, [key]: true}), {})
        setMarkError(_markError);
    }, [errors, touched]);

    const onChange = event => {
        if (event.persist) {
            event.persist();
        }

        const name = event.target.name;
        const value = event.target.value;

        const _values = {
            ...values,
            [name]: value,
        };
        setValues(_values);
    };

    const onBlur = event => {
        if (event.persist) {
            event.persist();
        }

        const name = event.target.name;

        const _touched = {
            ...touched,
            [name]: true,
        };
        setTouched(_touched);
    }

    const reset = () => {
        setValues(init);
    }

    return {
        values,
        errors,
        valid,
        touched,
        onChange,
        onBlur,
        markError,
        reset
    };
}

export default useForm;