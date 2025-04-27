interface UserPayload {
  _id: string;
  name: string;
  email: string;
  roles: string[];
}

declare namespace Express {
  export interface Request {
    currentUser: UserPayload;
  }
  export interface Response {
    currentUser: UserPayload;
  }
}
