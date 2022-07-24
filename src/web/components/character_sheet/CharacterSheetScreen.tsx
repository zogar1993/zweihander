import CharacterSheetBio from "@web/components/character_sheet/bio/CharacterSheetBio"
import { CharacterSheetAddons } from "@web/components/character_sheet/CharacterSheetAddons"
import CharacterSheetAttributes from "@web/components/character_sheet/CharacterSheetAttributes"
import CharacterSheetConfirmationModal from "@web/components/character_sheet/CharacterSheetConfirmationModal"
import {
	CharacterSheetContextProvider,
	CharacterSheetProps
} from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetMisc from "@web/components/character_sheet/misc/CharacterSheetMisc"
import CharacterSheetProfessionProfile from "@web/components/character_sheet/professions/CharacterSheetProfessionProfile"
import CharacterSheetStatus from "@web/components/character_sheet/status/CharacterSheetStatus"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetScreen(
	props: Partial<CharacterSheetProps>
) {
	return (
		<CharacterSheetContextProvider dependencies={props}>
			<CharacterSheetAddons />
			<CharacterSheetConfirmationModal />
			<Layout>
				<CharacterSheetBio />
				<CharacterSheetAttributes />
				<CharacterSheetStatus />
				<CharacterSheetProfessionProfile />
				<CharacterSheetMisc />
			</Layout>
		</CharacterSheetContextProvider>
	)
}

const Layout = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: ${theme.spacing.separation};
	grid-template-areas:
		"bio attributes attributes status"
		"profession_profile profession_profile profession_profile profession_profile"
		"misc misc misc misc";

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		width: 100%;
		grid-template-areas:
			"bio"
			"attributes"
			"skills"
			"status"
			"profession_profile"
			"misc";
	}
`
