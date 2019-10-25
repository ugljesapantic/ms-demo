import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 8px;
  background-color: #313163;
  color: white;
  font-weight: 600;
  line-height: 20px;
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
