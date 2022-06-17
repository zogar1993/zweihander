import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import getTalents from "@core/actions/GetTalents"
import TalentsScreen from "@web/components/talents/TalentsScreen"
import React from "react"

export default withPageAuthRequired(TalentsScreen)

export async function getStaticProps() {
	const talents = await getTalents()
	return { props: { talents: talents } }
}
