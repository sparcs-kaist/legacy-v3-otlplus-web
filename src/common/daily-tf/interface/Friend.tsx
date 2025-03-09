import UserProfile from './User';

export default interface Friend {
  id: number; // friend_friend.id
  user_profile: UserProfile;
  begin: Date;
  isFavorite: boolean; //즐겨찾기
}
