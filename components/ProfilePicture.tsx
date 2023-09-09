import React from 'react';
import Image from '@node_modules/next/image';

interface IProfilePicture {
  setToggleDropdown: ((state: any) => void),
  image: string
}

const ProfilePicture = (props: IProfilePicture) => {
  const { image, setToggleDropdown } = props;
  return (
    <Image
      src={image}
      alt="profile"
      width={35}
      height={35}
      onClick={() => setToggleDropdown((prev) => !prev)}
      className="rounded-full"
    />
  );
};

export default ProfilePicture;
