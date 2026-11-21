export interface Ilogin {
    email : string;
    password : string;
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role: string;
}