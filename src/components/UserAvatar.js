import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 8px;
  background-color: ${({background}) => background};
  color: white;
  font-weight: 600;
  line-height: 2.4rem;
  text-align: center;
  font-size: 1.2rem;
`;

const uidToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

// TODO profile pic in future
// TODO fix the model, use mongodb user as only prop, backend function should always return joined tables 
const UserAvatar = ({name, uid}) => {
    const nameParts = name.split(' ');
    const initials = `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`
    return (
        <Wrapper background={uidToColor(uid)}>
            {initials}
        </Wrapper>
    )
}

export default UserAvatar
