import React, { useEffect, useContext } from 'react'
import { fbAuth, AuthContext } from '../../App';
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string';
import { showSuccessToast, showErrorToast } from '../../utils/misc';
import { useIntl } from 'react-intl';

export const Activate = () => {
    const location = useLocation();
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const intl = useIntl();

    const handleQuery = () => {
        const params = qs.parse(location.search);
        switch (params.mode) {
            case 'verifyEmail': {
                fbAuth
                    .applyActionCode(params.oobCode)
                    .then(() => showSuccessToast(intl.formatMessage({id: 'auth.activated'})))
                    // TODO Catch error can have different error codes
                    .catch(e => showErrorToast(intl.formatMessage({id: 'auth.activated.error'})))
                    .finally(() => history.push('/'));
            }
        }
    }

    useEffect(() => {
        if (authContext.auth) {
            fbAuth.signOut().then(() => handleQuery());
            return;
        }

        handleQuery()
    }, [])

    return null;
}
