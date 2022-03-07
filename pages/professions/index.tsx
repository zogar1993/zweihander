import getProfessions from "@core/actions/GetProfessions"
import { Profession } from "@core/domain/Profession"
import ProfessionCards from "@web/components/professions/ProfessionCards"
import React from "react"

export default function ProfessionsScreen({
	professions
}: {
	professions: Array<Profession>
}) {
	return <ProfessionCards professions={professions} />
}

export async function getStaticProps() {
	const professions = await getProfessions()
	return { props: { professions } }
}
