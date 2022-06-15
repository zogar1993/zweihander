export const SEXES = [
	{ name: "Male", code: "male" },
	{ name: "Female", code: "female" },
	{ name: "Other", code: "other" }
]

export const SOCIAL_CLASSES = [
	{ name: "Lowborn", code: "lowborn" },
	{ name: "Bourgeois", code: "bourgeois" },
	{ name: "Aristocrat", code: "aristocrat" }
]

export const UPBRINGINGS = [
	{
		code: "cultured",
		name: "Cultured (Fellowship)",
		from: 1,
		to: 14,
		attribute: "fellowship"
	},
	{
		code: "forgotten",
		name: "Forgotten (Agility)",
		from: 15,
		to: 29,
		attribute: "agility"
	},
	{
		code: "industrious",
		name: "Industrious (Brawn)",
		from: 30,
		to: 44,
		attribute: "brawn"
	},
	{
		code: "militant",
		name: "Militant (Combat)",
		from: 45,
		to: 59,
		attribute: "combat"
	},
	{
		code: "opportunistic",
		name: "Opportunistic (Perception)",
		from: 60,
		to: 74,
		attribute: "perception"
	},
	{
		code: "reverent",
		name: "Reverent (Willpower)",
		from: 75,
		to: 89,
		attribute: "willpower"
	},
	{
		code: "scholastic",
		name: "Scholastic (Intelligence)",
		from: 90,
		to: 100,
		attribute: "intelligence"
	}
]

export const SETTINGS_VISIBILITY = [
	{ name: "Public", code: "public" },
	{ name: "Private", code: "private" }
] as const

export const PERIL_CONDITIONS = [
	{ code: 0, name: "UNHINDERED" },
	{ code: 1, name: "Imperiled" },
	{ code: 2, name: "Ignore 1 Skill Rank" },
	{ code: 3, name: "Ignore 2 Skill Ranks" },
	{ code: 4, name: "Ignore 3 Skill Ranks" },
	{ code: 5, name: "INCAPACITATED!" }
]

export const DAMAGE_CONDITIONS = [
	{ code: 0, name: "UNHARMED" },
	{ code: 1, name: "Lightly Wounded" },
	{ code: 2, name: "Moderately Wounded" },
	{ code: 3, name: "Seriously Wounded" },
	{ code: 4, name: "Grievously Wounded" },
	{ code: 5, name: "SLAIN!" }
]
