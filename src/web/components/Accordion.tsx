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
		<AccordionContainer role="menu">
			{items.map(item => (
				<AccordionItem item={item} key={item.name} />
			))}
		</AccordionContainer>
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

const AccordionItemName = styled.button`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	height: 36px;
	min-height: 36px;
	font-size: 20px;
	font-family: Almendra, serif;
	background-color: lightgray;
	user-select: none;
	cursor: pointer;
`

const AccordionItemContent = styled.div<{ open: boolean }>`
	background-color: whitesmoke;
	${({ open }) => (open ? "" : "display: none")};
	padding: ${theme.spacing.separation};
`

function AccordionItem({ item }: { item: AccordionItemType }) {
	const [open, setOpen] = useState(false)
	return (
		<div key={item.name}>
			<AccordionItemName onClick={() => setOpen(open => !open)} role="menuitem">
				{item.name}
			</AccordionItemName>
			<AccordionItemContent open={open}>{item.content}</AccordionItemContent>
		</div>
	)
}

//TODO P2 style misc accordion
//TODO P2 config SWC to replace Babel https://github.com/ixartz/Next-js-Boilerplate/issues/20
