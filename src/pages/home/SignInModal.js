import React from 'react'
import { Modal, Button } from 'semantic-ui-react';

const SignInModal = () => {
    return (
        <Modal trigger={<Button basic>Sign in</Button>}>
            <Modal.Header>Sign in</Modal.Header>
            <Modal.Content>
            </Modal.Content>
        </Modal>
    )
}

export default SignInModal
