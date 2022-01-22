import { getByCode } from "@core/domain/general/GetByCode"
import {
	SEXES,
	SOCIAL_CLASSES,
	UPBRINGINGS
} from "@web/components/character_sheet/bio/Constants"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import {
	TEST_ARCHETYPES,
	TEST_CHAOS_ALIGNMENTS,
	TEST_ORDER_ALIGNMENTS,
	TEST_PROFESSIONS
} from "./utils/collections"
import {
	click_menu_item,
	render_character_sheet, then_dots_is_checked_on, then_number_input_has_a_value_of,
	then_textbox_has_a_value_of
} from "./utils/utils"

describe("Character Sheet Screen should", () => {
	it("show character values on load", async () => {
		//TODO DOING lacks some properties and empty scenario
		await render_character_sheet(A_CHARACTER_SHEET)

		await then_textbox_has_a_value_of("Name", NAME)
		await then_number_input_has_a_value_of("Age", AGE)
		await then_textbox_has_a_value_of("Sex", SEX.name)
		await then_textbox_has_a_value_of("Social Class", SOCIAL_CLASS.name)
		await then_textbox_has_a_value_of("Upbringing", UPBRINGING.name)
		await then_textbox_has_a_value_of("Archetype", ARCHETYPE.name)
		await then_textbox_has_a_value_of("Profession 1", PROFESSION_1.name)
		await then_textbox_has_a_value_of("Profession 2", PROFESSION_2.name)
		await then_textbox_has_a_value_of("Profession 3", PROFESSION_3.name)
		await then_textbox_has_a_value_of("Chaos Alignment", CHAOS_ALIGNMENT.name)
		await then_textbox_has_a_value_of("Order Alignment", ORDER_ALIGNMENT.name)
		await click_menu_item(ACCORDION_ITEM.ALIGNMENT)
		await then_dots_is_checked_on("Chaos Ranks", CHAOS_RANKS)
		await then_dots_is_checked_on("Order Ranks", ORDER_RANKS)
		await then_number_input_has_a_value_of("Corruption", CORRUPTION)
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
	corruption: CORRUPTION
}
