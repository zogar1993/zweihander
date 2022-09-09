import { UserProvider } from "@auth0/nextjs-auth0"
import Main from "@web/components/app/Main"
import { LeafItem } from "@web/components/app/Menu"
import type { AppProps } from "next/app"
import Head from "next/head"
import "../public/reset.css"

const App = ({
	Component,
	pageProps,
	ancestries,
	magicSources
}: AppProps & {
	ancestries: ReadonlyArray<LeafItem>
	magicSources: ReadonlyArray<LeafItem>
}) => {
	return (
		<UserProvider>
			<Main ancestries={ancestries} magicSources={magicSources}>
				<Component {...pageProps} />
			</Main>
		</UserProvider>
	)
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
