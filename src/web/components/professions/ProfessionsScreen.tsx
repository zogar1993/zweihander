import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { Profession, Trait } from "@core/domain/Profession"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { Card } from "@web/components/card/Card"
import { CardTitle } from "@web/components/card/CardTitle"
import Grid from "@web/components/general/Grid"
import ItemsModal from "@web/components/modal/ItemsModal"
import theme from "@web/theme/theme"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import styled from "styled-components"

export default function ProfessionsScreen({ professions }: Props) {
	const router = useRouter()
	const navigate = (path?: string) => {
		const base = `/professions`
		const full_path = path ? `${base}?profession=${path}` : base
		router.push(full_path, full_path, { shallow: true })
	}

	const profession =
		professions.find(x => x.code === router.query.profession) || null
	return (
		<ItemsModal
			render={ProfessionModalContent}
			item={profession}
			items={professions}
			navigate={navigate}
		>
			{show => (
				<Grid columns={3} mobile-columns={1}>
					{professions.map(profession => (
						<ProfessionCard
							profession={profession}
							key={profession.code}
							onClick={() => show(profession)}
						/>
					))}
				</Grid>
			)}
		</ItemsModal>
	)
}

type Props = {
	professions: Array<Profession>
}

function ProfessionModalContent(item: Profession): ReactNode {
	return (
		<>
			{item.prerequisite && (
				<Property name="Prerequisite">{item.prerequisite}</Property>
			)}
			<Property name="From">{item.book}</Property>
			<Description>{item.description}</Description>
			<div>
				{item.traits.map(x => (
					<TraitCard key={x.code} trait={x} />
				))}
			</div>
			<ProfessionAdvancesGrid {...item.advances} />
		</>
	)
}

function TraitCard({ trait }: { trait: Trait }) {
	return (
		<div>
			<span>{trait.name}</span>
			<Paragraph>{trait.description}</Paragraph>
			<Property name="Effect">{trait.effect}</Property>
		</div>
	)
}

function ProfessionAdvancesGrid({
	bonus_advances,
	skill_ranks,
	talents
}: Profession["advances"]) {
	return (
		<VerticalContainer>
			<Heading>Attributes</Heading>
			{ATTRIBUTE_DEFINITIONS.map(({ code, name }) => {
				// @ts-ignore
				const value = bonus_advances.hasOwnProperty(code)
					? bonus_advances[code]
					: 0
				return (
					<Property name={name} key={code}>
						{value}
					</Property>
				)
			})}
			<Heading>Skills</Heading>
			{skill_ranks.map(code => {
				const skill = SKILL_DEFINITIONS.find(x => x.code === code)
				if (!skill) throw Error(`Skill '${code}' not found`)
				return <span key={skill.code}>{skill.name}</span>
			})}
			<Heading>Talents</Heading>
			{talents.map(rank => (
				<span key={rank}>{rank}</span>
			))}
		</VerticalContainer>
	)
}

function ProfessionCard({
	profession,
	onClick
}: {
	profession: Profession
	onClick: () => void
}) {
	return (
		<CardContainer onClick={onClick} aria-label={profession.name}>
			<CardTitle>{profession.name}</CardTitle>
			<TagContainer>
				<Tag>{profession.book}</Tag>
				<Tag>{profession.type}</Tag>
			</TagContainer>
		</CardContainer>
	)
}

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

const CardContainer = styled(Card)`
	min-width: 200px;
`

const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing.separation};
`

const Tag = styled.span`
	border: 1px solid lightgray;
	border-radius: 4px;
	padding: 3px 5px 3px 5px;
`

const Paragraph = styled.p`
	color: black;
`

const VerticalContainer = styled.p`
	display: flex;
	flex-direction: column;
`

const Heading = styled.h6`
	font-weight: bold;
`
