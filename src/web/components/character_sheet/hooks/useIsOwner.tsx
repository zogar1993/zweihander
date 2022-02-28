import { useUser } from "@auth0/nextjs-auth0"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"

export default function useIsOwner() {
	const { character } = useCharacterSheetState()
	const user = useUser()
	return user.user?.nickname === character.created_by
}
