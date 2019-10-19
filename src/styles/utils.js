import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';

export const LimitedWidthContainer = styled.div`
  max-width: 1240px;
  padding: 0 16px;
`

export const LimitedWidthModal = styled(Modal)`
  max-width: 450px;
`