interface IAdmin{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    stack: string;
}

interface IAdminPasswordUpdate {
    password: string;
    newPassword: string;
    confirmPassword: string;
}
interface IAdminUpdate{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    stack?: string;
}

interface ILogin {
    email: string;
    password: string;
}

interface Stack {
    name: string;
    imageUrl: string;
}