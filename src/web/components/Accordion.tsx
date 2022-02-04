import { Z_INDEX_LEVEL } from "@web/constants/ACCORDION_ITEM"
import theme from "@web/theme/theme"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import styled from "styled-components"

export type AccordionItemType = {
	name: string
	content: ReactNode
	hide?: boolean
}
//TODO Fix issue with scrolling
export default function Accordion({ items, disabled }: AccordionProps) {
	return (
		<AccordionContainer role="tablist">
			{[...items]
				.reverse()
				.filter(x => !x.hide)
				.map((item, i) => (
					<AccordionItem
						item={item}
						key={item.name}
						z={items.length - i}
						disabled={disabled}
					/>
				))}
		</AccordionContainer>
	)
}

function AccordionItem({
	item,
	z,
	disabled
}: {
	item: AccordionItemType
	z: number
	disabled: boolean
}) {
	const [open, setOpen] = useState(false)
	const [initialized, setInitialized] = useState(false)
	const [height, setHeight] = useState<number>(0)
	const id = `accordion-tab-(${item.name.toLowerCase()})`

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (open) setInitialized(true)
		setHeight(ref.current!.offsetHeight)
	}, [open])

	return (
		<ItemContainer key={item.name}>
			<AccordionItemTab
				onClick={() => setOpen(open => !open)}
				role="tab"
				id={id}
				disabled={disabled}
			>
				{item.name}
			</AccordionItemTab>
			<AccordionItemContent
				role="tabpanel"
				aria-expanded={open}
				aria-labelledby={id}
				ref={ref}
				$height={height}
				initialized={initialized}
				$z={z}
			>
				{item.content}
			</AccordionItemContent>
			<ItemDelimiter />
		</ItemContainer>
	)
}

const AccordionContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: column-reverse;
	justify-content: flex-end;
	border-radius: ${theme.borders.radius};
	border: 1px gray solid;
	grid-area: misc;
	background-color: gray;
	overflow-y: auto;
	overflow-x: hidden;
	isolation: isolate;

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
	z-index: ${Z_INDEX_LEVEL.MENU};

	${({ disabled }) => (disabled ? "cursor: wait" : "")};
`

const AccordionItemContent = styled.div<{
	"aria-expanded": boolean
	$height: number
	initialized: boolean
	$z: number
}>`
	background-color: whitesmoke;
	padding: ${theme.spacing.separation};
	margin-top: ${({ "aria-expanded": expanded, $height }) =>
		expanded ? 0 : `-${$height}px`};
	transition: 0.2s ease-out margin-top;
	position: ${({ initialized }) => (initialized ? "relative" : "absolute")};
	opacity: ${({ initialized }) => (initialized ? 1 : 0)};
`

const ItemContainer = styled.div`
	width: 100%;

	//this makes the last delimiter disappear
	:first-child > :last-child {
		display: none;
	}
`

const ItemDelimiter = styled.div`
	position: relative;
	z-index: ${Z_INDEX_LEVEL.MENU};
	border-bottom: 1px solid gray;
`

export type AccordionProps = {
	items: Array<AccordionItemType>
	disabled: boolean
}
