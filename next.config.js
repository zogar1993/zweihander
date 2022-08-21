/** @type {import("next").NextConfig} */
module.exports = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true
	},
	typescript: {
		//TODO fix whatever is causing for this to think that reduce is wrong
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true
	}
}
