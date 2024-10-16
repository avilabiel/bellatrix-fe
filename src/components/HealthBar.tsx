import heart from "../heart.png";
type HealthBarProps = {
  health: number;
  maxHealth: number;
};
const HealthBar = ({ health, maxHealth }: HealthBarProps) => {
  const currentHealthPercentage = (health * 100) / maxHealth;

  return (
    <div className="flex gap-x-2">
      <img src={heart} />
      <div className={`w-60 border border-red-500 flex gap-x-2 rounded-[2px]`}>
       <div className={`w-full bg-red-200`} style={{ width: `${currentHealthPercentage}%` }}>

       </div>
      </div>
    </div>
  );
};

export default HealthBar;
