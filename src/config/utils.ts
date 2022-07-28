import * as bcrypt from "bcrypt";

export default function checkIfUnencryptedPasswordIsValid(value: string,password:string) {
    return bcrypt.compareSync(value, password);
  }