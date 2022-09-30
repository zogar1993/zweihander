import {getSession} from "@auth0/nextjs-auth0"
import {ROLES_PROPERTY_NAME, UserRole} from "@web/components/character_sheet/hooks/UseHasAdminRole"
import {NextApiRequest, NextApiResponse} from "next"

export default async function getUser({req, res}: AccessParams): Promise<AccessResult> {
	const session = await getSession(req, res)

	if (!session) return LOGGED_OUT_DATA

	const roles = session.user[ROLES_PROPERTY_NAME]
	const isAdmin = roles.includes(UserRole.Admin)
	const isUser = roles.includes(UserRole.User) || isAdmin

	return {isAdmin, isUser, isLoggedIn: true, email: session.user.email}
}

const LOGGED_OUT_DATA = {
	isLoggedIn: false,
	isUser: false,
	isAdmin: false,
	email: ""
}

export type AccessParams = {
	req: NextApiRequest,
	res: NextApiResponse
}

export type AccessResult = {
	isLoggedIn: boolean,
	isUser: boolean,
	isAdmin: boolean,
	email: string
}