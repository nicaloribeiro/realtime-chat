import { Dropdown, MenuProps } from "antd";
import Logout from "../../common/components/Logout";

type UserProfileProps = {
  user: string;
  children?: React.ReactNode;
};
const UserProfile = ({ user }: UserProfileProps) => {
  const items: MenuProps["items"] = [
    {
      label: user,
      key: "username",
    },
    {
      label: <a>Profile</a>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      danger: true,
      label: <Logout />,
      key: "3",
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      className="hover:cursor-pointer"
      placement="bottom"
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dark-bg border border-border-color">
        <a onClick={(e) => e.preventDefault()}>
          <span className="select-none">{user[0]}</span>
        </a>
      </div>
    </Dropdown>
  );
};

export default UserProfile;
