import {withPageAuthRequired} from "@auth0/nextjs-auth0"
import getUser from "@core/utils/Authorization"
import WeaponsScreen from "@web/components/weapons/WeaponsScreen"
import getWeapons from "@core/actions/GetWeapons"

export default WeaponsScreen

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({req, res}: any) => {
		const user = await getUser({req, res})
		if (!user.isUser) return {redirect: {permanent: false, destination: "/unauthorized"}}
		const weapons = await getWeapons()
		return {props: {weapons: weapons}}
	}
})