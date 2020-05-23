export class NotificationModel {
    constructor(public Id: number,
        public deviceId: string,
        public logLevel: string,
        public text: string,
        public created: Date) { }
}