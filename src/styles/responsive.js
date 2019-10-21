import { css } from 'styled-components'
import { deviceSizes } from '../utils/consts';

export default Object.keys(deviceSizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media (min-width: ${deviceSizes[label]}px) {
         ${css(...args)};
      }
   `
   return acc
}, {})