import React, { Component } from 'react'
import http from '../../utils/http';
import { EditInfo } from './EditInfo';
import { MyPostsContext } from '../../App';
import styled from 'styled-components';
import Posts from '../feed/Posts';
import { LimitedWidthContainer } from '../../styles/utils';
import { LanguageSelect } from '../../intl/LanguageSelect';
import { Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const ProfileWrapper = styled.div`
  max-width: 25rem;
  margin: 3rem auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled(LimitedWidthContainer)`
    
`

const MyPostsContainer = styled.div`
    display: grid;
    grid-row-gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: min-content;
`

const StyledLanguageSelect = styled(LanguageSelect)`
    margin: 2rem auto;
`
 

class Profile extends Component {
    state = {
        user: null,
    }

    async componentDidMount() {
        const user = await http('getSelf', 'GET', null, null, true);

        this.setState({user})
    }

    render() {
        const {user} = this.state;
        const { intl } = this.props;

        const panes = [
            {
                menuItem: intl.formatMessage({id: 'profile.basic'}),
                render: () => <Tab.Pane attached={false}>
                    {!user && <div>Loading...</div>}
                    {user && 
                        <ProfileWrapper>
                            <EditInfo user={user} />
                            <StyledLanguageSelect />
                        </ProfileWrapper>
                    }
                </Tab.Pane>
            },
            {
                menuItem: intl.formatMessage({id: 'profile.my-posts'}),
                render: () => <Tab.Pane attached={false}>
                    <MyPostsContext.Consumer>
                        {value => <MyPostsContainer>
                            <Posts posts={value.posts} />
                        </MyPostsContainer>}
                    </MyPostsContext.Consumer>
                </Tab.Pane>,
            },
        ] 
        
        return (
            <ProfileContainer>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </ProfileContainer>
        )
    }
}

export default injectIntl(Profile);