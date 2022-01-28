import { Z_INDEX_LEVEL } from "@web/constants/ACCORDION_ITEM"
import theme from "@web/theme/theme"
import React, { ReactNode, useEffect, useRef, useState } from "react"
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
			{items.map((item, i) => (
				<AccordionItem item={item} key={item.name} z={items.length - i} />
			))}
		</AccordionContainer>
	)
}

function AccordionItem({ item, z }: { item: AccordionItemType; z: number }) {
	const [open, setOpen] = useState(false)
	const [height, setHeight] = useState(0)
	const id = `accordion-tab-(${item.name.toLowerCase()})`

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setHeight(ref.current!.offsetHeight)
	}, [open])

	return (
		<ItemContainer key={item.name}>
			<AccordionItemTab
				onClick={() => setOpen(open => !open)}
				role="tab"
				id={id}
			>
				{item.name}
			</AccordionItemTab>
			<AccordionItemContent
				role="tabpanel"
				aria-expanded={open}
				aria-labelledby={id}
				ref={ref}
				height={height}
				z={z}
			>
				{item.content}
			</AccordionItemContent>
		</ItemContainer>
	)
}

const AccordionContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: ${theme.borders.radius};
	border: 1px gray solid;
	grid-area: misc;
	background-color: gray;
	overflow-y: auto;
	overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
    appearance: none;
    width: 6px;
  }
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
	position: relative;
	z-index: ${Z_INDEX_LEVEL.COMPONENT};
`

const AccordionItemContent = styled.div<{
	"aria-expanded": boolean
	height: number
	z: number
}>`
	background-color: whitesmoke;
	padding: ${theme.spacing.separation};
	margin-top: ${({ "aria-expanded": expanded, height }) =>
		expanded ? 0 : `-${height - 1}px`};
	transition: 0.4s ease-in-out;
	z-index: ${({ z }) => Z_INDEX_LEVEL.CONTAINER + z};
	position: relative;
	border-bottom: 1px solid gray;
`

const ItemContainer = styled.div`
	width: 100%;
`
