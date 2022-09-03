import { Peril } from "@core/domain/character_sheet/CharacterSheet"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import useSetCharacterDamageCondition from "@web/components/character_sheet/hooks/update/useSetCharacterDamageCondition"
import useSetCharacterPerilCondition from "@web/components/character_sheet/hooks/update/useSetCharacterPerilCondition"
import CharacterSheetConditionTracker from "@web/components/character_sheet/status/CharacterSheetConditionTracker"
import CharacterSheetCorruption from "@web/components/character_sheet/status/CharacterSheetCorruption"
import CharacterSheetStats from "@web/components/character_sheet/status/CharacterSheetStats"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetStatus() {
	const { character } = useCharacterSheetState()
	const setPerilCondition = useSetCharacterPerilCondition()
	const setDamageCondition = useSetCharacterDamageCondition()
	return (
		<StatusContainer>
			<CharacterSheetStats />
			<CharacterSheetCorruption />
			<CharacterSheetConditionTracker
				conditions={PERIL_CONDITIONS}
				condition={character.peril}
				type="Peril"
				onChange={setPerilCondition}
			/>
			<CharacterSheetConditionTracker
				conditions={DAMAGE_CONDITIONS}
				condition={character.damage}
				type="Damage"
				onChange={setDamageCondition}
			/>
		</StatusContainer>
	)
}

const StatusContainer = styled.div`
	grid-area: status;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

export const PERIL_CONDITIONS = [
	{ code: Peril.Unhindered, name: "UNHINDERED" },
	{ code: Peril.Imperiled, name: "Imperiled" },
	{ code: Peril.Ignore1SkillRank, name: "Ignore 1 Skill Rank" },
	{ code: Peril.Ignore2SkillRank, name: "Ignore 2 Skill Ranks" },
	{ code: Peril.Ignore3SkillRank, name: "Ignore 3 Skill Ranks" },
	{ code: Peril.Incapacitated, name: "INCAPACITATED!" }
]

export const DAMAGE_CONDITIONS = [
	{ code: 0, name: "UNHARMED" },
	{ code: 1, name: "Lightly Wounded" },
	{ code: 2, name: "Moderately Wounded" },
	{ code: 3, name: "Seriously Wounded" },
	{ code: 4, name: "Grievously Wounded" },
	{ code: 5, name: "SLAIN!" }
]
