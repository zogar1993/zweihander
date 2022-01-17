import theme from "@web/theme/theme"
import React, { ReactNode, useState } from "react"
import styled from "styled-components"

export type AccordionItemType = {
	name: string
	content: ReactNode
}

export default function Accordion({
	items
}: {
	items: Array<AccordionItemType>
}) {
	return (
		<AccordionContainer role="tablist">
			{items.map(item => (
				<AccordionItem item={item} key={item.name} />
			))}
		</AccordionContainer>
	)
}

function AccordionItem({ item }: { item: AccordionItemType }) {
	const [open, setOpen] = useState(false)
	return (
		<ItemContainer key={item.name}>
			<AccordionItemTab onClick={() => setOpen(open => !open)} role="tab">
				{item.name}
			</AccordionItemTab>
			<AccordionItemContent role="tabpanel" open={open}>
				{item.content}
			</AccordionItemContent>
		</ItemContainer>
	)
}

const AccordionContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1px;
	border-radius: ${theme.borders.radius};
	border: 1px gray solid;
	grid-area: misc;
	background-color: gray;
	overflow-y: auto;
	overflow-x: hidden;
`

const AccordionItemTab = styled.button`
	width: 100%;
	text-align: center;
	height: 36px;
	min-height: 36px;
	font-size: 20px;
	font-family: ${theme.fonts.stylish};
	background-color: lightgray;
	user-select: none;
	cursor: pointer;
`

const AccordionItemContent = styled.div<{ open: boolean }>`
	background-color: whitesmoke;
	${({ open }) => (open ? "" : "display: none")};
	padding: ${theme.spacing.separation};
`

const ItemContainer = styled.div`
	width: 100%;
`

//TODO P0 style misc accordion
