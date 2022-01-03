import { getByCode } from "@core/domain/general/GetByCode"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

export default function CharacterSheetBio() {
	const {
		character,
		professions,
		archetypes,
		ancestries,
		orderAlignments,
		chaosAlignments
	} = useCharacterSheetState()

	const dispatch = useCharacterSheetDispatcher()
//TODO do avatar
	return (
		<Bio>
			<Field label="Name" value={character.name} onBlur={value =>
				dispatch({ type: ActionType.SetName, payload: value })} />
			<AvatarContainer>
				<Avatar
					src={character.avatar || "/character/bandit.png"}
					alt="Avatar"
					width={143}
					height={143}
				/>
				<FlexColumn>
					<Field
						type="number"
						label="Age"
						value={character.age}
						min={0}
						onBlur={value =>
							dispatch({ type: ActionType.SetAge, payload: value })
						}
					/>
					<Field
						type="combobox"
						label="Sex"
						options={sexes}
						value={character.sex}
						onChange={value =>
							dispatch({ type: ActionType.SetSex, payload: value })
						}
					/>
					<Field
						type="combobox"
						label="Social Class"
						options={socialClasses}
						value={character.social_class}
						onChange={value =>
							dispatch({ type: ActionType.SetSocialClass, payload: value })
						}
					/>
				</FlexColumn>
			</AvatarContainer>
			<Grid columns={1}>
				<Field
					type="combobox"
					label="Upbringing"
					options={upbringings}
					value={character.upbringing}
					onChange={value =>
						dispatch({ type: ActionType.SetUpbringing, payload: value })
					}
				/>
				<ProfessionContainer>
					<Field
						type="combobox"
						label="Ancestry"
						options={ancestries}
						value={character.ancestry}
						onChange={value =>
							dispatch({ type: ActionType.SetAncestry, payload: value })
						}
					/>
					{character.ancestry && (
						<Field
							type="combobox"
							label="Ancestry Trait"
							options={getByCode(character.ancestry, ancestries).traits} //TODO may be moved to reducer
							value={character.ancestry_trait}
							onChange={value =>
								dispatch({ type: ActionType.SetAncestryTrait, payload: value })
							}
						/>
					)}
					<Field
						type="combobox"
						label="Archetype"
						options={archetypes}
						value={character.archetype}
						disabled={character.profession1 !== null}
						onChange={value =>
							dispatch({ type: ActionType.SetArchetype, payload: value })
						}
					/>
					<Field
						type="combobox"
						label="Profession 1"
						options={[]}
						value={character.profession1}
						disabled={character.profession2 !== null}
						onChange={value =>
							dispatch({ type: ActionType.SetProfession1, payload: value })
						}
					/>
					{character.profession1 && (
						<Field
							type="combobox"
							label="Profession 2"
							options={professions}
							value={character.profession2}
							disabled={character.profession3 !== null}
							onChange={value =>
								dispatch({ type: ActionType.SetProfession2, payload: value })
							}
						/>
					)}
					{character.profession2 && (
						<Field
							type="combobox"
							label="Profession 3"
							options={professions}
							value={character.profession3}
							onChange={value =>
								dispatch({ type: ActionType.SetProfession3, payload: value })
							}
						/>
					)}
				</ProfessionContainer>
				<Field
					type="combobox"
					label="Order Alignment"
					options={orderAlignments}
					value={character.order_alignment}
					onChange={value =>
						dispatch({ type: ActionType.SetOrderAlignment, payload: value })
					}
				/>
				<Field
					type="combobox"
					label="Chaos Alignment"
					options={chaosAlignments}
					value={character.chaos_alignment}
					onChange={value =>
						dispatch({ type: ActionType.SetChaosAlignment, payload: value })
					}
				/>
			</Grid>
		</Bio>
	)
}

const Avatar = styled(Image)`
	border-radius: ${theme.borders.radius};
	width: 143px;
	height: 143px;
`

const AvatarContainer = styled.div`
	display: grid;
	grid-template-columns: 143px 1fr;
	gap: ${theme.spacing.separation};
`

const ProfessionContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${theme.spacing.separation};
`

const FlexColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

const Bio = styled.div`
	grid-area: bio;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

const sexes = [
	{ name: "Male", code: "male" },
	{ name: "Female", code: "female" },
	{ name: "Other", code: "other" }
]
//TODO fix combo without options
const socialClasses = [
	{ name: "Lowborn", code: "lowborn" },
	{ name: "Bourgeois", code: "bourgeois" },
	{ name: "Aristocrat", code: "aristocrat" }
]

export const upbringings = [
	{
		code: "cultured",
		name: "Cultured (Fellowship)",
		from: 1,
		to: 14,
		attribute: "fellowship"
	},
	{
		code: "forgotten",
		name: "Forgotten (Agility)",
		from: 15,
		to: 29,
		attribute: "agility"
	},
	{
		code: "industrious",
		name: "Industrious (Brawn)",
		from: 30,
		to: 44,
		attribute: "brawn"
	},
	{
		code: "militant",
		name: "Militant (Combat)",
		from: 45,
		to: 59,
		attribute: "combat"
	},
	{
		code: "opportunistic",
		name: "Opportunistic (Perception)",
		from: 60,
		to: 74,
		attribute: "perception"
	},
	{
		code: "reverent",
		name: "Reverent (Willpower)",
		from: 75,
		to: 89,
		attribute: "willpower"
	},
	{
		code: "scholastic",
		name: "Scholastic (Intelligence)",
		from: 90,
		to: 100,
		attribute: "intelligence"
	}
]

function CharacterSheetProfessions() {
	//TODO reenact
	//const [firstProfessions, setFirstProfessions] = useState<Array<Profession>>(
	//	[]
	//)
	//useEffectAsync(async () => {
	//	if (archetype === undefined) return
	//	const basics = await provider.getBasicProfessions(archetype)
	//	setFirstProfessions(basics)
	//}, [archetype, provider])

	return <></>
}

function CharacterSheetAncestry() {
	//TODO sometime some day
	//const ancestryTraits = useStateEffect(async () => {
	//	if (ancestry === null) return []
	//	if (ancestry === undefined) return
	//	return (await provider.getAncestry(ancestry)).traits
	//}, [ancestry, provider])

	return <></>
}

function useStateEffect<T extends ValidT>(
	getValue: () => Promise<T> | T,
	dependencies: any[]
): T | undefined {
	const [value, setValue] = useState<T>()
	useEffect(() => {
		const result = getValue()
		if (isPromise(result)) (async () => setValue(await result))()
		else setValue(result)
	}, dependencies)
	return value
}

type ValidT = object | undefined

function isPromise<T extends ValidT>(
	result: Promise<T> | T
): result is Promise<T> {
	if (result === undefined) return false
	return "then" in (result as object)
}
