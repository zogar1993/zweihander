import theme from "@web/theme/theme"
import styled, { css } from "styled-components"

//TODO P3 maybe create a card link?

export const Card = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.spacing.separation};
	border: 1px solid lightgray;
	border-radius: ${theme.borders.radius};
	padding: ${theme.spacing.separation} calc(3 * ${theme.spacing.separation});

	${({ onClick }) => (onClick ? CLICKABLE_CSS : "")};
`

const CLICKABLE_CSS = css`
	user-select: none;
	cursor: pointer;
`
