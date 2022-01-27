import handler from "@api/character/[id]/update"
import * as GetCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import sanitizeCharacterSheet, {
	SanitizedCharacterSheet
} from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import * as UpdateCharacter from "@core/utils/UpdateCharacter"
import { UpdateCharacterProps } from "@core/utils/UpdateCharacter"
import { blocksToObjects, UpdateActionBlock } from "@web/misc/UpdateActionBlock"
import { NextApiRequest, NextApiResponse } from "next"
import {
	TEST_ANCESTRIES,
	TEST_ARCHETYPES,
	TEST_CHAOS_ALIGNMENTS,
	TEST_MAGIC_SCHOOLS,
	TEST_ORDER_ALIGNMENTS,
	TEST_PROFESSIONS,
	TEST_TALENTS
} from "../../web_tests/character_sheet/utils/collections"
import { DEFAULT_CHARACTER_SHEET } from "../../web_tests/character_sheet/utils/utils"
import { permamock } from "./Permamock"

export const updateCharacterSpy = jest.spyOn(UpdateCharacter, "default")
export const getCharacterSheetOfId = jest.spyOn(
	GetCharacterSheetOfId,
	"default"
)

permamock("@core/actions/GetAncestries", TEST_ANCESTRIES)
permamock("@core/actions/GetProfessions", TEST_PROFESSIONS)
permamock("@core/actions/GetArchetypes", TEST_ARCHETYPES)
permamock("@core/actions/GetOrderAlignments", TEST_ORDER_ALIGNMENTS)
permamock("@core/actions/GetChaosAlignments", TEST_CHAOS_ALIGNMENTS)
permamock("@core/actions/GetMagicSchools", TEST_MAGIC_SCHOOLS)
permamock("@core/actions/GetTalents", TEST_TALENTS)

getCharacterSheetOfId.mockReturnValue(Promise.resolve(DEFAULT_CHARACTER_SHEET))

export const CHARACTER_ID = "an_id"

export async function call_character_sheet_api(request: NextApiRequest) {
	const result = {
		status(code: number) {
			this.statusCode = code
		}
	} as NextApiResponse
	await handler(request, result)
	return result
}

export function the_saved_character_has(
	character: Partial<SanitizedCharacterSheet>
) {
	const sanitized = sanitizeCharacterSheet({
		...DEFAULT_CHARACTER_SHEET,
		...character
	})
	getCharacterSheetOfId.mockReturnValue(Promise.resolve(sanitized))
}

export async function update_character(...body: Array<UpdateActionBlock>) {
	updateCharacterSpy.mockReset()
	updateCharacterSpy.mockReturnValue(Promise.resolve())

	const request = {
		method: "POST",
		query: {
			id: CHARACTER_ID
		},
		body: JSON.stringify(blocksToObjects(body))
	} as unknown as NextApiRequest
	const result = {
		status(code: number) {
			this.statusCode = code
			return result
		},
		json(body: any) {
			this.body = body
			return result
		}
	} as any as NextApiResponse

	await handler(request, result)

	//reset mocks to sane defaults
	getCharacterSheetOfId.mockReset()
	getCharacterSheetOfId.mockReturnValue(
		Promise.resolve(DEFAULT_CHARACTER_SHEET)
	)

	return result
}

export function expect_character_to_have_attribute_set(
	change: Record<string, any>
) {
	expect_character_to_have_changed({ set: change })
}

export function expect_character_to_have_item_added(
	change: Record<string, any>
) {
	expect_character_to_have_changed({ push: change })
}

export function expect_character_to_have_item_removed(
	change: Record<string, any>
) {
	expect_character_to_have_changed({ pull: change })
}

export function expect_character_to_have_property_deleted(change: string) {
	expect_character_to_have_changed({ unset: [change] })
}

export function expect_character_to_have_changed(change: UpdateCharacterProps) {
	const calls = updateCharacterSpy.mock.calls
	expect(calls.length).toStrictEqual(1)
	const call = calls[0]
	expect(call[0]).toStrictEqual(CHARACTER_ID)
	expect(call[1]).toStrictEqual(change)
}

export function expect_character_to_be_unchanged() {
	expect(updateCharacterSpy.mock.calls.length).toBe(0)
}
