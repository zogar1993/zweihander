import NoStyleButton from "@web/components/unstyled/NoStyleButton"
import theme from "@web/theme/theme"
import styled from "styled-components"

const Button = styled(NoStyleButton)`
	border-radius: ${theme.borders.radius};
	padding: ${theme.spacing.separation};
	border: solid 1px ${theme.colors.border};
`

export default Button
