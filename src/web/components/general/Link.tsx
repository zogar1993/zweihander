import NextLink from "next/link"
import { ReactNode } from "react"

export default function Link({
	href,
	children,
	className
}: {
	href: string
	children: ReactNode,
	className?: string
}) {
	return (
		<NextLink href={href}>
			<a className={className}>{children}</a>
		</NextLink>
	)
}
