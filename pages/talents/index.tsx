import {withPageAuthRequired} from "@auth0/nextjs-auth0"
import getTalents from "@core/actions/GetTalents"
import getUser from "@core/utils/Authorization"
import TalentsScreen from "@web/components/talents/TalentsScreen"
import React from "react"

export default TalentsScreen

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({req, res}: any) => {
		const user = await getUser({req, res})
		if (!user.isUser) return {redirect: {permanent: false, destination: "/unauthorized"}}
		const talents = await getTalents()
		return {props: {talents: talents}}
	}
})
