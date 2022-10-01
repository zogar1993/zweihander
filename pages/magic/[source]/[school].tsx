import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import getMagicSources from "@core/actions/GetMagicSources"
import { MagicSchool } from "@core/domain/types/MagicSchool"
import { MagicSource } from "@core/domain/types/MagicSource"
import { Spell } from "@core/domain/types/Spell"
import getUser from "@core/utils/Authorization"
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
		spells: ReadonlyArray<Spell>
	}) => <MagicScreen source={source} school={school} spells={spells} />
)

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({req, res, params: { source: sourceCode, school: schoolCode }}: any) => {
		const user = await getUser({req, res})

		const sources = await getMagicSources()
		const source = sources.find(x => x.code === sourceCode)

		if (!user.isUser || !source) return {redirect: {permanent: false, destination: "/unauthorized"}}

		const school = source.schools.find(x => x.code === schoolCode)

		if (!school) return {redirect: {permanent: false, destination: "/unauthorized"}}

		const spells = school.spells
		const petty = spells.filter(x => x.principle === "Petty")
		const lesser = spells.filter(x => x.principle === "Lesser")
		const greater = spells.filter(x => x.principle === "Greater")

		const sortedSpells = petty.concat(lesser).concat(greater)

		return { props: { source, school, spells: sortedSpells } }
	}
})