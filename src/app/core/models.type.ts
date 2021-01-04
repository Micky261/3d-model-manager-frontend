export class Models {
	constructor(
		public id: number,
		public name: string,
		public imported_name: string,
		public links: string[],
		public created_at: string,
		public updated_at: string
	) {
	}
}