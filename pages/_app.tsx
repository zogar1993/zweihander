import { UserProvider } from "@auth0/nextjs-auth0"
import Main from "@web/components/app/Main"
import { LeafItem } from "@web/components/app/Menu"
import type { AppProps } from "next/app"
import Head from "next/head"
import "../public/fonts.css"
import "../public/reset.css"

const App = ({
	Component,
	pageProps,
	ancestries,
	magicSources
}: AppProps & {
	ancestries: Array<LeafItem>
	magicSources: Array<LeafItem>
}) => {
	return (
		<UserProvider>
			<Head>
				<CssPreloadLink href="https://fonts.googleapis.com/css?family=Patrick+Hand" />
				<CssPreloadLink href="https://fonts.googleapis.com/css?family=Almendra+SC" />
				<CssPreloadLink href="https://fonts.googleapis.com/css?family=Almendra" />
			</Head>
			<Main ancestries={ancestries} magicSources={magicSources}>
				<Component {...pageProps} />
			</Main>
		</UserProvider>
	)
}

function CssPreloadLink({ href }: { href: string }) {
	return <link rel="preload" href={href} as="font" crossOrigin="" />
}

App.getInitialProps = async ({ctx}: {ctx: any}) => {
	if (!ctx.req) return {ancestries: [], magicSources: []}
	const getAncestries = await import("@core/actions/GetAncestries")
	const getMagicSources = await import("@core/actions/GetMagicSources")
	const ancestries: Array<LeafItem> = (await getAncestries.default()).map(
		x => ({
			name: x.name,
			icon: x.icon,
			path: `ancestries/${x.code}`
		})
	)
	const magicSources: Array<LeafItem> = (await getMagicSources.default()).map(
		x => ({
			name: x.name,
			icon: x.icon,
			path: `magic/${x.code}${x.schools.length > 1 ? `/${x.schools[0].code}` : ""}`
		})
	)
	return { ancestries, magicSources }
}

export default App
