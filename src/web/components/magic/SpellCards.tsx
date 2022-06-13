import { Spell } from "@core/domain/Spell"
import Grid from "@web/components/general/Grid"
import SpellCard from "@web/components/magic/SpellCard"
import ItemsModal from "@web/components/modal/ItemsModal"
import theme from "@web/theme/theme"
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
			<Description>{item.description}</Description>
			<Property name="Principle">{item.principle}</Property>
			<Property name="Distance">{item.distance}</Property>
			<Property name="Reagents">{item.reagents}</Property>
			<Property name="Duration">{item.duration}</Property>
			<Property name="Effect">{item.effect}</Property>
			<Property name="Critical Success">{item.critical_success}</Property>
			<Property name="Critical Failure">{item.critical_failure}</Property>
		</>
	)
}

const Paragraph = styled.p`
	color: black;
`

const Description = styled.p`
	color: black;
	font-family: ${theme.fonts.handwritten};
	font-style: italic;
`

function Property({ name, children }: PropertyProps) {
	return (
		<Paragraph>
			<PropertyName>{name}: </PropertyName>
			{children}
		</Paragraph>
	)
}

type PropertyProps = {
	name: string
	children: ReactNode
}

const PropertyName = styled.span`
	font-family: ${theme.fonts.title};
	font-weight: bold;
	color: black;
`
