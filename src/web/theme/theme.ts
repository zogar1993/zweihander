// @ts-ignore
import styleInject from "style-inject"

export enum Color {
	White = "#ffffff",
	LighterGray = "#f5f5f5",
	LightGray = "#dfdfdf",
	Gray = "#b9b9b9",
	DarkGrey = "#808080",
	Black = "#000000",
}

const light = {
	colors: {
		text: Color.Black,
		muted: Color.DarkGrey,
		background1: Color.White,
		primary: Color.White,

		menu: {
			background: Color.LighterGray,
			open_item: Color.LightGray,
			focus: Color.Gray,
			border: Color.Gray,
		},

		disabled: {
			text: Color.DarkGrey,
			primary: Color.LighterGray,
		},

		actives: {
			text: Color.Black,
			primary: Color.DarkGrey,
		},

		hovers: {
			text: Color.Black,
			primary: Color.Gray,
		},
	},
	fonts: {
		handwritten: "Patrick Hand, Times, serif",
		title: "Almendra SC, Times, serif",
		stylish: "Almendra, Times, serif",
		common: "Arial, Times, serif",
	},
	borders: {
		radius: "6px"
	},
	spacing: {
		separation: "4px"
	}
}

const themes = { light }

// any theme could have been used, light was chosen arbitrarily.
const theme = toVarNames(light)

type ThemeType = "light"
const DEFAULT_THEME: ThemeType = "light"

styleInject(
	`
    ${themeToCssWithoutSelector()}
    ${Object.keys(themes)
			.map(theme => themeToCssWithSelector(theme))
			.join("")}

    * {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
    }

    *::before, ::after {
      box-sizing: border-box;
    }

    *::-webkit-scrollbar {
      width: 10px;
    }

    *::-webkit-scrollbar-track {
      background: transparent;
    }

    *::-webkit-scrollbar-thumb {
      background: darkgrey;
      border-radius: ${theme.borders.radius};
    }

    *::-webkit-scrollbar-thumb:hover {
      background: grey;
    }

    body {
      background: ${theme.colors.background1};
    }

    body * {
      font-family: ${theme.fonts.common};
    }
  `
)

export default theme

// converts any nested theme object into one with the css variables as the value
export function toVarNames<T>(obj: T, prefix = "-"): T {
	const vars: any = {}
	for (const [key, value] of Object.entries(obj)) {
		vars[key] =
			typeof value === "object"
				? toVarNames(value, `${prefix}-${key}`)
				: `var(${prefix}-${key})`
	}
	return vars as T
}

// converts the nested theme object into a flat object with `--path-to-value` keys
function toVars(obj: any, prefix = "-") {
	const vars: any = {}
	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === "object") {
			const nestedVars = toVars(value, `${prefix}-${key}`)
			for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
				vars[nestedKey] = nestedValue
			}
		} else {
			vars[`${prefix}-${key}`] = value
		}
	}
	return vars
}

export function toVarsCss(obj: any) {
	const vars = toVars(obj)
	return Object.entries(vars)
		.map(([key, value]) => `${key}: ${value};`)
		.join("\n")
}

function themeToCss(theme: string) {
	return toVarsCss((themes as any)[theme])
}

export function useTheme(theme: string) {
	document.body.dataset.theme = theme
}

function themeToCssWithoutSelector() {
	return `
    body {
      ${themeToCss(DEFAULT_THEME)}
    }
  `
}

function themeToCssWithSelector(theme: string) {
	return `
    body[data-theme=${theme}] {
      ${themeToCss(theme)}
    }
  `
}
