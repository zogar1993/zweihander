import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import getProfessions from "@core/actions/GetProfessions"
import ProfessionsScreen from "@web/components/professions/ProfessionsScreen"
import React from "react"

export default withPageAuthRequired(ProfessionsScreen)

export async function getStaticProps() {
	const professions = await getProfessions()
	return { props: { professions } }
}
