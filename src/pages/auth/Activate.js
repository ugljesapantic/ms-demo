import React, { useEffect, useContext } from 'react'
import { fbAuth, AuthContext } from '../../App';
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string';
import { showSuccessToast, showErrorToast } from '../../utils/misc';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

export const Activate = () => {
    const location = useLocation();
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const intl = useIntl();

    const handleQuery = (signedIn) => {
        const params = qs.parse(location.search);
        switch (params.mode) {
            case 'verifyEmail': {
                fbAuth
                    .applyActionCode(params.oobCode)
                    .then(() => {
                        showSuccessToast(intl.formatMessage({id: signedIn ? 'auth.activated' : 'auth.activated.sign-in'}))
                        authContext.set(() => ({activated: true}))
                    })
                    // TODO Catch error can have different error codes
                    .catch(e => showErrorToast(intl.formatMessage({id: 'auth.activated.error'})))
                    .finally(() => history.push('/'));
            }
        }
    }

    useEffect(() => {
        toast.dismiss();
        const sub = fbAuth.onAuthStateChanged(user => {
            handleQuery(!!user)
          })
        return sub();
    }, [])

    return null;
}
