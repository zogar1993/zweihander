import getProfessions from "@core/actions/GetProfessions"
import { fireEvent, render, screen, within } from "@testing-library/react"
import ProfessionsScreen from "@web/components/professions/ProfessionsScreen"
import { useState } from "react"

function useRouterMock() {
	const [query, setQuery] = useState<Record<string, string>>({})
	return {
		push: (path: string) => {
			const index = path.indexOf("?")
			if (index === -1) return setQuery({})
			const queryparams = path.substring(index + 1).split("&")
			const query: any = {}
			queryparams.forEach(part => {
				const [key, value] = part.split("=")
				query[key] = value
			})
			setQuery(query)
		},
		query: query
	}
}

const useRouterSpy = jest.spyOn(require("next/router"), "useRouter")
useRouterSpy.mockImplementation(useRouterMock as any)

describe("ProfessionsScreen should", () => {
	it("render completely", async () => {
		const professions = await getProfessions()
		render(<ProfessionsScreen professions={professions} />)

		for (const profession of professions) {
			const article = screen.getByRole("article", { name: profession.name })
			within(article).getByText(profession.name)
			within(article).getByText(profession.book)
			within(article).getByText(profession.type)
			fireEvent.click(article)
			await screen.findByText(profession.description)
		}
	})
})
