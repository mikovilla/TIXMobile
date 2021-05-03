interface IUser{
    GetUser(id : number) : User;
    GetUser(username : string) : User;
    GetUser(username : string, password : string) : User;
    GetLocks(username : string) : Lock[];
}