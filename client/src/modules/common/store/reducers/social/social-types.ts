import { UserSocketConnection, UsersFound } from "../../../types/user-types";

export type SocialInitialState = {
  usersFound: UsersFound[];
  onlineFriends: UserSocketConnection[];
  friendList: []
  loading: boolean;
};
