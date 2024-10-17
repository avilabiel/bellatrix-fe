import manaIcon from "../mana.png";
type ManaProps = {
    mana: number;
    maxMana: number;
    monster?: boolean;
  };
const ManaBar = ({mana, maxMana,monster}:ManaProps) => {
  
    const currentManaPercentage = (mana * 100) / maxMana;
    return (
    <div className={`flex gap-x-2 ${monster && "flex-row-reverse"}`}>
    <img src={manaIcon} />
    <div className={`w-60 border border-teal-400 flex gap-x-2  rounded-[2px]`}>
     <div className={`w-full bg-teal-100`} style={{ width: `${currentManaPercentage}%` }}>

     </div>
    </div>
  </div>
  )
}

export default ManaBar