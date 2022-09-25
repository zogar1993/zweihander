import {UserProvider} from "@auth0/nextjs-auth0"
import Main from "@web/components/app/Main"
import {LeafItem} from "@web/components/app/Menu"
import type {AppProps} from "next/app"
import "../public/reset.css"
import Script from "next/script"

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
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>
			<Script strategy="lazyOnload" id="google-analytics-script">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
					page_path: window.location.pathname,
					});
				`}
			</Script>
			<Main ancestries={ancestries} magicSources={magicSources}>
				<Component {...pageProps} />
			</Main>
		</UserProvider>
	)
}

App.getInitialProps = async ({ctx}: { ctx: any }) => {
	if (ctx.req) {
		const {default: getSubmenus} = await import("@core/actions/GetSubmenus")
		return await getSubmenus()
	} else {
		const result = await fetch(`/api/submenus`, {method: "GET"})
		return result.json()
	}
}

export default App
