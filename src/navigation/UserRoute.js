import React, {useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../App';

const UserRoute = ({ children, ...rest }) => {
    const context = useContext(AuthContext);

    return (
        <Route
          {...rest}
          render={({ location }) =>
            context.auth ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}

export default UserRoute
