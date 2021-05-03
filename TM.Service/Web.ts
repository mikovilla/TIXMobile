export default class Web implements IService{
    public Url: string = "";
    public Authentication: string = "";
    private response : string = "ss";
    
    async Read(): Promise<any> {
        return fetch(this.Url, {
            method : "GET",
            headers:{
                accept : "application/json",
            }
        })
        .then(response => response.json())
        .catch((error) => {  { return error; } });
    }

    Write(payload: string): string {
        throw new Error("Method not implemented.");
    }

}