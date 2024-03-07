import { client } from "../config/redis.js";
import UserRepository from "../user/user-respository.js";

const handleUserConnected = async (payload) => {
  try {
    const { email, socketId } = payload;
    const user = await UserRepository.findOne({ email });
    if (!user) {
      console.log("User not found.");
      return;
    }

    const { friendList, name, _id } = user;
    const userInfo = {
      socketId,
      friends: friendList,
      email,
      name: name,
    };
    await client.set(`user:${_id.toString()}`, JSON.stringify(userInfo));
    const friendsOnline = await getFriendsOnline(friendList);

    const usersToNotify = notifyFriends({
      friendsToNotify: friendsOnline,
      userLogged: { name: user.name, email },
    });

    return {
      usersToNotify,
      friendsOnline: friendsOnline.map((friend) => ({
        email: friend.email,
        name: friend.name,
        username: friend.username,
      })),
    };
  } catch (error) {
    console.log("Error on saving cache.", error);
  }
};

const notifyFriends = (payload) => {
  const { friendsToNotify, userLogged } = payload;
  const notification = friendsToNotify.map((user) => ({
    receiverUser: user.socketId,
    notification: userLogged,
  }));
  return notification;
};

const getFriendsOnline = async (friendlist) => {
  const friendsOnline = await Promise.all(
    friendlist.map((friend) => client.get(`user:${friend}`))
  );
  return friendsOnline
    .filter((friend) => friend)
    .map((friendParsed) => JSON.parse(friendParsed));
};

const handleUserDisconnected = async (socketId) => {
  try {
    const usersOnline = await client.keys("*");
    let friendList = [];
    let userLogged = {};
    for (const users of usersOnline) {
      const user = await client.get(users);
      if (JSON.parse(user).socketId === socketId) {
        console.log("User to be removed from cache: ", user);
        const userParsed = JSON.parse(user);
        friendList = userParsed.friends;
        userLogged = { name: userParsed.name, email: userParsed.email };
        await client.del(users);
        break;
      }
    }
    const friendsOnline = await getFriendsOnline(friendList);
    const friendsToNotify = notifyFriends({
      friendsToNotify: friendsOnline,
      userLogged,
    });
    return friendsToNotify;
  } catch (error) {
    console.log(error);
  }
};

const CacheService = { handleUserConnected, handleUserDisconnected };
export default CacheService;
