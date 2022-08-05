import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { AncestryTech, MagicSchoolTech, ProfessionTech, TalentTech } from "@core/domain/character_sheet/CharacterSheet"
import { Alignment } from "@core/domain/types/Alignment"
import { Archetype } from "@core/actions/GetArchetypes"
import CharacterSheetScreen from "@web/components/character_sheet/CharacterSheetScreen"
import useCharacterSheet from "@web/components/character_sheet/hooks/useCharacterSheet"
import useCollectionImmutable from "@web/hooks/UseCollectionImmutable"
import { useRouter } from "next/router"
import React from "react"

export default withPageAuthRequired(() => {
	const router = useRouter()
	const ancestries = useCollectionImmutable<AncestryTech>("tech/ancestries")
	const talents = useCollectionImmutable<TalentTech>("tech/talents")
	const professions = useCollectionImmutable<ProfessionTech>("tech/professions")
	const schools = useCollectionImmutable<MagicSchoolTech>("tech/magic-schools")
	const archetypes = useCollectionImmutable<Archetype>("archetypes")
	const orderAlignments = useCollectionImmutable<Alignment>("alignments-order")
	const chaosAlignments = useCollectionImmutable<Alignment>("alignments-chaos")
	const character = useCharacterSheet(router.query.character as string)
	return (
		<CharacterSheetScreen
			{...{
				character,
				ancestries,
				talents,
				professions,
				schools,
				archetypes,
				orderAlignments,
				chaosAlignments
			}}
		/>
	)
})
