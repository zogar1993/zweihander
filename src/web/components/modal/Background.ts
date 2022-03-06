import styled from "styled-components"

export const Background = styled.div<{ show: boolean }>`
	position: absolute;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	background-color: rgba(10, 10, 10, 0.86);
	opacity: ${({ show }) => (show ? 1 : 0)};
	transition: ${({ show }) => (show ? "ease-out" : "ease-in")} 0.4s;
`
