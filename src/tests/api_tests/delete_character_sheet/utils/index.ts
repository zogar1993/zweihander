import handler from "@api/characters/[id]"
import * as auth0 from "@auth0/nextjs-auth0"
import * as DeleteCharacterSheetOfId from "@core/actions/DeleteCharacterSheetOfId"
import * as GetCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import { TestNextApiResponse } from "@tests/api_tests/utils"
import { DEFAULT_CHARACTER_SHEET } from "@tests/web_tests/character_sheet/utils/utils"
import {
	ROLES_PROPERTY_NAME,
	UserRole
} from "@web/components/character_sheet/hooks/useIsAdminUser"
import { NextApiRequest } from "next"

export const deleteCharacterSheetOfIdSpy = jest.spyOn(
	DeleteCharacterSheetOfId,
	"default"
)
export const getCharacterSheetOfIdMetaSpy = jest.spyOn(
	GetCharacterSheetOfId,
	"getCharacterSheetMeta"
)

export const getSessionSpy = jest.spyOn(auth0, "getSession")
getSessionSpy.mockImplementation(() => ({
	user: { email: DEFAULT_CHARACTER_SHEET.created_by, role: UserRole.User }
}))

getCharacterSheetOfIdMetaSpy.mockReturnValue(
	Promise.resolve(DEFAULT_CHARACTER_SHEET)
)

export const CHARACTER_ID = "an_id"

export function as_user({
	email,
	role
}: {
	email: string
	role: UserRole | null
}) {
	getSessionSpy.mockReset()
	getSessionSpy.mockReturnValue({
		user: { email, [ROLES_PROPERTY_NAME]: role ? [role] : [] }
	})
}

export async function a_character_sheet_exists(character: {
	created_by: string
	id: string
}) {
	getCharacterSheetOfIdMetaSpy.mockReset()
	getCharacterSheetOfIdMetaSpy.mockImplementation(async (id: string) => {
		if (character.id !== id)
			throw Error(`id "${id}" not matching id "${character.id}"`)
		return { created_by: character.created_by }
	})
}

export async function a_character_sheet_does_not_exist(character: {
	id: string
}) {
	getCharacterSheetOfIdMetaSpy.mockReset()
	getCharacterSheetOfIdMetaSpy.mockImplementation(async (id: string) => {
		if (character.id !== id)
			throw Error(`id "${id}" not matching id "${character.id}"`)
		return null
	})
}

export async function delete_character_sheet_of_id(id: string) {
	deleteCharacterSheetOfIdSpy.mockReset()
	deleteCharacterSheetOfIdSpy.mockReturnValue(Promise.resolve())

	const request = {
		method: "DELETE",
		query: { id: id }
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
	getCharacterSheetOfIdMetaSpy.mockReset()
	getCharacterSheetOfIdMetaSpy.mockReturnValue(
		Promise.resolve(DEFAULT_CHARACTER_SHEET)
	)

	return result
}

export function expect_character_to_be_deleted(id: string) {
	expect(deleteCharacterSheetOfIdSpy.mock.calls.length).toBe(1)
	expect(deleteCharacterSheetOfIdSpy.mock.calls[0][0]).toBe(id)
}

export function expect_character_to_not_be_deleted(id: string) {
	expect(deleteCharacterSheetOfIdSpy.mock.calls.length).toBe(0)
}
