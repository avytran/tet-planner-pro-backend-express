import { JWTPayload } from "./tokenPayload";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export {};
