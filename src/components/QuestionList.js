import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      {questions.map(question => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
}

export default QuestionList;
