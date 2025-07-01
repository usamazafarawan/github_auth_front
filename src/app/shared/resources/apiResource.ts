export class environment {
    static BaseApi='http://localhost:3000/api/v1';
}


export class ApiUrl {
    static adminLogInApi = `${environment.BaseApi}/auth/login`;


     static githubLogOutApi = `${environment.BaseApi}/auth/logout`;

}