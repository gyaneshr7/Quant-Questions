import React, { useState } from "react";
import Header from "./Header";
import "./QueDetail.css";
import { IoIosArrowBack,IoIosArrowForward } from 'react-icons/io';
import { AiOutlineMail } from 'react-icons/ai';
import { GrNote } from 'react-icons/gr';
import { AiOutlineLike } from 'react-icons/ai';
import { BsFillCalculatorFill } from 'react-icons/bs';
import { DiJavascript1 } from 'react-icons/di';
import { RiWindowLine } from 'react-icons/ri';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { AiOutlineDislike } from 'react-icons/ai';


function QueDetail() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    console.log(currentQuestionIndex);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    console.log(currentQuestionIndex);
  };

  const handleAnswerOptionClick = (answer) => {
    if (answer === data[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
 };


//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < data.length) {
//       setCurrentQuestion(nextQuestion);
//     }
//   };

//   const handlePreviousButtonClick = () => {
//     const previousQuestion = currentQuestion - 1;
//     if (previousQuestion >= 0) {
//       setCurrentQuestion(previousQuestion);
//     }
//   };

//   const handleNextButtonClick = () => {
//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < data.length) {
//       setCurrentQuestion(nextQuestion);
//     }
//   };

  const data = [
    {
      id: 1,
      title: ". Two Drawers with Black and White Balls",
      description:"There are 2 drawers. The first drawer contains only black balls. The second contains 50% black balls and 50% white balls. There are an equal number of balls in each drawer. I pick a ball at random and it is black. What is the probability that the ball came from the first drawer?",
      ansType:"text"
    },
    {
      id: 2,
      title: ". Delta Range",
      description:"What are the smallest and largest values that Delta can take? Note this is from the option holder perspective. Use the academic version of delta (not trader convention of ×100.",
      ansType:"text"
    },
    {
      id: 3,
      title: ". First Ace",
      description:
        "You turn over a card one by one from a deck. What is the expected number of cards that you need to flip before you see the first ace?",
      ansType:"text"        
    },
    {
      id: 4,
      title: ".What is the capital of France?",
      description:"What are the differences between a forward and futures contract (recite your answer out loud or enter it in the scratch work section)? If the price of the underlying asset is strongly positively correlated with interest rates, which one has a higher price?",
      options: ["Paris", "Rome"],
      answer: "Paris",
      ansType:"mcq"
    },
    {
      id: 5,
      title: ".What is the largest country in the world?",
      description:"What are the differences between a forward and futures contract (recite your answer out loud or enter it in the scratch work section)? If the price of the underlying asset is strongly positively correlated with interest rates, which one has a higher price?",
      options: ["USA", "China"],
      answer: "Russia",
      ansType:"mcq"
    },
  ];

  const isPreviousDisabled = currentQuestionIndex === 0;
  const isNextDisabled = currentQuestionIndex === data.length - 1;

  console.log(isPreviousDisabled);
  console.log(isNextDisabled);
 

  return (
    <div>
      <Header />
      <div className="detail-side">
        <div className="que-side">
        <div className="detail-one">
          <div className="line-one">
            <div className="main-detail">
              <div className="detail-title ">{data[currentQuestionIndex].id}</div>
              <div className="detail-title settitle ">{data[currentQuestionIndex].title}</div>
            </div>
            <div className="detail-icons">
              <div className="icon-line1">
                <BsFillCalculatorFill size={18}/>
                <AiOutlineMail size={23}/>
                <GrNote size={17}/>
                <AiOutlineLike size={23} color="green"/>
              </div>
              <div className="icon-line2">
                <DiJavascript1 size={20}/>
                <RiLightbulbFlashLine size={20}/>
                <RiWindowLine size={20}/>
                <AiOutlineDislike size={20} color="red"/>
              </div>
            </div>
          </div>

          <div className="line-two">
            <p className="que-descr">{data[currentQuestionIndex].description}</p>
          </div>
          <p className="answer">Your Answer</p>
          {
            data[currentQuestionIndex].ansType==="text"
            ?
            <div className="answer">
                <input type="text" className="ans-field" />
            </div>    
            :
            <div className="options">
          {data[currentQuestionIndex].options.map((option) => (
          <div className="disp-radio">
            <input type="radio" value={option} name="option" onClick={() => handleAnswerOptionClick(option)}/>
            <p className="input-pin">{option}</p>
          </div>
        ))}
      </div>
          }  

          <div className="align-btn">
          <button className="submit">Submit</button>
          <button className="show">Show Answer</button>
          </div>
          
          

        </div>

     <div className="buttons">
            <button className="prev" 
                onClick={handlePrevious} disabled={isPreviousDisabled}>
                <IoIosArrowBack fontSize={20}/>
                Prev</button>
        
        <p className="nums">1/120</p>
        <button className="next" 
         onClick={handleNext} disabled={isNextDisabled}>Next
        <IoIosArrowForward fontSize={20}/>
        </button>
      </div>
      </div>

        <div className="detail-two"></div>
      </div>
    </div>
  );
}

export default QueDetail;
