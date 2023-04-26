export class UserEntity {
    public name: String;
    public cpf: String;
    public email: String;
    public password: String;

    constructor(props: UserEntity) {
        Object.assign(this, props);
    }
}