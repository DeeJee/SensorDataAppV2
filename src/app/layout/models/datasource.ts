export class Datasource{

    public image:any;
    constructor(
        public Id: number,
        public DeviceId:string,
        public ChannelId: number, 
        public Description: string,
        public DataTypeId: number){}
}
