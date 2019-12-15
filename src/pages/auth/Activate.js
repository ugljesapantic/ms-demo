import React, { useEffect, useContext, useState } from 'react'
import { fbAuth, AuthContext } from '../../App';
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string';
import { showSuccessToast, showErrorToast } from '../../utils/misc';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import ResetPasswordModal from './ResetPassword';

export const Activate = () => {
    const location = useLocation();
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const intl = useIntl();
    const [reset, setReset] = useState(false);

    useEffect(() => {
        toast.dismiss();
        const sub = fbAuth.onAuthStateChanged(user => {
            const signedIn = !!user;
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
                        .catch(e => showErrorToast(intl.formatMessage({id: 'auth.invalid-code'})))
                        .finally(() => history.push('/'));
                    break;
                }
                case 'resetPassword': {
                    setReset(params.oobCode);
                    break;
                }
                default: {
                    
                }
            }
          })
        return sub();
    }, [authContext, history, intl, location.search])

    return <div>
        {reset && <ResetPasswordModal code={reset} />}
    </div>;
}
