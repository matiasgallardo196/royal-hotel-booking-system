interface IUser{
    id:number,
    name:string,
    email:string,
    birthdate:Date,
    nDni:number,
    credentialsId:number
    file:string|null
}
 
export default IUser