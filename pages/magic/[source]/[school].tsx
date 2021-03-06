import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import getMagicSources from "@core/actions/GetMagicSources"
import { MagicSchool } from "@core/domain/MagicSchool"
import { MagicSource } from "@core/domain/MagicSource"
import { Spell } from "@core/domain/Spell"
import MagicScreen from "@web/components/magic/MagicScreen"
import React from "react"

export default withPageAuthRequired(
	({
		source,
		school,
		spells
	}: {
		source: MagicSource
		school: MagicSchool
		spells: Array<Spell>
	}) => <MagicScreen source={source} school={school} spells={spells} />
)

export async function getStaticProps({
																			 params: { source: sourceCode, school: schoolCode }
																		 }: any) {
	const sources = await getMagicSources()
	const source = sources.find(x => x.code === sourceCode)!
	const school = source.schools.find(x => x.code === schoolCode)!
	const spells = school.spells
	const petty = spells.filter(x => x.principle === "Petty")
	const lesser = spells.filter(x => x.principle === "Lesser")
	const greater = spells.filter(x => x.principle === "Greater")
	const sortedSpells = petty.concat(lesser).concat(greater)
	return { props: { source, school, spells: sortedSpells } }
}

export async function getStaticPaths() {
	const sources = (await getMagicSources()).filter(x => x.schools.length > 1)
	const pairs = sources.flatMap(source =>
		source.schools.map(school => ({ source: source.code, school: school.code }))
	)
	const paths = pairs.map(pair => ({ params: pair }))

	return { paths, fallback: false }
}
