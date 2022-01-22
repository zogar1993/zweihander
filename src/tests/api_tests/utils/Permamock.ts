export function permamock(path: string, return_value: any) {
	const spy = jest.spyOn(require(path), "default")
	spy.mockReturnValue(Promise.resolve(return_value))
}
