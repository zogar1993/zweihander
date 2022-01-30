import { Spell } from "@core/domain/Spell"
import Grid from "@web/components/general/Grid"
import SpellCard from "@web/components/magic/SpellCard"
import ItemsModal from "@web/components/modal/ItemsModal"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import styled from "styled-components"

export default function SpellCards({ spells }: Props) {
	const router = useRouter()
	const { source, school } = router.query
	const navigate = (path?: string) => {
		const base = `/magic/${source}/${school}`
		const full_path = path ? `${base}?spell=${path}` : base
		router.push(full_path, full_path, { shallow: true })
	}

	const spell = spells.find(x => x.code === router.query.spell) || null

	return (
		<ItemsModal
			render={SpellModalContent}
			item={spell}
			items={spells}
			navigate={navigate}
		>
			{show => (
				<Grid columns={3} mobile-columns={1}>
					{spells.map(spell => (
						<SpellCard
							spell={spell}
							key={spell.code}
							onClick={() => show(spell)}
						/>
					))}
				</Grid>
			)}
		</ItemsModal>
	)
}

type Props = {
	spells: Array<Spell>
}

function SpellModalContent(item: Spell): ReactNode {
	return (
		<>
			<Paragraph handwritten italic>
				{item.description}
			</Paragraph>
			<Property font="Almendra" name="Principle">
				{item.principle}
			</Property>
			<Property font="Almendra" name="Distance">
				{item.distance}
			</Property>
			<Property font="Almendra" name="Reagents">
				{item.reagents}
			</Property>
			<Property font="Almendra" name="Duration">
				{item.duration}
			</Property>
			<Property font="Almendra" name="Effect">
				{item.effect}
			</Property>
			<Property font="Almendra" name="Critical Success">
				{item.critical_success}
			</Property>
			<Property font="Almendra" name="Critical Failure">
				{item.critical_failure}
			</Property>
		</>
	)
}

const Paragraph = styled.p<ParagraphProps>`
	font-weight: ${props => (props.bold ? "bold" : "none")};
	font-style: ${props => (props.italic ? "italic" : "none")};
	font-size: ${props => (props.small ? "small" : "medium")};
	color: black;
`

type ParagraphProps = {
	font?: string
	handwritten?: boolean
	small?: boolean
	italic?: boolean
	bold?: boolean
}

function Property({ name, font, small, children }: PropertyProps) {
	return (
		<Paragraph small={small} font={font}>
			<PropertyName small={small} font={font}>
				{name}:{" "}
			</PropertyName>
			{children}
		</Paragraph>
	)
}

type PropertyProps = {
	name: string
	font?: string
	children: ReactNode
	small?: boolean
}

const PropertyName = styled.span<SpanProps>`
	font-family: ${({ font }) => (font ? `${font}, ` : "")}Times, serif;
	font-weight: bold;
	font-size: ${props => size(props)};
	color: black;
`

type SpanProps = {
	font?: string
	small?: boolean
}

function size(props: SpanProps) {
	if (props.small) return "12px"
	return undefined
}
