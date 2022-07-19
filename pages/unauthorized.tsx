import { useRouter } from "next/router"
import styled from "styled-components"

export default function Unauthorized() {
	const { query } = useRouter()
	const { user, contact } = query
	return (
		<Container>
			<p>
				This character sheet generator and rules compendium for ZWEIHÄNDER Grim
				& Perilous RPG is private.
			</p>
			<p>User {user} has no access.</p>
			<p>Feel free to contact {contact} if you are interested!</p>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 28px;
	font-size: 20px;
`
