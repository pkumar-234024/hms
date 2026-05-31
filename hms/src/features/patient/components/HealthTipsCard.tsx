import "../../../components/dashboard/dashboard.css";

const tips = [
  {
    icon: "water_drop",
    text: "Stay hydrated — aim for at least 8 glasses of water daily to maintain optimal kidney function and energy levels.",
  },
  {
    icon: "self_improvement",
    text: "Regular 10-minute mindfulness sessions can reduce cortisol levels by up to 25% and improve focus throughout the day.",
  },
  {
    icon: "directions_walk",
    text: "A 30-minute daily walk reduces the risk of cardiovascular disease by 35% and improves overall mental well-being.",
  },
  {
    icon: "bedtime",
    text: "Consistent sleep schedules strengthen immune function — aim for 7-9 hours and maintain regular bed/wake times.",
  },
];

export const HealthTipsCard = () => {
  // Pick a tip based on the day of the month for variety
  const tipIndex = new Date().getDate() % tips.length;
  const tip = tips[tipIndex];

  return (
    <div className="health-tip fade-in-up fade-in-up--d5">
      <div className="health-tip__icon">
        <span className="material-symbols-outlined">{tip.icon}</span>
      </div>
      <p className="health-tip__label">Daily Health Tip</p>
      <p className="health-tip__text">{tip.text}</p>
    </div>
  );
};
