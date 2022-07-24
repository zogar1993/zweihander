import { CharacterTier } from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { CheckButton } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetTier({
	name,
	tier
}: {
	name: string
	tier: CharacterTier | null
}) {
	if (tier === null) return null

	return (
		<Container>
			<Title>{name} Tier</Title>
			<Title>Profession</Title>
			<CheckButton text={tier.profession.name} checked={false} />
			<Title>Attributes</Title>
			<WeaGrid columns={2}>
				{tier.attributes.map(x => (
					<CheckButton text={x.code} checked={x.checked} />
				))}
			</WeaGrid>
			<Title>Skills</Title>
			<WeaGrid columns={2}>
				{tier.skills.map(x => (
					<CheckButton text={x.code} checked={x.checked} />
				))}
			</WeaGrid>
			<Title>Talents</Title>
			{tier.talents.map(x => (
				<CheckButton text={x.code} checked={x.checked} />
			))}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
	border: ${theme.spacing.separation} solid ${theme.colors.border};
	padding: ${theme.spacing.padding};
	border-radius: ${theme.borders.radius};
	align-items: center;
`

const Title = styled.span`
	padding: ${theme.spacing.separation};
	font-size: 20px;
`

const WeaGrid = styled(Grid)`
	width: 100%;
`
