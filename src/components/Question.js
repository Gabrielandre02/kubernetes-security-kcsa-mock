import React from 'react';

function Question({ question, onAnswer, userAnswer }) {
  if (!question) return <p>Loading question...</p>;

  // Ensure options is an array
  let options = [];
  try {
    options = typeof question.options === "string" ? JSON.parse(question.options) : question.options;
  } catch (error) {
    console.error("Error parsing options:", error);
  }

  const handleOptionChange = (optionIndex) => {
    if (question.question_type === 'single-choice') {
      onAnswer(question.id, [optionIndex]);
    } else {
      const newAnswer = userAnswer.includes(optionIndex)
        ? userAnswer.filter((index) => index !== optionIndex)
        : [...userAnswer, optionIndex];
      onAnswer(question.id, newAnswer);
    }
  };

  return (
    <div className="question">
      <h2>{question.question}</h2>
      <form>
        {question.options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type={question.question_type === 'single-choice' ? 'radio' : 'checkbox'}
                name={`question-${question.id}`}
                value={index}
                checked={userAnswer.includes(index)}
                onChange={() => handleOptionChange(index)}
              />
              {option}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default Question;