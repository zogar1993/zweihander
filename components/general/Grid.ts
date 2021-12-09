import styled from "styled-components"

export const SEPARATION = "4px"
const Grid = styled.div<Props>`
	display: grid;
	gap: ${SEPARATION};
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
