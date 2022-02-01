import Dialog from "@web/components/modal/Dialog"
import Image from "next/image"
import React, { useContext, useState } from "react"
import styled from "styled-components"

const LoadingModalContext = React.createContext({
	setLoading: (value: boolean) => {}
})

export function useSetLoadingModal() {
	return useContext(LoadingModalContext).setLoading
}

export function LoadingModal({ children }: { children: JSX.Element }) {
	const [loading, setLoading] = useState(false)
	return (
		<LoadingModalContext.Provider value={{ setLoading }}>
			{children}
			{loading ? (
				<Dialog active={loading}>
					<Background />
					<ModalCard>
						<Image
							src="/slag_brothers.gif"
							alt="loading animation"
							width={202}
							height={256}
						/>
					</ModalCard>
				</Dialog>
			) : null}
		</LoadingModalContext.Provider>
	)
}

//TODO remove extra backgrounds
const Background = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	background-color: rgba(10, 10, 10, 0.7);
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
`
