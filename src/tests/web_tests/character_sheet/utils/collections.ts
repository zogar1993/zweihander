import { Alignment } from "@core/actions/GetAlignments"
import { Archetype } from "@core/actions/GetArchetypes"
import { Ancestry } from "@core/domain/Ancestry"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { Spell } from "@core/domain/Spell"
import { Talent } from "@core/domain/Talent"

export const TEST_ANCESTRIES: Array<Ancestry> = Array.from(
	Array(10).keys(),
	n => n + 1
).map(n => ({
	name: `Ancestry ${n}`,
	code: `ancestry_${n}`,
	description: `Ancestry ${n} description`,
	type: `ancestry_${n}_type`,
	family: `ancestry_${n}_family`,
	attribute_bonuses: {
		combat: -2,
		fellowship: -1,
		brawn: 1,
		willpower: 2
	},
	traits: Array.from(Array(10).keys(), m => m + 1).map(m => ({
		name: `Ancestry ${n} Trait ${m}`,
		code: `ancestry_${n}_trait_${m}`,
		description: `ancestry_${n}_trait_${m}_description`,
		effect: `ancestry_${n}_trait_${m}_effect`,
		from: 10 * (m - 1) + 1,
		to: 10 * m
	})),
	icon: ""
}))

export const TEST_PROFESSIONS: Array<Profession> = Array.from(
	Array(50).keys(),
	n => n + 1
).map(n => ({
	name: `Profession ${n}`,
	code: `profession_${n}`,
	book: "Main Gauche",
	type: "",
	prerequisite: undefined,
	description: `Profession Description ${n}`,
	traits: [
		{
			name: `Profession ${n} Trait`,
			code: `profession_${n}_trait`,
			description: `profession_${n}_trait_description`,
			effect: `profession_${n}_trait_effect`
		}
	],
	advances: {
		skill_ranks: [],
		bonus_advances: {},
		talents: []
	}
}))

export const TEST_ARCHETYPES: Array<Archetype> = Array.from(
	Array(5).keys(),
	n => n + 1
).map(n => ({
	name: `Archetype ${n}`,
	code: `archetype_${n}`,
	from: 20 * (n - 1) + 1,
	to: 20 * n,
	professions: {
		"Main Gauche": Array.from(Array(5).keys(), m => m + 1).map(m => ({
			profession: TEST_PROFESSIONS[n + 5 * (m - 1)].code,
			from: 20 * (m - 1) + 1,
			to: 20 * m
		})),
		Zweihänder: []
	}
}))

export const TEST_CHAOS_ALIGNMENTS: Array<Alignment> = Array.from(
	Array(10).keys(),
	n => n + 1
).map(n => ({
	name: `Chaos Alignment ${n}`,
	code: `chaos_alignment_${n}`,
	description: `chaos_alignment_${n}_description`,
	from: 10 * (n - 1) + 1,
	to: 10 * n,
	type: "chaos",
	partner: `order_alignment_${n}`
}))

export const TEST_ORDER_ALIGNMENTS: Array<Alignment> = Array.from(
	Array(10).keys(),
	n => n + 1
).map(n => ({
	name: `Order Alignment ${n}`,
	code: `order_alignment_${n}`,
	description: `chaos_alignment_${n}_description`,
	from: 10 * (n - 1) + 1,
	to: 10 * n,
	type: "order",
	partner: `order_alignment_${n}`
}))

export const TEST_MAGIC_SCHOOLS: Array<MagicSchool> = Array.from(
	Array(10).keys(),
	n => n + 1
).map(n => ({
	name: `Magic School ${n}`,
	code: `magic_school_${n}`,
	source: `arcana`,
	spells: Array.from(Array(5).keys(), m => m + 1).map(m => ({
		name: `Magic School ${n} Spell ${m}`,
		code: `magic_school_${n}_spell_${m}`
	})) as unknown as Array<Spell>,
}))

export const TEST_TALENTS: Array<Talent> = Array.from(
	Array(40).keys(),
	n => n + 1
).map(n => ({
	name: `Talent ${n}`,
	code: `talent_${n}`,
	effect: `talent_${n}_effect`,
	description: `talent_${n}_description`
}))
