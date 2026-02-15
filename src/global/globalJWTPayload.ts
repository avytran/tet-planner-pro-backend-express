/* eslint-disable @typescript-eslint/no-namespace */
import { TokenPayload } from '../types/tokenPayload';

export { };

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
} 