import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import getMagicSources from "@core/actions/GetMagicSources"
import { MagicSchool } from "@core/domain/types/MagicSchool"
import { MagicSource } from "@core/domain/types/MagicSource"
import getUser from "@core/utils/Authorization"
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

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({req, res, params: { source: sourceCode }}: any) => {
		const user = await getUser({req, res})

		const sources = await getMagicSources()
		const source = sources.find(x => x.code === sourceCode)

		if (!user.isUser || !source) return {redirect: {permanent: false, destination: "/unauthorized"}}

		return { props: { source, school: source.schools[0] } }
	}
})
