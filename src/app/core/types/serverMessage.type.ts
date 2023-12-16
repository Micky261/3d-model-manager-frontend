export class ServerMessage {
    constructor(
        public message: string,
        public messageCode: string,
        public modelId?: number,
        public additionalInformation?: string[],
    ) {
    }
}
