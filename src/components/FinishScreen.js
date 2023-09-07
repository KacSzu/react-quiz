function FinishScreen({ points, totalPoints, highscore }) {
  const percentage = (points / totalPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "💯";
  if (percentage >= 75 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 75) emoji = "🥉";
  if (percentage >= 30 && percentage < 50) emoji = "👍";
  if (percentage < 30) emoji = "👎";

  return (
    <>
      <p className="result">
        You scored <strong>{points} </strong> out of {totalPoints} (
        {Math.ceil(percentage)}%) <span> {emoji} </span>
      </p>
      <p className="highscore">Highscore: {highscore} points </p>
    </>
  );
}

export default FinishScreen;
