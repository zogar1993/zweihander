import Button from "@web/components/general/Button"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"
import { Background } from "./Background"
import Dialog from "./Dialog"

export default function ConfirmationModal({
	text,
	confirmationText,
	onCancel,
	onConfirm,
	active
}: ConfirmationModalProps) {
	return (
		<Dialog active={active}>
			<Background show={active} />
			{active ? (
				<ModalCard>
					<span>{text}</span>
					<ButtonContainer>
						<Button onClick={onConfirm}>{confirmationText}</Button>
						<Button onClick={onCancel}>Cancel</Button>
					</ButtonContainer>
				</ModalCard>
			) : null}
		</Dialog>
	)
}

export type ConfirmationModalProps = {
	onCancel: () => void
	onConfirm: () => void
	confirmationText: string
	text: string
	active: boolean
}

const ModalCard = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	max-width: 80vw;
	max-height: 80vh;
	@media (max-width: 768px) {
		width: 100vw;
		height: 100vh;
		max-width: 100vw;
		max-height: 100vh;
	}
	background-color: white;
	padding: calc(${theme.spacing.separation} * 2);
	gap: calc(${theme.spacing.separation} * 2);
	border-radius: ${theme.borders.radius};
`

const ButtonContainer = styled.div`
	display: flex;
	gap: ${theme.spacing.separation};
`
