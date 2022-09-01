import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import getMagicSources from "@core/actions/GetMagicSources"
import { MagicSchool } from "@core/domain/types/MagicSchool"
import { MagicSource } from "@core/domain/types/MagicSource"
import { PageTitle } from "@web/components/general/PageTitle"
import SpellCards from "@web/components/magic/SpellCards"
import React from "react"

export default withPageAuthRequired(
	({ source, school }: { source: MagicSource; school: MagicSchool }) => {
		return (
			<>
				<PageTitle>{source.name}</PageTitle>
				<SpellCards spells={school.spells} />
			</>
		)
	}
)

export async function getStaticProps({ params: { source: sourceCode } }: any) {
	const sources = await getMagicSources()
	const source = sources.find(x => x.code === sourceCode)!
	return { props: { source, school: source.schools[0] } }
}

export async function getStaticPaths() {
	const sources = await getMagicSources()
	const paths = sources
		.filter(source => source.schools.length === 1)
		.map(source => ({ params: { source: source.code } }))
	return { paths, fallback: false }
}
