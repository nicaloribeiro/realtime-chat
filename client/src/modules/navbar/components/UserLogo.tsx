import { generateRandomColors } from "../../common/utils/colors";

const UserProfile = () => {
  return (
    <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-[#${generateRandomColors()}] border border-border-color`}>
      L
    </div>
  );
};

export default UserProfile;
