import { useState } from "react";
import { debounce } from "lodash";
import Input from "../../common/components/Input";
import UserService from "../../common/services/user-service";
import { UsersFound } from "../../common/types/user-types";
import {
  MdOutlineChat,
  MdOutlinePersonRemove,
  MdBlock,
  MdPersonAddDisabled,
  MdPersonAdd
} from "react-icons/md";
import { Tooltip } from "antd";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [usersFound, setUsersFound] = useState<UsersFound[]>([]);

  const findUsersByName = debounce(async (name: string) => {
    if (name.length > 3) {
      const user = await UserService.findUser(name);
      setUsersFound(user);
    }
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setSearchTerm(name);
    findUsersByName(name);
  };

  return (
    <div className="h-12 flex flex-col items-center justify-center w-full relative">
      <Input
        rounded="0"
        placeholder="Find friends"
        value={searchTerm}
        onChange={handleChange}
      />
      {usersFound.length > 0 && (
        <div className="w-full absolute h-auto max-h-1/3 top-full overflow-y-auto flex flex-col-reverse">
          {usersFound.map((user, index) => (
            <div
              key={`${user.email}-${index}`}
              className={`${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
              } p-4 hover:brightness-90 grid grid-cols-12`}
            >
              <div className="flex items-center col-span-6">
                {user.name} - {user.email}
              </div>
              <div className="flex space-x-4 items-center col-span-6 justify-end">
                <span>
                  {user.isFriend && (
                    <Tooltip
                      title="Send message"
                      className="hover:cursor-pointer hover:text-success"
                    >
                      <MdOutlineChat size={20} />
                    </Tooltip>
                  )}
                </span>
                <span>
                  {user.isFriend && (
                    <Tooltip
                      title="Remove friend"
                      className="hover:cursor-pointer hover:text-warning"
                    >
                      <MdOutlinePersonRemove size={20} />
                    </Tooltip>
                  )}
                </span>
                <span>
                  <Tooltip
                    title="Block user"
                    className="hover:cursor-pointer hover:text-warning"
                  >
                    <MdBlock size={20} />
                  </Tooltip>
                </span>
                <span>
                  {user.friendRequestSent && (
                    <Tooltip
                      title="Cancel invite"
                      className="hover:cursor-pointer hover:text-warning"
                    >
                      <MdPersonAddDisabled size={20} />
                    </Tooltip>
                  )}
                </span>
                <span>
                  {!user.friendRequestSent && !user.isFriend && (
                    <Tooltip
                      title="Send invite request"
                      className="hover:cursor-pointer hover:text-success"
                    >
                      <MdPersonAdd size={20} />
                    </Tooltip>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
