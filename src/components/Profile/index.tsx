import React, { useCallback, useState } from "react";
import { IoPerson } from "react-icons/io5";

interface Props {
  setHasAccount: (hasAccount: boolean) => void;
}

const Profile = (props: Props) => {
  const { setHasAccount } = props;

  const [isHover, setIsHover] = useState<null | boolean>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  const handleRemoveAccount = useCallback(() => {
    localStorage.removeItem("account");
    setHasAccount(false);
  }, [setHasAccount]);

  return (
    <div
      className="flex h-fit items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHover && (
        <p
          className="bg-red-500 p-1 px-4 text-white mr-4 rounded-xl cursor-pointer"
          onClick={handleRemoveAccount}
        >
          Remove account
        </p>
      )}

      <IoPerson color={"white"} size={32} />
    </div>
  );
};

export default Profile;
