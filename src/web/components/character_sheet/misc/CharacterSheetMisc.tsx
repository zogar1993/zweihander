import Accordion from "@web/components/Accordion"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import useIsAdminUser from "@web/components/character_sheet/hooks/useIsAdminUser"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/useIsCharacterSheetOwner"
import CharacterSheetDangerZone from "@web/components/character_sheet/misc/CharacterSheetDangerZone"
import CharacterSheetFocuses from "@web/components/character_sheet/misc/CharacterSheetFocuses"
import CharacterSheetJournal from "@web/components/character_sheet/misc/CharacterSheetJournal"
import CharacterSheetSettings from "@web/components/character_sheet/misc/CharacterSheetSettings"
import CharacterSheetSpecialRules from "@web/components/character_sheet/misc/CharacterSheetSpecialRules"
import CharacterSheetSpells from "@web/components/character_sheet/misc/CharacterSheetSpells"
import CharacterSheetTalents from "@web/components/character_sheet/misc/CharacterSheetTalents"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import styled from "styled-components"

export default function CharacterSheetMisc() {
	const { character } = useCharacterSheetState()
	const isOwner = useIsCharacterSheetOwner()
	const isAdmin = useIsAdminUser()

	return (
		<MiscAccordion
			disabled={character.corruption === undefined} //Arbitrary property selection
			items={[
				{
					name: ACCORDION_ITEM.TALENTS,
					content: <CharacterSheetTalents />,
					hide: !isOwner && character.talents.length === 0
				},
				{
					name: ACCORDION_ITEM.FOCUSES,
					content: <CharacterSheetFocuses />,
					hide: !isOwner && character.focuses.length === 0
				},
				{
					name: ACCORDION_ITEM.SPELLS,
					content: <CharacterSheetSpells />,
					hide: !isOwner && character.schools.length === 0
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
					hide: !isOwner && !isAdmin
				}
			]}
		/>
	)
}

const MiscAccordion = styled(Accordion)`
	grid-area: misc;
`
