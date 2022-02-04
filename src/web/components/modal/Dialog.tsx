import { Z_INDEX_LEVEL } from "@web/constants/ACCORDION_ITEM"
import styled from "styled-components"

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

	z-index: ${Z_INDEX_LEVEL.MODAL};

	${({ active }) => (active ? "" : "pointer-events: none")};

	@media (max-width: 768px) {
		justify-content: flex-start;
		align-items: flex-start;
	}
`
export default Dialog
