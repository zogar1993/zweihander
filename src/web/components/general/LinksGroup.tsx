import Link from "@web/components/general/Link"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function LinksGroup<T extends Item>({
	items,
	selected,
	columns,
	path
}: ButtonsGroupProps<T>) {
	return (
		<Container columns={columns}>
			{items.map(item => (
				<ButtonItem
					key={item.code}
					href={`${path}/${item.code}`}
					selected={selected.code === item.code}
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
	items: ReadonlyArray<T>
	selected: T
	path: string
	columns: number
}

const Container = styled.div<{ columns: number }>`
	display: grid;
	grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
	border-radius: ${theme.borders.radius};
	background-color: darkgray;
	gap: 1px;
	border: 1px solid darkgray;
	overflow: hidden;
	flex-shrink: 0;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`

type ButtonProps = {
	selected?: boolean
}

const Button = styled(Link)`
	min-width: 65px;

	font-family: ${theme.fonts.common};
	font-size: 16px;
	font-weight: bold;

	text-transform: uppercase;
	text-align: center;

	display: flex;
	align-items: center;
	justify-content: center;

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

const ButtonItem = styled(Button)<ButtonProps>`
	padding: 8px calc(${theme.spacing.separation} * 2);

	background-color: ${({ selected }: ButtonProps) =>
		selected ? theme.colors.selected.primary : theme.colors.primary};
	font-family: ${theme.fonts.title};
	text-transform: capitalize;
`
