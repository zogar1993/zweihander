import { Archetype } from "@core/actions/GetArchetypes"
import {
	AncestryTech,
	CalculatedCombobox,
	ProfessionTech,
	TalentTech
} from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"

export default class Comboboxify {


	static ancestry({ character, ancestries }: {
		character: Pick<SanitizedCharacterSheet, "ancestry">,
		ancestries: Array<AncestryTech>
	}): CalculatedCombobox {
		return {
			code: character.ancestry,
			options: ancestries
		}
	}

	static ancestryTrait({ character, ancestries }: {
		character: Pick<SanitizedCharacterSheet, "ancestry" | "ancestry_trait">,
		ancestries: Array<AncestryTech>
	}): CalculatedCombobox {
		return {
			code: character.ancestry_trait,
			options: character.ancestry === null ? [] : getByCode(character.ancestry, ancestries).traits,
			disabled: character.ancestry === null
		}
	}

	static profession1({ character, archetypes, professions }: {
		character: Pick<SanitizedCharacterSheet, "profession1" | "profession2" | "archetype">,
		archetypes: Array<Archetype>
		professions: Array<ProfessionTech>
	}): CalculatedCombobox {
		return {
			code: character.profession1,
			options: calculateTier1Professions(character.archetype, professions, archetypes),
			disabled: character.profession2 !== null
		}
	}

	static profession2({ character, professions }: {
		character: Pick<SanitizedCharacterSheet, "profession1" | "profession2" | "profession3">,
		professions: Array<ProfessionTech>
	}): CalculatedCombobox {
		return {
			code: character.profession2,
			options: professions,
			disabled: character.profession1 === null || character.profession3 !== null
		}
	}

	static profession3({ character, professions }: {
		character: Pick<SanitizedCharacterSheet, "profession2" | "profession3">,
		professions: Array<ProfessionTech>
	}): CalculatedCombobox {
		return {
			code: character.profession3,
			options: professions,
			disabled: character.profession2 === null
		}
	}

	static talent({ character, talents }: {
		character: Pick<SanitizedCharacterSheet, "talents">,
		talents: Array<TalentTech>
	}): CalculatedCombobox {
		return {
			code: null,
			options: talents.filter(x => !character.talents.includes(x.code))
		}
	}


	static archetype({ character, archetypes }: {
		character: Pick<SanitizedCharacterSheet, "archetype" | "profession1">,
		archetypes: Array<Archetype>
	}): CalculatedCombobox {
		return {
			code: character.archetype,
			options: archetypes,
			disabled: character.profession1 !== null
		}
	}

}


function calculateTier1Professions(
	archetype: string | null,
	professions: Array<ProfessionTech>,
	archetypes: Array<Archetype>
): Array<ProfessionTech> {
	if (archetype === null) {
		return professions.filter(profession =>
			archetypes.some(archetype =>
				archetype.professions["Main Gauche"].some(
					prof => prof.profession === profession.code
				)
			)
		)
	}

	const names = getByCode(archetype, archetypes).professions["Main Gauche"]
	return names.map(x => ({
		...x,
		...getByCode(x.profession, professions)
	}))
}