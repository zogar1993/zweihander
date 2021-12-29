import Menu, { MENU_WIDTH_EXTENDED, MenuItem } from "@web/components/app/Menu"
import theme from "@web/theme/theme"
import React, { ReactNode } from "react"
import styled from "styled-components"

export type MainProps = {
	logo: any
	screens: Array<MenuItem>
	children: ReactNode
}

export default function Main({ screens, children, ...props }: MainProps) {
	return (
		<React.StrictMode>
			<PageContent>
				<Menu {...props} menu={screens} />
				<Section>{children}</Section>
			</PageContent>
		</React.StrictMode>
	)
}

const PageContent = styled.div`
	display: flex;
	width: 100%;
	height: 100%;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`

const Section = styled.section`
	height: 100vh;
	width: calc(100% - ${MENU_WIDTH_EXTENDED});
	margin: 0 auto;

	padding: 8px 4px 4px;

	overflow-y: auto;

	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: ${theme.spacing.separation};
`
