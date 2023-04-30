export interface IBcryptProvider {
    securePassword(password: string): Promise<any>;
    checkPasswordAuthenticity(reqPassword: string,  hashedPassword: string): Promise<boolean>;
}