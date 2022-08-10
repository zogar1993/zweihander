import {defineConfig} from "cypress"

const encrypt = require("cypress-nextjs-auth0/encrypt")

export default defineConfig({
	video: false,
	port: 3001,
	e2e: {
		baseUrl: "http://localhost:3000",
		setupNodeEvents(on, config) {
			on("task", {encrypt})
		}
	},
})
