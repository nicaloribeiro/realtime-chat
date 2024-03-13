import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import {
  MdOutlineChat,
  MdOutlinePersonRemove,
  MdBlock,
  MdPersonAddDisabled,
  MdPersonAdd,
} from "react-icons/md";
import { Avatar, Spin, Tooltip } from "antd";
import { AppDispatch } from "../../common/store";
import { useDispatch } from "react-redux";
import { searchUsers } from "../../common/store/reducers/social/social-reducer";
import { useSelector } from "react-redux";
import { RootState } from "../../common/store/reducers";
import { SocialInitialState } from "../../common/store/reducers/social/social-types";

const SearchUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const social = useSelector<RootState, SocialInitialState>(
    ({ social }) => social
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const findUsersByName = debounce(async (name: string) => {
    if (name.length > 2) {
      await dispatch(searchUsers(name));
      setIsModalOpen(true);
    }
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setSearchTerm(name);
    findUsersByName(name);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-12 flex flex-col items-center justify-center w-full relative">
      <div className="w-full p-3 my-2 mx-0 focus:border-highlight border border-none flex items-center justify-start bg-[#3A3D3F]">
        <input
          ref={inputRef}
          className="w-full placeholder:italic placeholder:text-slate-400 focus:outline-none bg-transparent p-0"
          placeholder="Find friends"
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => social.usersFound.length > 0 && setIsModalOpen(true)}
        />
        {social.loading && <Spin size="small" />}
      </div>

      {isModalOpen && (
        <div
          className="w-full absolute max-h-96 top-full overflow-y-auto"
          ref={dropdownRef}
        >
          {social.hasSearched && social.usersFound.length === 0 && (
            <div className="bg-gray-900 p-4 w-full text-center">
              Users not found.
            </div>
          )}
          {social.usersFound.map((user, index) => (
            <div
              key={`${user.email}-${index}`}
              className={`${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
              } p-4 hover:brightness-90 grid grid-cols-12`}
            >
              <div className="flex items-center col-span-8 space-x-2">
                <Avatar>{user.name[0]}</Avatar>
                <span>
                  {user.name} ({`@${user.username}`}) - {user.email}
                </span>
              </div>
              <div className="flex space-x-4 items-center col-span-4 justify-end">
                {user.isFriend && (
                  <Tooltip
                    title="Send message"
                    className="hover:cursor-pointer hover:text-success"
                  >
                    <MdOutlineChat size={20} />
                  </Tooltip>
                )}
                {user.isFriend && (
                  <Tooltip
                    title="Remove friend"
                    className="hover:cursor-pointer hover:text-warning"
                  >
                    <MdOutlinePersonRemove size={20} />
                  </Tooltip>
                )}

                {user.friendRequestSent && (
                  <Tooltip
                    title="Cancel invite"
                    className="hover:cursor-pointer hover:text-warning"
                  >
                    <MdPersonAddDisabled size={20} />
                  </Tooltip>
                )}
                {!user.friendRequestSent && !user.isFriend && (
                  <Tooltip
                    title="Send invite request"
                    className="hover:cursor-pointer hover:text-success"
                  >
                    <MdPersonAdd size={20} />
                  </Tooltip>
                )}
                <Tooltip
                  title="Block user"
                  className="hover:cursor-pointer hover:text-warning"
                >
                  <MdBlock size={20} />
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
