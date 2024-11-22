import React from "react";
type Props = { children: React.ReactNode };
const BattleBackgroundImage = ({ children }: Props) => {
  return (
    <div className='bg-[url("./public/images/bgDesert.png")] absolute w-full h-full bg-no-repeat bg-cover bg-center flex flex-col justify-center '>
      {children}
    </div>
  );
};

export default BattleBackgroundImage;
