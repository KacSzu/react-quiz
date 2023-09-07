import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Main from "./Main.js";
import StartScreen from "./StartScreen.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";
const initialState = {
  questions: [],
  // 'loading', 'error', 'ready','actvie', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,

        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          action.payload > state.highscore ? action.payload : state.highscore,
      };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              answer={answer}
              totalPoints={totalPoints}
              index={index}
              numQuestions={numQuestions}
              points={points}
            />
            <Question
              answer={answer}
              dispatch={dispatch}
              question={questions[index]}
            />
            <NextButton
              points={points}
              numQuestions={numQuestions}
              index={index}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
