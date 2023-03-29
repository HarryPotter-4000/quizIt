import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Text } from "@mantine/core";

import { useFetchById } from "@/api/useFetchByID";
import { QuizPreview, QuizQuestion } from "@/components";
import { useLocalStorage } from "@/utils/useLocalStorage";

export const Quiz = () => {
  const [quizData, setQuizData] = useState({});
  const [isGameWithTimer, setIsGameWithTimer] = useLocalStorage(
    "isGameWithTimer",
    ""
  );
  const [questionPage, setQuestionPage] = useLocalStorage("questionPage", 0);
  const [correctAnswersQty, setCorrectAnswersQty] = useLocalStorage(
    "correctAnswersQty",
    0
  );

  const { id: quizId } = useParams();

  const data = useFetchById(quizId);

  useEffect(() => {
    setQuizData(data);
  }, [data, quizId]);

  const setTypeOfGame = (isTimerActive) => {
    setIsGameWithTimer(isTimerActive);
  };

  const countCorrectAnswersQty = (isCorrect) => {
    isCorrect && setCorrectAnswersQty(correctAnswersQty + 1);
  };

  const setNextQuestionPage = () => {
    setQuestionPage(questionPage + 1);
  };

  return (
    <>
      {!!quizData && !!Object.keys(quizData)?.length && (
        <Container
          size="sm"
          p="30px"
          h="100%"
          sx={{
            justifyContent: "flex-end",
            overflowY: "scroll",
          }}
        >
          {(isGameWithTimer === "" && (
            <QuizPreview
              quizName={quizData.quizName}
              quizDescription={quizData.quizDescription}
              setTypeOfGame={setTypeOfGame}
            />
          )) ||
            (questionPage < quizData.quizData.length && (
              <QuizQuestion
                isGameWithTimer={isGameWithTimer}
                question={quizData.quizData[questionPage].question}
                answers={quizData.quizData[questionPage].answers}
                correctAnswerId={
                  quizData.quizData[questionPage].correctAnswerId
                }
                explanation={quizData.quizData[questionPage].explanation}
                questionsQty={quizData.quizData.length}
                questionIndex={questionPage + 1}
                isCorrectAnswer={countCorrectAnswersQty}
                setNextQuestionPage={setNextQuestionPage}
              />
            )) || (
              <Text>
                YOUR RESULT IS: {correctAnswersQty} / {quizData.quizData.length}
              </Text>
            )}
        </Container>
      )}
    </>
  );
};
