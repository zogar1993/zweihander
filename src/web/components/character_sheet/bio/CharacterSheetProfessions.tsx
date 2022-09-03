import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import useSetCharacterArchetype from "@web/components/character_sheet/hooks/update/useSetCharacterArchetype"
import useSetCharacterProfession1 from "@web/components/character_sheet/hooks/update/useSetCharacterProfession1"
import useSetCharacterProfession2 from "@web/components/character_sheet/hooks/update/useSetCharacterProfession2"
import useSetCharacterProfession3 from "@web/components/character_sheet/hooks/update/useSetCharacterProfession3"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetProfessions() {
	const {
		character: {
			archetype,
			profession_profile: { professions: [{ profession: profession1 }, { profession: profession2 }, { profession: profession3 }] }
		}
	} = useCharacterSheetState()
	const setArchetype = useSetCharacterArchetype()
	const setProfession1 = useSetCharacterProfession1()
	const setProfession2 = useSetCharacterProfession2()
	const setProfession3 = useSetCharacterProfession3()
	const isOwner = useIsCharacterSheetOwner()

	return (
		<Container>
			<Field
				type="combobox"
				label="Archetype"
				value={archetype.code}
				options={archetype.options}
				disabled={archetype.disabled || !isOwner}
				onChange={setArchetype}
			/>
			<Field
				type="combobox"
				label="Profession 1"
				value={profession1.code}
				options={profession1.options}
				disabled={profession1.disabled || !isOwner}
				onChange={setProfession1}
			/>
			<Field
				type="combobox"
				label="Profession 2"
				value={profession2.code}
				options={profession2.options}
				disabled={profession2.disabled || !isOwner}
				onChange={setProfession2}
			/>
			<Field
				type="combobox"
				label="Profession 3"
				value={profession3.code}
				options={profession3.options}
				disabled={profession3.disabled || !isOwner}
				onChange={setProfession3}
			/>
		</Container>
	)
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.separation};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
