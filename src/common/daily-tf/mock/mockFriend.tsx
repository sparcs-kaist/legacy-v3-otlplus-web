import Friend from '../interface/Friend';
import { userProfiles } from './mockUserProfile';

export const friends: Friend[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  user_profile: userProfiles[i],
  begin: new Date(2024, 0, i + 1), // 2024-01-01, 02, ...
  isFavorite: i % 2 === 0,
}));
