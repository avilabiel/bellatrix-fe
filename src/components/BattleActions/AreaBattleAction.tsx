import React from "react";

type AreaBattleActionProps = {
  children: React.ReactNode;
};
export const AreaBattleAction = ({ children }: AreaBattleActionProps) => {
  return (
    <div className="flex gap-2 w-full  justify-center items-center mt-10">
      {children}
    </div>
  );
};
