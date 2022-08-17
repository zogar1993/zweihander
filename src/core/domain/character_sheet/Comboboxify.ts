import { Archetype } from "@core/actions/GetArchetypes"
import {
	AncestryTech,
	CalculatedCombobox,
	ProfessionTech,
	TraitTech
} from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"

export default class Comboboxify {
	static ancestry({ character, ancestriesCatalog }: {
		character: Pick<SanitizedCharacterSheet, "ancestry">,
		ancestriesCatalog: ReadonlyArray<AncestryTech>
	}): CalculatedCombobox {
		return {
			code: character.ancestry,
			options: ancestriesCatalog
		}
	}

	static ancestryTrait({ character, ancestriesCatalog }: {
		character: Pick<SanitizedCharacterSheet, "ancestry" | "ancestry_trait">,
		ancestriesCatalog: ReadonlyArray<AncestryTech>
	}): CalculatedCombobox {
		return {
			code: character.ancestry_trait,
			options: character.ancestry === null ? [] : getByCode(character.ancestry, ancestriesCatalog).traits,
			disabled: character.ancestry === null
		}
	}

	static profession1({ character, archetypesCatalog, professionsCatalog }: {
		character: Pick<SanitizedCharacterSheet, "profession1" | "profession2" | "archetype">,
		archetypesCatalog: ReadonlyArray<Archetype>
		professionsCatalog: ReadonlyArray<ProfessionTech>
	}): CalculatedCombobox {
		return {
			code: character.profession1,
			options: calculateTier1Professions(character.archetype, professionsCatalog, archetypesCatalog),
			disabled: character.profession2 !== null
		}
	}

	static profession2({ character, professionsCatalog }: {
		character: Pick<SanitizedCharacterSheet, "profession1" | "profession2" | "profession3">,
		professionsCatalog: ReadonlyArray<ProfessionTech>
	}): CalculatedCombobox {
		return {
			code: character.profession2,
			options: professionsCatalog,
			disabled: character.profession1 === null || character.profession3 !== null
		}
	}

	static profession3({ character, professionsCatalog }: {
		character: Pick<SanitizedCharacterSheet, "profession2" | "profession3">,
		professionsCatalog: ReadonlyArray<ProfessionTech>
	}): CalculatedCombobox {
		return {
			code: character.profession3,
			options: professionsCatalog,
			disabled: character.profession2 === null
		}
	}

	static talent({ character, talentsCatalog }: {
		character: Pick<SanitizedCharacterSheet, "talents">,
		talentsCatalog: ReadonlyArray<TraitTech>
	}): CalculatedCombobox {
		return {
			code: null,
			options: talentsCatalog.filter(x => !character.talents.includes(x.code))
		}
	}


	static archetype({ character, archetypesCatalog }: {
		character: Pick<SanitizedCharacterSheet, "archetype" | "profession1">,
		archetypesCatalog: ReadonlyArray<Archetype>
	}): CalculatedCombobox {
		return {
			code: character.archetype,
			options: archetypesCatalog,
			disabled: character.profession1 !== null
		}
	}
}


function calculateTier1Professions(
	archetype: string | null,
	professions: ReadonlyArray<ProfessionTech>,
	archetypes: ReadonlyArray<Archetype>
): ReadonlyArray<ProfessionTech> {
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