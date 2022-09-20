import { User, UserPublic } from './models/user.model';

export const toUserPublic = (user: User): UserPublic => {
  return {
    email: user.email,
    ...(user.profile || {}),
  };
};
