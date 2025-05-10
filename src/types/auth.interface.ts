import { I_CreateUser } from './user.interface';

export interface I_Auth_Verify {
    email: string;
    code: string;
    createUserDto: I_CreateUser;
}
