import { useUser } from "@auth0/nextjs-auth0"
import { Ancestry } from "@core/domain/Ancestry"
import { MagicSource } from "@core/domain/MagicSource"
import Menu, { MENU_WIDTH_EXTENDED, MenuItem } from "@web/components/app/Menu"
import { LoadingModal } from "@web/components/redirect_loaders/LoadingModalContext"
import RedirectLoaderCharactersScreen from "@web/components/redirect_loaders/RedirectLoaderCharactersScreen"
import useCollection from "@web/hooks/UseCollection"
import theme from "@web/theme/theme"
import React, { useState } from "react"
import styled from "styled-components"

export type MainProps = {
	children: JSX.Element
}

export default function Main({ children }: MainProps) {
	const [show, setShow] = useState<boolean>(true)
	const user = useUser().user

	const ancestries = useCollection<Ancestry>("ancestries")
	const magicSources = useCollection<MagicSource>("magic-sources")

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
						<LoadingModal>
							<RedirectLoaderCharactersScreen>
								{children}
							</RedirectLoaderCharactersScreen>
						</LoadingModal>
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

const SectionContainer = styled.div<{ show: boolean }>`
	padding: 8px calc(${theme.spacing.separation} + ${theme.scrollbar.width})
		${theme.spacing.separation} ${theme.spacing.separation};
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
	magicSources,
	user
}: {
	ancestries: Array<Ancestry>
	magicSources: Array<MagicSource>
	user: any
}): Array<MenuItem> => [
	{ path: "characters", name: "Characters", icon: "/menu/child.png" },
	{
		name: "Ancestries",
		icon: "/menu/family-tree.png",
		items: ancestries.map(ancestry => ({
			name: ancestry.name,
			icon: ancestry.icon,
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
	{ path: "creatures", name: "Creatures", icon: "/menu/monster.png" },
	...(user
		? [{ path: "api/auth/logout", name: "Log Out", icon: "/menu/logout.png" }]
		: [])
]
