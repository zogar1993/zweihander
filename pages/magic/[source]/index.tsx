import { getMagicSources } from "@core/actions/GetMagicSources"
import {
	MagicSourceScreenProps,
	SourceContainer,
	Title
} from "@web/components/magic/MagicSourceScreen"
import SpellCards from "@web/components/magic/SpellCards"
import React from "react"

export default function ({ source, school }: MagicSourceScreenProps) {
	return (
		<SourceContainer>
			<Title>{source.name}</Title>
			<SpellCards spells={school.spells} />
		</SourceContainer>
	)
}

export async function getStaticProps({ params: { source: sourceCode } }: any) {
	const sources = await getMagicSources()
	const source = sources.find(x => x.code === sourceCode)!
	return { props: { source, school: source.schools[0] } }
}

export async function getStaticPaths() {
	const sources = await getMagicSources()
	const paths = sources.map(source => ({ params: { source: source.code } }))
	return { paths, fallback: false }
}
