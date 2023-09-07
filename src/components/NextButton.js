function NextButton({ dispatch, answer, index, numQuestions, points }) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={
        index === numQuestions - 1
          ? () => dispatch({ type: "finish", payload: points })
          : () => dispatch({ type: "nextQuestion" })
      }
    >
      {index === numQuestions - 1 ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
