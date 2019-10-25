import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.primary};
  color: white;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  font-size: 12px;
`;

// TODO profile pic in future
const UserAvatar = ({name}) => {
    const nameParts = name.split(' ');
    const initials = `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`
    return (
        <Wrapper >
            {initials}
        </Wrapper>
    )
}

export default UserAvatar
