import { withPageAuthRequired } from "@auth0/nextjs-auth0"

export default withPageAuthRequired(() => {
	return <img src="party.jpg" alt="pc party" />
})
