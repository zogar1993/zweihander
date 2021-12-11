import theme from "@web/theme/theme"
import styled from "styled-components"

const Grid = styled.div<Props>`
	display: grid;
	gap: ${theme.spacing.separation};
	grid-template-columns: repeat(${({ columns }) => columns || "auto-fit"}, 1fr);
	flex-grow: 1;

	@media (max-width: 768px) {
		grid-template-columns: repeat(
			${props => props["mobile-columns"] || props.columns || "auto-fit"},
			1fr
		);
	}
`

export default Grid

interface Props {
	columns?: number
	"mobile-columns"?: number
}
