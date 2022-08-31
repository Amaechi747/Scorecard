interface IAdmin{
    _id?: any | unknown;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    stack: string;
}
interface IAdminPasswordUpdate {
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

interface IDecadev{
    _id?: any | unknown;
    firstName: string | unknown;
    lastName: string | unknown;
    email: string | unknown;
    password: string | unknown;
    stack: string | unknown;
}
interface IPasswordUpdate{
    newPassword: string;
    confirmPassword: string;
}
interface IDecadevUpdate{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
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

interface IWeeklyScore {
    algorithm: number;
    agileTest: number;
    weeklyTask: number;
    assessment: number;
    cummulative?: number;
}



interface Idata {
    email: string;
    password: string
}

interface Iuser {
    firstName: string;
    lastName: string;
    email: string;

}

interface IStack {
    name: string;
    imageUrl: string;
    _id: string;

}