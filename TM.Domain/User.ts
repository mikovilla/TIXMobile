interface Credential{
    Username : string;
    Password : string;
}

interface User extends Credential{
    PasswordIat : string;
    FirstName : string;
    LastName : string;
}