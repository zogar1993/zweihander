import { Ancestry } from "@core/domain/Ancestry"
import { MagicSource } from "@core/domain/MagicSource"
import Menu, { MENU_WIDTH_EXTENDED, MenuItem } from "@web/components/app/Menu"
import fetchResources from "@web/helpers/FetchResources"
import theme from "@web/theme/theme"
import React, { ReactNode, useEffect, useState } from "react"
import styled from "styled-components"

export type MainProps = {
	children: ReactNode
}

export default function Main({ children }: MainProps) {
	const [ancestries, setAncestries] = useState<Array<Ancestry>>([])
	const [magicSources, setMagicSources] = useState<Array<MagicSource>>([])
	const [show, setShow] = useState<boolean>(true)

	useEffect(() => {
		;(async () => {
			const ancestries = await fetchResources<Ancestry>("ancestries")
			setAncestries(ancestries)
		})()
		;(async () => {
			const sources = await fetchResources<MagicSource>("magic-sources")
			setMagicSources(sources)
		})()
	}, [])

	return (
		<React.StrictMode>
			<PageContent>
				<Menu
					logo="/ZweihanderLogo.png"
					menu={screens({ ancestries, magicSources })}
					onShowChange={value => setShow(value)}
				/>
				<Section>
					<SectionContainer show={show}>{children}</SectionContainer>
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

const SectionContainer = styled.div<{ show: boolean }>`
	padding: 8px calc(${theme.spacing.separation} + ${theme.scrollbar.width}) ${theme.spacing.separation} ${theme.spacing.separation};
	width: calc(100vw - ${MENU_WIDTH_EXTENDED});
	margin: 0 auto;

	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: ${theme.spacing.separation};

	@media (max-width: 768px) {
		width: 100%;
	}
`

const screens = ({
	ancestries,
	magicSources
}: {
	ancestries: Array<Ancestry>
	magicSources: Array<MagicSource>
}): Array<MenuItem> => [
	{ path: "characters", name: "Characters", icon: "/menu/child.png" },
	{
		name: "Ancestries",
		icon: "/menu/dwarf.png",
		items: ancestries.map(ancestry => ({
			name: ancestry.name,
			icon: "/menu/dwarf.png",
			path: `ancestries/${ancestry.code}`
		}))
	},
	{
		path: "professions/:profession?",
		name: "Professions",
		icon: "/menu/businessman.png"
	},
	{ path: "talents", name: "Talents", icon: "/menu/talent.png" },
	{
		name: "Magic",
		icon: "/menu/wand.png",
		items: magicSources.map(source => ({
			name: source.name,
			icon: source.icon,
			path: `magic/${source.code}${
				source.schools.length > 1 ? `/${source.schools[0].code}` : ""
			}`
		}))
	},
	{ path: "creatures", name: "Creatures", icon: "/menu/monster.png" }
]
