import styled from 'styled-components'

const Title = styled.h3<Props>`
    font-family: ${({ font }) => font ? `${font}, ` : ''}Times, serif;
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    font-size: ${props => props['font-size'] || '26px'};
    text-align: center;
    color: black;
    text-transform: capitalize;
`
export default Title

type Props = {
  font?: string
  bold?: boolean
  'font-size'?: string
}
