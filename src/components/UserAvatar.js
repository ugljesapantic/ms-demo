import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 8px;
  background-color: ${({background}) => background};
  color: white;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  font-size: 12px;
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
