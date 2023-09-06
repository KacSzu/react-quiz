function Progress({ index, numQuestions, points, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Qutstion <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <stong>
          {points}/{totalPoints}
        </stong>
      </p>
    </header>
  );
}

export default Progress;
