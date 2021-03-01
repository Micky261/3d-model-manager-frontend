export class ServerMessage {
    constructor(
        public message: string,
        public message_code: string,
        public model_id?: number,
        public additional_information?: string[],
    ) {
    }
}
