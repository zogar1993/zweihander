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

App.getInitialProps = async ({ ctx }: { ctx: any }) => {
	if (ctx.req) {
		const { default: getSubmenus } = await import("@core/actions/GetSubmenus")
		return await getSubmenus()
	} else {
		const result = await fetch(`/api/submenus`, { method: "GET" })
		return result.json()
	}
}

export default App
