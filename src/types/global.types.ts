import { type GuestDocument } from '../types/guest.types.js';

declare global {
  namespace Express {
    interface Request {
      user: GuestDocument;
    }
  }
}
