import { Ancestry } from "@core/domain/Ancestry"
import { MagicSource } from "@core/domain/MagicSource"
import Main from "@web/components/app/Main"
import { MenuItem } from "@web/components/app/Menu"
import fetchResources from "@web/helpers/FetchResources"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ReactNode, useEffect, useState } from "react"
import "../public/fonts.css"
import "../public/reset.css"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<CssPreloadLink href="https://fonts.googleapis.com/css?family=Patrick+Hand" />
				<CssPreloadLink href="https://fonts.googleapis.com/css?family=Almendra+SC" />
				<CssPreloadLink href="https://fonts.googleapis.com/css?family=Almendra" />
			</Head>
			<Menu>
				<Component {...pageProps} />
			</Menu>
		</>
	)
}

function Menu({ children }: { children: ReactNode }) {
	const [ancestries, setAncestries] = useState<Array<Ancestry>>([])
	const [magicSources, setMagicSources] = useState<Array<MagicSource>>([])

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
		<Main
			logo="/ZweihanderLogo.png"
			screens={screens({ ancestries, magicSources })}
		>
			{children}
		</Main>
	)
}

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

function CssPreloadLink({ href }: { href: string }) {
	return <link rel="preload" href={href} as="font" crossOrigin="" />
}
