import getAncestries from "@core/actions/GetAncestries"
import getArchetypes from "@core/actions/GetArchetypes"
import getChaosAlignments from "@core/actions/GetChaosAlignments"
import getMagicSchools from "@core/actions/GetMagicSchools"
import getOrderAlignments from "@core/actions/GetOrderAlignments"
import getProfessions from "@core/actions/GetProfessions"
import getTalents from "@core/actions/GetTalents"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { hasByCode } from "@core/domain/general/HasByCode"
import { getDeepPropertyValue } from "@core/utils/GetDeepPropertyValue"
import {
	SETTINGS_SKILL_ORDER,
	SETTINGS_VISIBILITY,
	SEXES,
	SOCIAL_CLASSES,
	UPBRINGINGS
} from "@web/components/character_sheet/bio/Constants"

export async function validateModel(
	character: SanitizedCharacterSheet
): Promise<Array<string>> {
	const ancestries = await getAncestries()
	const archetypes = await getArchetypes()
	const professions = await getProfessions()
	const chaos_alignments = await getChaosAlignments()
	const order_alignments = await getOrderAlignments()
	const schools = await getMagicSchools()
	const talents = await getTalents()

	const ancestry_traits =
		character.ancestry === null
			? []
			: ancestries.find(x => x.code === character.ancestry)?.traits ?? []

	const first_professions =
		character.archetype === null
			? []
			: archetypes
					.find(x => x.code === character.archetype)
					?.professions["Main Gauche"].map(x => ({ code: x.profession })) ?? []

	return [
		verifyNoDuplicateValues("talents", character),
		character.talents.flatMap(talent =>
			verifyIsWithin(talent, talents, "talents")
		),
		Object.keys(character.spells).flatMap(school => {
			const school_errors = verifyIsWithin(school, schools, `spells.${school}`)
			if (school_errors.length > 0) return school_errors
			const spells = getByCode(school, schools).spells
			return [
				character["spells"][school]!.flatMap(spell =>
					verifyIsWithin(spell, spells, `spells.${school}`)
				),
				verifyNoDuplicateValues(`spells.${school}` as any, character)
			].flatMap(x => x)
		}),
		Object.keys(character.focuses).flatMap((x: any) =>
			verifyNoDuplicateValues(`focuses.${x}` as any, character)
		),
		verifyDependencyIsNotNull("ancestry_trait", "ancestry", character),
		verifyDependencyIsNotNull("profession1", "archetype", character),
		verifyDependencyIsNotNull("profession2", "profession1", character),
		verifyDependencyIsNotNull("profession3", "profession2", character),
		verifyIsNullOrWithin("ancestry", ancestries, character),
		verifyIsNullOrWithin("ancestry_trait", ancestry_traits, character),
		verifyIsNullOrWithin("archetype", archetypes, character),
		verifyIsNullOrWithin("profession1", first_professions, character),
		verifyIsNullOrWithin("profession2", professions, character),
		verifyIsNullOrWithin("profession3", professions, character),
		verifyIsNullOrWithin("order_alignment", order_alignments, character),
		verifyIsNullOrWithin("chaos_alignment", chaos_alignments, character),
		verifyIsNullOrWithin("social_class", SOCIAL_CLASSES, character),
		verifyIsNullOrWithin("upbringing", UPBRINGINGS, character),
		verifyIsNullOrWithin("sex", SEXES, character),
		verifyIsNullOrWithin(
			"skill_order",
			SETTINGS_SKILL_ORDER,
			character.settings
		),
		verifyIsNullOrWithin("visibility", SETTINGS_VISIBILITY, character.settings)
	].flatMap(x => x)
}

function verifyNoDuplicateValues(
	property: keyof SanitizedCharacterSheet,
	character: SanitizedCharacterSheet
) {
	const parts = property.split(".")
	const array = getDeepPropertyValue(parts, character) as Array<string>
	const set = new Set(array)
	if (array.length !== set.size)
		return [`cannot set a duplicate value into ${property}`]
	return []
}

function verifyDependencyIsNotNull(
	property: keyof SanitizedCharacterSheet,
	dependency: keyof SanitizedCharacterSheet,
	character: SanitizedCharacterSheet
) {
	if (character[property] !== null)
		if (character[dependency] === null)
			return [`cannot set ${property} while ${dependency} is null`]
	return []
}

function verifyIsNullOrWithin<T>(
	property: keyof T,
	collection: ReadonlyArray<{ code: string }>,
	character: T
) {
	if (character[property] !== null)
		if (!hasByCode(character[property] as any, collection))
			return [`'${character[property]}' is not a valid ${property}`]
	return []
}

function verifyIsWithin(
	value: string,
	collection: Array<{ code: string }>,
	prop: string
) {
	if (!hasByCode(value as string, collection))
		return [`'${value}' is not a valid ${prop}`]
	return []
}