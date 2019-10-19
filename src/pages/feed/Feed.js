import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import { signOut } from '../../services/auth';

export default class Feed extends Component {
    render() {
        return (
            <div>
                <Button onClick={signOut} > Sign out </Button>
            </div>
        )
    }
}
