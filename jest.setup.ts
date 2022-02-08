import "@testing-library/jest-dom/extend-expect"
import type { TestNextApiResponse } from "@tests/api_tests/utils"

global.TextEncoder = require("util").TextEncoder
global.TextDecoder = require("util").TextDecoder

expect.extend({
	toHaveStatusCode(received: TestNextApiResponse, status: number) {
		const { statusCode, ended, body } = received

		if (!ended)
			return { pass: false, message: () => "Server response was not ended" }

		const payload =
			typeof body === "string"
				? body
				: Array.isArray(body)
				? body.join("\n")
				: ""
		if (statusCode !== status)
			return {
				pass: false,
				message: () =>
					`Expected status code ${statusCode} to be ${status}\n${payload}`
			}

		return {
			pass: true,
			message: () =>
				`'toHaveStatusCode' matcher is not meant to be used with '.not'`
		}
	}
})

declare global {
	namespace jest {
		interface Matchers<R> {
			toHaveStatusCode: (status: number) => CustomMatcherResult
		}
	}
}
