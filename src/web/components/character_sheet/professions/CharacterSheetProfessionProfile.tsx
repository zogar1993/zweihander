import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetTier from "@web/components/character_sheet/professions/CharacterSheetTier"
import UniqueAdvances from "@web/components/character_sheet/professions/UniqueAdvances"
import theme from "@web/theme/theme"
import { CheckComboBox } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetProfessionProfile() {
	const { character: { profession_profile, profession1, profession2, profession3 } } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()

	return (
		<Container>
			<CharacterSheetTier name="Basic" tier={profession_profile.professions[0]} profession={
				<CheckComboBox {...profession1} value={profession1.code}
											 onChange={code => dispatch({ type: ActionType.SetProfession1, payload: code })} />
			} />
			<CharacterSheetTier
				name="Intermediate"
				tier={profession_profile.professions[1]}
				profession={
					<CheckComboBox {...profession2} value={profession2.code}
												 onChange={code => dispatch({ type: ActionType.SetProfession2, payload: code })} />
				}
			/>
			<CharacterSheetTier
				name="Advanced"
				tier={profession_profile.professions[2]}
				profession={
					<CheckComboBox {...profession3} value={profession3.code}
												 onChange={code => dispatch({ type: ActionType.SetProfession3, payload: code })} />
				}
			/>
			<UniqueAdvances />
		</Container>
	)
}

const Container = styled.div`
  grid-area: profession_profile;
  display: grid;
  gap: ${theme.spacing.separation};
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
    grid-template-areas:
			"bio"
			"attributes"
			"skills"
			"status"
			"profession_profile"
			"misc";
    max-height: none;
  }
`
