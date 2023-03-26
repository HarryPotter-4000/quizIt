import React, { useState } from "react";
import { Container, Text } from "@mantine/core";

import { QuizQuestion } from "@/components";
import { useLocalStorage } from "@/utils/useLocalStorage";

import { reactRules } from "../../server/fakeData";
export const Quiz = () => {
  const [questionPage, setQuestionPage] = useState(0);
  const [correctAnswersQty, setCorrectAnswersQty] = useLocalStorage(
    "correctAnswersQty",
    0
  );

  const countCorrectAnswersQty = (isCorrect) => {
    isCorrect && setCorrectAnswersQty(correctAnswersQty + 1);
  };

  const setNextQuestionPage = () => {
    setQuestionPage(questionPage + 1);
  };
  const QUESTIONCOUNT = reactRules.length;

  const isFinished = questionPage >= QUESTIONCOUNT;

  if (isFinished) {
    localStorage.setItem("correctAnswersQty", JSON.stringify(0));
  }

  return (
    <Container
      size="sm"
      p="30px"
      h="100%"
      sx={{
        justifyContent: "flex-end",
        overflowY: "scroll",
      }}
    >
      {(!isFinished && (
        <QuizQuestion
          id={reactRules[questionPage].id}
          question={reactRules[questionPage].question}
          answers={reactRules[questionPage].answers}
          correctAnswerId={reactRules[questionPage].correctAnswerId}
          explanation={reactRules[questionPage].explanation}
          questionsQty={QUESTIONCOUNT}
          questionIndex={questionPage + 1}
          isCorrectAnswer={countCorrectAnswersQty}
          setNextQuestionPage={setNextQuestionPage}
        />
      )) || (
        <Text>
          YOUR RESULT IS: {correctAnswersQty} / {reactRules.length}
        </Text>
      )}
    </Container>
  );
};
