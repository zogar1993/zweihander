import CharacterSheetAncestry from "@web/components/character_sheet/bio/CharacterSheetAncestry"
import CharacterSheetProfessions from "@web/components/character_sheet/bio/CharacterSheetProfessions"
import {
	DAMAGE_CONDITIONS,
	PERIL_CONDITIONS,
	SEXES,
	SOCIAL_CLASSES,
	UPBRINGINGS
} from "@web/components/character_sheet/bio/Constants"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { Avatar, Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetBio() {
	const { character, orderAlignments, chaosAlignments } =
		useCharacterSheetState()
		
	const dispatch = useCharacterSheetDispatcher()
	return (
		<Bio>
			<AvatarContainer>
				<Avatar
					src={character.avatar || "/characters/bandit.png"}
					alt="Avatar"
					onChange={(avatar, thumbnail) =>
						dispatch({
							type: ActionType.SetAvatar,
							payload: { avatar, thumbnail }
						})
					}
				/>
				<FlexColumn>
					<Field
						label="Name"
						value={character.name}
						onBlur={value =>
							dispatch({ type: ActionType.SetName, payload: value })
						}
					/>
					<SexAgeContainer>
						<Field
							type="combobox"
							label="Sex"
							options={SEXES}
							value={character.sex}
							onChange={value =>
								dispatch({ type: ActionType.SetSex, payload: value })
							}
						/>
						<Field
							type="number"
							label="Age"
							value={character.age}
							min={0}
							onBlur={value =>
								dispatch({ type: ActionType.SetAge, payload: value })
							}
						/>
					</SexAgeContainer>
					<Field
						type="combobox"
						label="Social Class"
						options={SOCIAL_CLASSES}
						value={character.social_class}
						onChange={value =>
							dispatch({ type: ActionType.SetSocialClass, payload: value })
						}
					/>
				</FlexColumn>
			</AvatarContainer>
			<Field
				type="combobox"
				label="Upbringing"
				options={UPBRINGINGS}
				value={character.upbringing}
				onChange={value =>
					dispatch({ type: ActionType.SetUpbringing, payload: value })
				}
			/>
			<CharacterSheetAncestry />
			<CharacterSheetProfessions />
			<TwoColumns>
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
				<Field
					type="combobox"
					label="Peril Condition"
					options={PERIL_CONDITIONS}
					value={character.peril.value}
					onChange={value =>
						dispatch({ type: ActionType.SetPerilCondition, payload: value })
					}
					unclearable
				/>
				<Field
					type="combobox"
					label="Damage Condition"
					options={DAMAGE_CONDITIONS}
					value={character.damage.value}
					onChange={value =>
						dispatch({ type: ActionType.SetDamageCondition, payload: value })
					}
					unclearable
				/>
			</TwoColumns>
		</Bio>
	)
}

const AvatarContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${theme.spacing.separation};
`

const FlexColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

const SexAgeContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 40px;
	gap: ${theme.spacing.separation};
`

const Bio = styled.div`
	grid-area: bio;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

const TwoColumns = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${theme.spacing.separation};

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`
