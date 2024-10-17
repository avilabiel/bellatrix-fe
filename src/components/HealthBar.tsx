import heart from "../heart.png";
type HealthBarProps = {
  health: number;
  maxHealth: number;
  monster?: boolean;
};
const HealthBar = ({ health, maxHealth, monster }: HealthBarProps) => {
  const currentHealthPercentage = (health * 100) / maxHealth;

  return (
    <div className={`flex gap-x-2 ${monster && "flex-row-reverse"}`}>
      <img src={heart} />
      <div className={`w-60 border border-red-500 flex gap-x-2 rounded-[2px]`}>
        <div
          style={{
            width: `${currentHealthPercentage}%`,
            backgroundColor: "#fecaca",
          }}
        ></div>
      </div>
    </div>
  );
};

export default HealthBar;
