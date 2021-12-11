import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function ButtonsGroup<T extends Item>(
	props: ButtonsGroupProps<T>
) {
	const { items, selected, onChange } = props
	const columns = 5
	return (
		<Container columns={columns}>
			{items.map((item, index) => (
				<ButtonItem
					key={item.code}
					onClick={() => onChange(item)}
					active={selected.code === item.code}
					has-buttons-top={index >= columns}
					has-buttons-right={index % columns !== columns - 1}
					has-buttons-bottom={index <= items.length - columns - 1}
					has-buttons-left={index % columns !== 0}
				>
					{item.name}
				</ButtonItem>
			))}
		</Container>
	)
}

type Item = {
	name: string
	code: string
}

type ButtonsGroupProps<T extends Item> = {
	items: Array<T>
	selected: T
	onChange: (item: T) => void
}

const SIDE_PADDING = "8px"
const ACTIVE_BACKGROUND_COLOR = "#EAEAEA"

const backGroundColor = ({ active }: Props) =>
	active ? ACTIVE_BACKGROUND_COLOR : NOT_ACTIVE_BACKGROUND_COLOR

//const padding = ({ small, large }: Props) => {
//	if (small) return "2px"
//	if (large) return "8px"
//	return "4px"
//}

const Container = styled.div<{ columns: number }>`
	display: grid;
	grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
`

interface Props {
	active?: boolean

	vertical?: boolean

	"has-buttons-top"?: boolean
	"has-buttons-right"?: boolean
	"has-buttons-bottom"?: boolean
	"has-buttons-left"?: boolean
}

//TODO style buttons correctly
//TODO refactor buttons

const NOT_ACTIVE_BACKGROUND_COLOR = "white"

export type ButtonProps = {
	size?: "small" | "medium" | "large"
	disabled?: boolean
	onClick: (e?: any) => void
	children: string
}

const Button = styled.button<ButtonProps>`
	min-width: 65px;

	padding: 8px 8px;

	background-color: ${NOT_ACTIVE_BACKGROUND_COLOR};
	font-family: ${theme.fonts.common};
	font-size: 16px;
	font-weight: bold;
	text-transform: uppercase;

	border-radius: ${theme.borders.radius};

	border-width: 1px;
	border-style: solid;

	color: ${theme.colors.text};
	border-color: ${theme.colors.text};
	background-color: ${theme.colors.primary};

	:hover:not(:disabled) {
		color: ${theme.colors.hovers.text};
		border-color: ${theme.colors.hovers.text};
		background-color: ${theme.colors.hovers.primary};
	}

	:active:not(:disabled) {
		color: ${theme.colors.actives.text};
		border-color: ${theme.colors.actives.text};
		background-color: ${theme.colors.actives.primary};
	}

	:disabled {
		color: ${theme.colors.disabled.text};
		border-color: ${theme.colors.disabled.text};
		background-color: ${theme.colors.disabled.primary};
		cursor: not-allowed;
	}
`

const ButtonItem = styled(Button)<Props>`
	border: 1px solid darkgray;
	min-width: 65px;
	position: relative;

	padding: 8px ${SIDE_PADDING};

	background-color: ${backGroundColor};
	color: black;
	font-family: ${theme.fonts.title};
	text-transform: capitalize;

	border-bottom-style: ${props =>
		props["has-buttons-bottom"] ? "none" : "solid"};
	border-right-style: ${props =>
		props["has-buttons-right"] ? "none" : "solid"};

	border-top-left-radius: ${props =>
		props["has-buttons-top"] || props["has-buttons-left"]
			? 0
			: theme.borders.radius};
	border-top-right-radius: ${props =>
		props["has-buttons-top"] || props["has-buttons-right"]
			? 0
			: theme.borders.radius};
	border-bottom-left-radius: ${props =>
		props["has-buttons-bottom"] || props["has-buttons-left"]
			? 0
			: theme.borders.radius};
	border-bottom-right-radius: ${props =>
		props["has-buttons-bottom"] || props["has-buttons-right"]
			? 0
			: theme.borders.radius};
`

//TODO check visibility of exports
