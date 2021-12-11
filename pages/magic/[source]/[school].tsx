import { getMagicSources } from "@core/actions/GetMagicSources"
import {
	MagicSourceScreenProps,
	SourceContainer,
	Title
} from "@web/components/magic/MagicSourceScreen"
import SpellCards from "@web/components/magic/SpellCards"
import React from "react"

export default function MagicSourceWithManySchoolsScreen({
	source,
	school
}: MagicSourceScreenProps) {
	return (
		<SourceContainer>
			<Title>{source.name}</Title>
			<SpellCards spells={school.spells} />
		</SourceContainer>
	)
}

export async function getStaticProps({
	params: { source: sourceCode, school: schoolCode }
}: any) {
	const sources = await getMagicSources()
	const source = sources.find(x => x.code === sourceCode)!
	const school = source.schools.find(x => x.code === schoolCode)!
	return { props: { source, school } }
}

export async function getStaticPaths() {
	const sources = (await getMagicSources()).filter(x => x.schools.length > 1)
	const pairs = sources.flatMap(source =>
		source.schools.map(school => ({ source: source.code, school: school.code }))
	)
	const paths = pairs.map(pair => ({ params: pair }))

	return { paths, fallback: false }
}
