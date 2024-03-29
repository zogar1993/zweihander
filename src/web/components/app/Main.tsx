import { useUser } from "@auth0/nextjs-auth0"
import Menu, { LeafItem, MENU_WIDTH_EXTENDED, MenuItem } from "@web/components/app/Menu"
import { LoadingModal } from "@web/components/redirect_loaders/LoadingModalContext"
import theme from "@web/theme/theme"
import React, { useState } from "react"
import styled from "styled-components"

export type MainProps = {
	children: JSX.Element
	ancestries: ReadonlyArray<LeafItem>
	magicSources: ReadonlyArray<LeafItem>
}

export default function Main({
	children,
	ancestries,
	magicSources
}: MainProps) {
	const [show, setShow] = useState<boolean>(true)
	const user = useUser().user

	return (
		<React.StrictMode>
			<PageContent>
				<Menu
					logo="/ZweihanderLogo.png"
					menu={screens({ ancestries, magicSources, user })}
					onShowChange={value => setShow(value)}
				/>
				<Section>
					<SectionContainer show={show}>
						<LoadingModal>{children}</LoadingModal>
					</SectionContainer>
				</Section>
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
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
`

export const BLOCK_WIDTH = "276px"
export const DESKTOP_MAX_WIDTH = `calc((${BLOCK_WIDTH} * 4) + (${theme.spacing.separation} * 3))`

const SectionContainer = styled.div<{ show: boolean }>`
	padding: 8px calc(${theme.spacing.separation} + ${theme.scrollbar.width})
		${theme.spacing.separation} ${theme.spacing.separation};
	width: calc(100vw - ${MENU_WIDTH_EXTENDED});
	margin: 0 auto;
	align-items: center;
	gap: ${theme.spacing.separation};

	display: grid;
	justify-items: stretch;
	justify-content: center;
	grid-template-columns: minmax(auto, ${DESKTOP_MAX_WIDTH});

	@media (max-width: 768px) {
		width: 100%;
	}
`

const screens = ({
	ancestries,
	magicSources,
	user
}: {
	ancestries: ReadonlyArray<LeafItem>
	magicSources: ReadonlyArray<LeafItem>
	user: object | undefined
}): ReadonlyArray<MenuItem> => [
	{ path: "characters", name: "Characters", icon: "/menu/child.png" },
	{
		name: "Ancestries",
		icon: "/menu/family-tree.png",
		items: ancestries
	},
	{
		path: "professions",
		name: "Professions",
		icon: "/menu/businessman.png"
	},
	{ path: "talents", name: "Talents", icon: "/menu/talent.png" },
	{
		name: "Magic",
		icon: "/menu/wand.png",
		items: magicSources
	},
	//{ path: "creatures", name: "Creatures", icon: "/menu/monster.png" },
	...(user
		? [{ path: "api/auth/logout", name: "Log Out", icon: "/menu/logout.png" }]
		: [])
]
