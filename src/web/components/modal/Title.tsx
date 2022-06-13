import theme from "@web/theme/theme"
import styled from "styled-components"

const Title = styled.h3<Props>`
	font-family: ${theme.fonts.title};
	font-size: 26px;
	text-align: center;
	color: black;
	text-transform: capitalize;
`
export default Title

type Props = {
	"font-size"?: string
}
