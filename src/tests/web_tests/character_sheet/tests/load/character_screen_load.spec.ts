import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { getByCode } from "@core/domain/general/GetByCode"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	TEST_ARCHETYPES,
	TEST_CHAOS_ALIGNMENTS,
	TEST_MAGIC_SCHOOLS,
	TEST_ORDER_ALIGNMENTS,
	TEST_PROFESSIONS,
	TEST_TALENTS
} from "@tests/web_tests/character_sheet/utils/collections"
import {
	A_USER,
	ANOTHER_USER,
	click_menu_item, given_you_no_role, given_your_email_is,
	render_character_sheet, then_character_sheet_does_not_show, then_checkbox_exists,
	then_dots_is_checked_on,
	then_menu_item_is_not_shown,
	then_number_input_has_a_value_of,
	then_number_input_is_disabled, then_radio_is_checked, then_radio_is_disabled, then_radio_is_unchecked,
	then_tag_exists,
	then_textbox_has_a_value_of,
	then_textbox_is_disabled, then_you_are_redirected_to_unauthorized
} from "@tests/web_tests/character_sheet/utils/utils"
import {
	DAMAGE_CONDITIONS,
	PERIL_CONDITIONS,
	SETTINGS_VISIBILITY,
	SEXES,
	SOCIAL_CLASSES,
	UPBRINGINGS
} from "@web/components/character_sheet/bio/Constants"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"

describe("Character Sheet Screen should", () => {
	xit("show character values on load", async () => {
		await render_character_sheet(A_CHARACTER_SHEET)

		await then_textbox_has_a_value_of("Name", NAME)
		await then_textbox_has_a_value_of("Sex", SEX.name)
		await then_textbox_has_a_value_of("Social Class", SOCIAL_CLASS.name)
		await then_textbox_has_a_value_of("Upbringing", UPBRINGING.name)
		await then_textbox_has_a_value_of("Archetype", ARCHETYPE.name)
		await then_textbox_has_a_value_of("Profession 1", PROFESSION_1.name)
		await then_textbox_has_a_value_of("Profession 2", PROFESSION_2.name)
		await then_textbox_has_a_value_of("Profession 3", PROFESSION_3.name)
		await then_textbox_has_a_value_of("Chaos Alignment", CHAOS_ALIGNMENT.name)
		await then_textbox_has_a_value_of("Order Alignment", ORDER_ALIGNMENT.name)
		await Promise.all(PERIL_CONDITIONS.map(peril => PERIL_CONDITION.code === peril.code ?
			then_radio_is_checked(peril.name) : then_radio_is_unchecked(peril.name)
		))
		await Promise.all(DAMAGE_CONDITIONS.map(damage => DAMAGE_CONDITION.code === damage.code ?
			then_radio_is_checked(damage.name) : then_radio_is_unchecked(damage.name)
		))
		await then_dots_is_checked_on(`${SKILL.name} Ranks`, SKILL_RANKS)
		await then_dots_is_checked_on(
			`${ATTRIBUTE.name} Advances`,
			ATTRIBUTE_ADVANCES
		)
		await then_number_input_has_a_value_of(
			`${ATTRIBUTE.name} Base`,
			ATTRIBUTE_BASE
		)
		await then_dots_is_checked_on("Chaos Ranks", CHAOS_RANKS)
		await then_dots_is_checked_on("Order Ranks", ORDER_RANKS)
		await then_number_input_has_a_value_of("Corruption", CORRUPTION)
		await then_checkbox_exists(TALENT_1.name)
		await then_checkbox_exists(TALENT_2.name)
		await click_menu_item(ACCORDION_ITEM.FOCUSES)
		await then_tag_exists(FOCUS_1)
		await then_tag_exists(FOCUS_2)
		await then_tag_exists(FOCUS_3)
		await click_menu_item(ACCORDION_ITEM.SPELLS)
		await then_tag_exists(SPELL_1.name)
		await then_tag_exists(SPELL_2.name)
		await then_tag_exists(SPELL_3.name)
		await click_menu_item(ACCORDION_ITEM.SETTINGS)
		await then_textbox_has_a_value_of("Visibility", VISIBILITY.name)
	}, 10000)

	xit("show correct defaults for an empty character sheet", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Name", "")
		await then_textbox_has_a_value_of("Sex", "")
		await then_textbox_has_a_value_of("Social Class", "")
		await then_textbox_has_a_value_of("Upbringing", "")
		await then_textbox_has_a_value_of("Archetype", "")
		await then_textbox_has_a_value_of("Profession 1", "")
		await then_textbox_has_a_value_of("Profession 2", "")
		await then_textbox_has_a_value_of("Profession 3", "")
		await then_textbox_has_a_value_of("Chaos Alignment", "")
		await then_textbox_has_a_value_of("Order Alignment", "")
		await Promise.all(PERIL_CONDITIONS.map(peril => 0 === peril.code ?
			then_radio_is_checked(peril.name) : then_radio_is_unchecked(peril.name)
		))
		await Promise.all(DAMAGE_CONDITIONS.map(damage => 0 === damage.code ?
			then_radio_is_checked(damage.name) : then_radio_is_unchecked(damage.name)
		))
		await then_dots_is_checked_on(`${SKILL.name} Ranks`, 0)
		await then_dots_is_checked_on(`${ATTRIBUTE.name} Advances`, 0)
		await then_number_input_has_a_value_of(`${ATTRIBUTE.name} Base`, 42)
		await then_dots_is_checked_on("Chaos Ranks", 0)
		await then_dots_is_checked_on("Order Ranks", 0)
		await then_number_input_has_a_value_of("Corruption", 0)
		await click_menu_item(ACCORDION_ITEM.SETTINGS)
		await then_textbox_has_a_value_of(
			"Visibility",
			getByCode("public", SETTINGS_VISIBILITY).name
		)
	}, 10000)

	xit("show all fields as disabled when character is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({ created_by: ANOTHER_USER })

		await then_textbox_is_disabled("Name")
		await then_textbox_is_disabled("Sex")
		await then_textbox_is_disabled("Social Class")
		await then_textbox_is_disabled("Upbringing")
		await then_textbox_is_disabled("Archetype")
		await then_textbox_is_disabled("Profession 1")
		await then_textbox_is_disabled("Profession 2")
		await then_textbox_is_disabled("Profession 3")
		await then_textbox_is_disabled("Chaos Alignment")
		await then_textbox_is_disabled("Order Alignment")
		await Promise.all(PERIL_CONDITIONS.map(peril => then_radio_is_disabled(peril.name)))
		await Promise.all(DAMAGE_CONDITIONS.map(damage => then_radio_is_disabled(damage.name)))
		//await then_dots_is_checked_on(`${SKILL.name} Ranks`, 0)
		//await then_dots_is_checked_on(`${ATTRIBUTE.name} Advances`, 0)
		//await then_number_input_has_a_value_of(`${ATTRIBUTE.name} Base`, 42)
		//await then_dots_is_checked_on("Chaos Ranks", 0)
		//await then_dots_is_checked_on("Order Ranks", 0)
		await then_number_input_is_disabled("Corruption")
		await click_menu_item(ACCORDION_ITEM.SETTINGS)
		await then_textbox_is_disabled("Visibility")
		await then_menu_item_is_not_shown(ACCORDION_ITEM.DANGER_ZONE)
	}, 10000)

	it("not show the page and redirect away when you have no roles", async () => {
		await given_you_no_role()
		await render_character_sheet()

		await then_character_sheet_does_not_show()
		await then_you_are_redirected_to_unauthorized()
	})

	it("not show the page and redirect away when character sheet is private and not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({
			created_by: ANOTHER_USER,
			settings: { visibility: "private" }
		})

		await then_character_sheet_does_not_show()
		await then_you_are_redirected_to_unauthorized()
	})
})

const NAME = "Linuar"
const AGE = 36
const SEX = SEXES[1]
const SOCIAL_CLASS = SOCIAL_CLASSES[1]
const UPBRINGING = UPBRINGINGS[1]
const ARCHETYPE = TEST_ARCHETYPES[1]
const PROFESSION_1 = getByCode(
	ARCHETYPE.professions["Main Gauche"][1].profession,
	TEST_PROFESSIONS
)
const PROFESSION_2 = TEST_PROFESSIONS[2]
const PROFESSION_3 = TEST_PROFESSIONS[3]
const CHAOS_ALIGNMENT = TEST_CHAOS_ALIGNMENTS[1]
const ORDER_ALIGNMENT = TEST_ORDER_ALIGNMENTS[1]
const CHAOS_RANKS = 6
const ORDER_RANKS = 2
const CORRUPTION = 7

const TALENT_1 = TEST_TALENTS[TEST_TALENTS.length - 1]
const TALENT_2 = TEST_TALENTS[TEST_TALENTS.length - 2]
const SCHOOL_1 = TEST_MAGIC_SCHOOLS[1]
const SCHOOL_2 = TEST_MAGIC_SCHOOLS[2]
const SPELL_1 = SCHOOL_1.spells[1]
const SPELL_2 = SCHOOL_1.spells[2]
const SPELL_3 = SCHOOL_2.spells[1]
const FOCUS_SKILL_1 = SKILL_DEFINITIONS[1]
const FOCUS_SKILL_2 = SKILL_DEFINITIONS[2]
const FOCUS_1 = "focus 1"
const FOCUS_2 = "focus 2"
const FOCUS_3 = "focus 3"
const SKILL = SKILL_DEFINITIONS[1]
const ATTRIBUTE = ATTRIBUTE_DEFINITIONS[1]
const ATTRIBUTE_BASE = 47
const ATTRIBUTE_ADVANCES = 2
const SKILL_RANKS = 1
const VISIBILITY = SETTINGS_VISIBILITY[1]
const PERIL_CONDITION = PERIL_CONDITIONS[1]
const DAMAGE_CONDITION = DAMAGE_CONDITIONS[1]

const A_CHARACTER_SHEET = {
	name: NAME,
	age: AGE,
	sex: SEX.code,
	upbringing: UPBRINGING.code,
	social_class: SOCIAL_CLASS.code,
	archetype: ARCHETYPE.code,
	profession1: PROFESSION_1.code,
	profession2: PROFESSION_2.code,
	profession3: PROFESSION_3.code,
	chaos_alignment: CHAOS_ALIGNMENT.code,
	order_alignment: ORDER_ALIGNMENT.code,
	chaos_ranks: CHAOS_RANKS,
	order_ranks: ORDER_RANKS,
	corruption: CORRUPTION,
	talents: [TALENT_1.code, TALENT_2.code],
	focuses: {
		[FOCUS_SKILL_1.code]: [FOCUS_1, FOCUS_2],
		[FOCUS_SKILL_2.code]: [FOCUS_3]
	},
	spells: {
		[SCHOOL_1.code]: [SPELL_1.code, SPELL_2.code],
		[SCHOOL_2.code]: [SPELL_3.code]
	},
	attributes: {
		[ATTRIBUTE.code]: { base: ATTRIBUTE_BASE, advances: ATTRIBUTE_ADVANCES }
	},
	skills: {
		[SKILL.code]: { ranks: SKILL_RANKS }
	},
	settings: {
		visibility: VISIBILITY.code
	},
	damage: DAMAGE_CONDITION.code,
	peril: PERIL_CONDITION.code
}
