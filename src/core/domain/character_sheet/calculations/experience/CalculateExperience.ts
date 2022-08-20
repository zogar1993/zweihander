import calculateTiers from "@core/domain/character_sheet/calculations/CalculateTiers"
import calculateSpellsExperience from "@core/domain/character_sheet/calculations/experience/CaculateSpellsExperience"
import { MagicSchoolTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"

export default function calculateExperience({
																							character,
																							schoolsCatalog,
																							professionProfile: { tiers, remaining }
																						}: {
	character: SanitizedCharacterSheet
	schoolsCatalog: ReadonlyArray<MagicSchoolTech>
	professionProfile: ReturnType<typeof calculateTiers>
}): number {

	const favored_attribute = UPBRINGINGS.find(
		x => x.code === character.upbringing
	)?.attribute

	const favored_skills = SKILL_DEFINITIONS
		.filter(skill => skill.attribute === favored_attribute)
		.map(x => x.code)

	let experience = 0

	experience += calculateSpellsExperience({ character, schoolsCatalog })

	forEachEntryInRecord(character.focuses, ([skill, focuses]) => {
		const favored = favored_skills.includes(skill)
		experience += (favored ? 50 : 100) * focuses.length
	})

	tiers.map((x, i) => {
		const multiplier = (i + 1) * 100
		experience += multiplier //profession cost
		experience += x.attributes.bought.length * multiplier
		//experience += x.skills.bought.length * multiplier
		experience += x.talents.bought.length * multiplier
		experience += x.wildcards.length * multiplier
	})

	experience += remaining.talents.length * 100

	experience += calculate({
		properties: SKILL_DEFINITIONS.map(x => x.code),
		bought: tiers.map(x => x.skills.bought),
		remaining: remaining.skills
	})

	return experience
}

enum XpMultiplier {
	Empty = 0,
	Profession = 1,
	NonProfession = 2
}


function partialRecordKeys<Key extends string, Value>(
	record: Partial<Record<Key, Value>>
) {
	return Object.entries(record) as Array<[Key, Value]>
}

function forEachEntryInRecord<Key extends string, Value>(
	record: Partial<Record<Key, Value>>,
	func: (pair: [key: Key, value: Value]) => void
) {
	const pairs = partialRecordKeys(record)
	pairs.forEach(func)
}

function calculate({
										 bought,
										 remaining,
										 properties
									 }: {
	bought: Array<Array<string>>,
	remaining: Array<string>,
	properties: Array<string>
}) {

	const matrix = {} as Record<string, [XpMultiplier, XpMultiplier, XpMultiplier]>
	properties.forEach(code => {
		matrix[code] = [XpMultiplier.Empty, XpMultiplier.Empty, XpMultiplier.Empty]
	})
	bought.forEach((codes, i) => {
		codes.forEach(code => {
			matrix[code][i] = XpMultiplier.Profession
		})
	})

	remaining.forEach(attribute => {
		const vector = matrix[attribute]
		const index = vector.findIndex(x => x === XpMultiplier.Empty)
		vector[index] = XpMultiplier.NonProfession
	})

	return properties.reduce((accumulator, code) =>
			accumulator + matrix[code].map((item, i) => item * (i + 1) * 100).reduce((accum, value) => accum + value, 0),

		0)
}