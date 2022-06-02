interface User {
  confirm: boolean;
  email: string;
  google: boolean;
  img?: string;
  name: string;
  role: string;
  state: boolean;
  shopping_cart?: string[];
  token?: string;
}

declare namespace Express {
  export interface Request {
    authUser?: User;
    uid?: string;
    files?: Any;
  }
}
