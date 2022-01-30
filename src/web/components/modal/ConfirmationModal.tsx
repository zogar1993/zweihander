import Button from "@web/components/general/Button"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"
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
					{text}
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

const Background = styled.div<{ show: boolean }>`
	position: absolute;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	background-color: rgba(10, 10, 10, 0.86);
	opacity: ${({ show }) => (show ? 1 : 0)};
	transition: ${({ show }) => (show ? "ease-out" : "ease-in")} 0.4s;
`

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
`

const ButtonContainer = styled.div`
	display: flex;
	gap: ${theme.spacing.separation};
`
