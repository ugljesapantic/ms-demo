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
import { Loading } from '../../components/Loading';

const ProfileWrapper = styled.div`
  max-width: 25rem;
  margin: 3rem auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled(LimitedWidthContainer)`
    padding-top: 2rem;
`

const MyPostsContainer = styled.div`
    display: grid;
    grid-row-gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: min-content;
    max-height: 80vh;
    overflow: auto;
`

const StyledLanguageSelect = styled(LanguageSelect)`
    margin: 2rem auto;
`
 
const StyledTabPane = styled(Tab.Pane)`
    &&& {
        display: flex;
        flex-direction: column;
        min-height: 5rem;
    }
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
                menuItem: intl.formatMessage({id: 'profile.my-posts'}),
                render: () => <StyledTabPane attached={false}>
                    <MyPostsContext.Consumer>
                        {value => <MyPostsContainer>
                            <Posts posts={value.posts} />
                        </MyPostsContainer>}
                    </MyPostsContext.Consumer>
                </StyledTabPane>,
            },
            {
                menuItem: intl.formatMessage({id: 'profile.basic'}),
                render: () => <StyledTabPane attached={false}>
                    {!user && <Loading />}
                    {user && 
                        <ProfileWrapper>
                            <EditInfo user={user} />
                            <StyledLanguageSelect />
                        </ProfileWrapper>
                    }
                </StyledTabPane>
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