import JWT from 'jsonwebtoken';

interface IJwtPayload {
  _id: string;
  email: string;
  name: string;
  roles: string[];
}
 
class JwtProvider {
  public async generateJwt(payload: IJwtPayload) {
    const token = JWT.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1d'
    });

    return token;
  }
  public async generateRefreshToken(payload: IJwtPayload) {
    const refreshToken = JWT.sign(payload, process.env.RT_SECRET as string, {
      expiresIn: '7d'
    });

    return refreshToken;
  }
  public async verifyRT(token: string) {
    const decodedRU = JWT.verify(token, process.env.RT_SECRET as string) as UserPayload;

    return decodedRU;
  }
  public async verifyJwt(token: string) {
    const decodedUser = JWT.verify(token, process.env.JWT_SECRET as string) as UserPayload;

    return decodedUser;
  }
}
export const jwtProvider = new JwtProvider();
