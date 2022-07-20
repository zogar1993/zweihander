import { useUser } from "@auth0/nextjs-auth0"

export default function useIsAdminUser() {
	const { user } = useUser()
	const roles = (user?.[ROLES_PROPERTY_NAME] as Array<string>) || []
	return roles.includes(UserRole.Admin)
}

export const ROLES_PROPERTY_NAME = `${process.env.NEXT_PUBLIC_WEB_DOMAIN}/roles`

export enum UserRole {
	User = "User",
	Admin = "Admin"
}
