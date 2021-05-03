interface IService{
    Url : string;
    Authentication : string;
    Read() : Promise<any>;
    Write(payload : string) : string;
}