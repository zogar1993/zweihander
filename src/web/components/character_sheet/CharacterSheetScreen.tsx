import CharacterSheetBio from "@web/components/character_sheet/bio/CharacterSheetBio"
import { CharacterSheetAddons } from "@web/components/character_sheet/CharacterSheetAddons"
import CharacterSheetAttributes from "@web/components/character_sheet/CharacterSheetAttributes"
import CharacterSheetConfirmationModal from "@web/components/character_sheet/CharacterSheetConfirmationModal"
import {
	CharacterSheetContextProvider,
	CharacterSheetProps
} from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetStatus from "@web/components/character_sheet/CharacterSheetStatus"
import CharacterSheetMisc from "@web/components/character_sheet/misc/CharacterSheetMisc"
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
				<CharacterSheetMisc />
				<CharacterSheetStatus />
			</Layout>
		</CharacterSheetContextProvider>
	)
}

export const BLOCK_WIDTH = "276px"
export const DESKTOP_MAX_WIDTH = `calc((${BLOCK_WIDTH} * 4) + (${theme.spacing.separation} * 3))`

const Layout = styled.div`
	display: grid;
	width: ${DESKTOP_MAX_WIDTH};
	grid-template-columns: repeat(4, 1fr);
	gap: ${theme.spacing.separation};
	grid-template-areas:
		"bio attributes attributes wea"
		"misc misc misc misc";

	@media (max-width: 768px) {
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: none;
		width: 100%;
		grid-template-areas:
			"bio"
			"attributes"
			"skills"
			"misc";
		max-height: none;
	}
`
