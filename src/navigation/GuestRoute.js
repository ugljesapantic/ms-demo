import React, {useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../App';

const GuestRoute = ({ children, ...rest }) => {
    const context = useContext(AuthContext);

    return (
        <Route
          {...rest}
          render={({ location }) =>
            !context.auth ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/feed",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}

export default GuestRoute
