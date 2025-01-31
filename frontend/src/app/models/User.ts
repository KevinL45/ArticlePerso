export class User {
    id?: number;
    email?: string;
    password?: string;
    pseudo?: string;

    constructor(email?: string, password?: string, pseudo?: string, id?: number) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.pseudo = pseudo;
    }
}
