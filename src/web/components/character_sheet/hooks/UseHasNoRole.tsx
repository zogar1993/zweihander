import { useUser } from "@auth0/nextjs-auth0"

export default function useHasNoRole() {
	const { user } = useUser()
	if (!user) return true
	const roles = user[ROLES_PROPERTY_NAME]
	if (!roles) return true
	return (roles as Array<string>).length === 0
}

export const ROLES_PROPERTY_NAME = `${process.env.NEXT_PUBLIC_WEB_DOMAIN}/roles`
