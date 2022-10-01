import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import getProfessions from "@core/actions/GetProfessions"
import getUser from "@core/utils/Authorization"
import ProfessionsScreen from "@web/components/professions/ProfessionsScreen"
import React from "react"

export default ProfessionsScreen

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({req, res}: any) => {
		const user = await getUser({req, res})
		if (!user.isUser) return {redirect: {permanent: false, destination: "/unauthorized"}}
		const professions = await getProfessions()
		return { props: { professions } }
	}
})
