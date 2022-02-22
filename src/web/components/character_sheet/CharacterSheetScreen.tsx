import CharacterSheetBio from "@web/components/character_sheet/bio/CharacterSheetBio"
import CharacterSheetAttributes from "@web/components/character_sheet/CharacterSheetAttributes"
import CharacterSheetConfirmationModal from "@web/components/character_sheet/CharacterSheetConfirmationModal"
import {
	ActionType,
	CharacterSheetContext,
	CharacterSheetProps,
	useCharacterSheetReducer
} from "@web/components/character_sheet/CharacterSheetContext"
import useCtrlZ from "@web/components/character_sheet/hooks/useCtrlZ"
import useInitializeCharacterSheetReducer from "@web/components/character_sheet/hooks/useInitializeCharacterSheetReducer"
import CharacterSheetMisc from "@web/components/character_sheet/misc/CharacterSheetMisc"
import CharacterSheetSkills from "@web/components/character_sheet/skills/CharacterSheetSkills"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetScreen(
	props: Partial<CharacterSheetProps>
) {
	const [state, dispatch] = useCharacterSheetReducer()
	useInitializeCharacterSheetReducer(props, dispatch)

	useCtrlZ(() => dispatch({ type: ActionType.UndoLastAction }))

	return (
		<CharacterSheetContext.Provider value={{ state, dispatch }}>
			<CharacterSheetConfirmationModal />
			<Layout>
				<CharacterSheetBio />
				<CharacterSheetAttributes />
				<CharacterSheetSkills />
				<CharacterSheetMisc />
			</Layout>
		</CharacterSheetContext.Provider>
	)
}
export const BLOCK_WIDTH = "276px"
export const DESKTOP_MAX_WIDTH = `calc((${BLOCK_WIDTH} * 4) + (${theme.spacing.separation} * 3))`

const Layout = styled.div`
	display: grid;
	width: ${DESKTOP_MAX_WIDTH};
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 87px 395px;
	max-height: 486px;
	gap: ${theme.spacing.separation};
	grid-template-areas:
		"bio attributes attributes attributes"
		"bio skills skills misc";

	@media (max-width: 768px) {
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: none;
		width: 100%;
		grid-template-areas:
			"bio"
			"peril-tracker"
			"damage-tracker"
			"attributes"
			"skills"
			"misc";
		max-height: none;
	}
`
