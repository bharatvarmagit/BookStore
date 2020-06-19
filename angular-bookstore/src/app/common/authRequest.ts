export class AuthRequest{
  username:string;
  password:string;
  constructor(name:string,pass:string){
    this.username=name;
    this.password=pass;
  }
}
