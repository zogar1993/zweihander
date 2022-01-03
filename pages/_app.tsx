import Main from "@web/components/app/Main"
import type { AppProps } from "next/app"
import Head from "next/head"
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
			<Main>
				<Component {...pageProps} />
			</Main>
		</>
	)
}

function CssPreloadLink({ href }: { href: string }) {
	return <link rel="preload" href={href} as="font" crossOrigin="" />
}
