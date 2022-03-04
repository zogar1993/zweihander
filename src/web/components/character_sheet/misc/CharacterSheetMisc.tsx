import Accordion from "@web/components/Accordion"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import useIsOwner from "@web/components/character_sheet/hooks/useIsOwner"
import CharacterSheetAlignment from "@web/components/character_sheet/misc/CharacterSheetAlignment"
import CharacterSheetDangerZone from "@web/components/character_sheet/misc/CharacterSheetDangerZone"
import CharacterSheetFocuses from "@web/components/character_sheet/misc/CharacterSheetFocuses"
import CharacterSheetJournal from "@web/components/character_sheet/misc/CharacterSheetJournal"
import CharacterSheetSettings from "@web/components/character_sheet/misc/CharacterSheetSettings"
import CharacterSheetSpecialRules from "@web/components/character_sheet/misc/CharacterSheetSpecialRules"
import CharacterSheetSpells from "@web/components/character_sheet/misc/CharacterSheetSpells"
import CharacterSheetStats from "@web/components/character_sheet/misc/CharacterSheetStats"
import CharacterSheetTalents from "@web/components/character_sheet/misc/CharacterSheetTalents"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import styled from "styled-components"

export default function CharacterSheetMisc() {
	const { character } = useCharacterSheetState()
	const isOwner = useIsOwner()

	return (
		<MiscAccordion
			disabled={character.corruption === undefined} //Arbitrary property selection
			items={[
				{
					name: ACCORDION_ITEM.ALIGNMENT,
					content: <CharacterSheetAlignment />
				},
				{
					name: ACCORDION_ITEM.STATS,
					content: <CharacterSheetStats />
				},
				{
					name: ACCORDION_ITEM.TALENTS,
					content: <CharacterSheetTalents />
				},
				{
					name: ACCORDION_ITEM.FOCUSES,
					content: <CharacterSheetFocuses />
				},
				{
					name: ACCORDION_ITEM.SPELLS,
					content: <CharacterSheetSpells />
				},
				{
					name: ACCORDION_ITEM.SPECIAL_RULES,
					content: <CharacterSheetSpecialRules />,
					hide: character.special_rules.length === 0
				},
				{
					name: ACCORDION_ITEM.JOURNAL,
					content: <CharacterSheetJournal />
				},
				{
					name: ACCORDION_ITEM.SETTINGS,
					content: <CharacterSheetSettings />
				},
				{
					name: ACCORDION_ITEM.DANGER_ZONE,
					content: <CharacterSheetDangerZone />,
					hide: !isOwner
				}
			]}
		/>
	)
}

const MiscAccordion = styled(Accordion)`
	grid-area: misc;
`

//TODO P1 hide talents spells and focuses when there are none and you are not owner
