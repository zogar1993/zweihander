import handler, { UpdateAction } from "@api/characters/[id]/update"
import * as auth0 from "@auth0/nextjs-auth0"
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
export const withApiAuthRequiredSpy = jest.spyOn(auth0, "getSession")
withApiAuthRequiredSpy.mockImplementation(() => ({
	user: { email: DEFAULT_CHARACTER_SHEET.created_by }
}))

permamock("@core/actions/GetAncestries", Promise.resolve(TEST_ANCESTRIES))
permamock("@core/actions/GetProfessions", Promise.resolve(TEST_PROFESSIONS))
permamock("@core/actions/GetArchetypes", Promise.resolve(TEST_ARCHETYPES))
permamock(
	"@core/actions/GetOrderAlignments",
	Promise.resolve(TEST_ORDER_ALIGNMENTS)
)
permamock(
	"@core/actions/GetChaosAlignments",
	Promise.resolve(TEST_CHAOS_ALIGNMENTS)
)
permamock("@core/actions/GetMagicSchools", Promise.resolve(TEST_MAGIC_SCHOOLS))
permamock("@core/actions/GetTalents", Promise.resolve(TEST_TALENTS))
const NEW_UPDATE_TIME = "2022-03-12T21:18:48.685Z"
permamock("@core/utils/Now", NEW_UPDATE_TIME)

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
	return update_character_full({
		update_actions: blocksToObjects(body),
		last_modified: DEFAULT_CHARACTER_SHEET.updated_at
	})
}

export async function update_character_full({
	update_actions = [],
	last_modified = DEFAULT_CHARACTER_SHEET.updated_at
}: {
	update_actions: Array<UpdateAction>
	last_modified: string | null
}) {
	updateCharacterSpy.mockReset()
	updateCharacterSpy.mockReturnValue(Promise.resolve())

	const request = {
		method: "POST",
		query: {
			id: CHARACTER_ID
		},
		body: JSON.stringify(update_actions),
		headers: { "if-unmodified-since": last_modified || undefined }
	} as unknown as NextApiRequest
	const result = {
		ended: false,
		status(code: number) {
			this.statusCode = code
			return result
		},
		json(body: any) {
			this.body = body
			this.ended = true
			return result
		},
		setHeader(key: string, value: string) {
			return result
		},
		end() {
			this.ended = true
		}
	} as any as TestNextApiResponse

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
	if (change.set) change.set.updated_at = NEW_UPDATE_TIME
	else change.set = { updated_at: NEW_UPDATE_TIME }
	const calls = updateCharacterSpy.mock.calls
	expect(calls.length).toStrictEqual(1)
	const call = calls[0]
	expect(call[0]).toStrictEqual(CHARACTER_ID)
	expect(call[1]).toStrictEqual(DEFAULT_CHARACTER_SHEET.updated_at)
	expect(call[2]).toStrictEqual(change)
}

export function expect_character_to_be_unchanged() {
	expect(updateCharacterSpy.mock.calls.length).toBe(0)
}

export type TestNextApiResponse = NextApiResponse & {
	ended: boolean
	body: any
}
