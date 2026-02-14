export class Register {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public invitationToken?: string,
    ) {
    }
}
