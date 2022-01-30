import styled from 'styled-components'

const Dialog = styled.dialog<{ active: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: transparent;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 200;

  ${({ active }) => active ? '' : 'pointer-events: none'};

  @media (max-width: 768px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
`
export default Dialog
