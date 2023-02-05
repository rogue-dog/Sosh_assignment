import {sign,verify,decode} from 'jsonwebtoken'
const private_key = 'OmeiwaaShinderuu@420'
export class JWT{
 public static createJwt() :string{
const time = Date.now();
const token = sign({date:time},private_key,{algorithm:'HS256',expiresIn:'6d'});
return token
}

public static verifyJwt(token:string){
    try{
    const res= verify(token,private_key);
    }
    catch {
        return false
    }
    return true;
}
}