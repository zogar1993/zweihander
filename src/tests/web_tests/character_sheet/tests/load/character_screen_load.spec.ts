import { getByCode } from "@core/domain/general/GetByCode"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { then_checkbox_exists } from "@tests/web_tests/character_sheet/utils/checkbox-helpers"
import { TEST_MAGIC_SCHOOLS, TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"
import {
	then_textbox_has_a_value_of,
	then_textbox_is_disabled
} from "@tests/web_tests/character_sheet/utils/textbox-helpers"
import {
	A_USER,
	ANOTHER_USER,
	click_menu_item,
	given_you_no_role,
	given_your_email_is,
	render_character_sheet,
	then_character_sheet_does_not_show,
	then_menu_item_is_not_shown,
	then_tag_exists,
	then_you_are_redirected_to_unauthorized
} from "@tests/web_tests/character_sheet/utils/utils"
import { SETTINGS_VISIBILITY } from "@web/components/character_sheet/bio/Constants"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"

describe("Character Sheet Screen should", () => {
	xit("show character values on load", async () => {
		await render_character_sheet(A_CHARACTER_SHEET)

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
	})

	xit("show correct defaults for an empty character sheet", async () => {
		await render_character_sheet({})

		await click_menu_item(ACCORDION_ITEM.SETTINGS)
		await then_textbox_has_a_value_of(
			"Visibility",
			getByCode("public", SETTINGS_VISIBILITY).name
		)
	})

	xit("show all fields as disabled when character is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({ created_by: ANOTHER_USER })
		await click_menu_item(ACCORDION_ITEM.SETTINGS)
		await then_textbox_is_disabled("Visibility")
		await then_menu_item_is_not_shown(ACCORDION_ITEM.DANGER_ZONE)
	})

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
const VISIBILITY = SETTINGS_VISIBILITY[1]

const A_CHARACTER_SHEET = {
	talents: [TALENT_1.code, TALENT_2.code],
	focuses: {
		[FOCUS_SKILL_1.code]: [FOCUS_1, FOCUS_2],
		[FOCUS_SKILL_2.code]: [FOCUS_3]
	},
	spells: {
		[SCHOOL_1.code]: [SPELL_1.code, SPELL_2.code],
		[SCHOOL_2.code]: [SPELL_3.code]
	},
}
