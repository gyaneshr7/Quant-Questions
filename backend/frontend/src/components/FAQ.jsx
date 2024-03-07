import React, { useState } from "react";
import "./FAQ.css";
import Header from "./Header";
import 'katex/dist/katex.min.css';

import { IoIosArrowForward } from "react-icons/io";


function FAQ() {
  const [open, setOpen] = useState([]);

 
  const faq = [
    {
      id: 1,
      q: "What is the meaning of Quantitative Aptitude?",
      d: "The ability to recognise and interpret numbers and corresponding symbols to perform fundamental arithmetic operations and assessments is referred to as Quantitative Aptitude. This competency assesses an individual's competence with numbers as well as their ability to use data to make educated decisions.",
    },
    {
      id: 2,
      q: "Is Quantitative Aptitude  difficult?",
      d: "No, Quantitative Aptitude is not difficult. It's like asking if riding a bicycle is tough; it may appear challenging at first, but after you practice on a daily basis, it'll be a piece of cake! Quantitative Aptitude is easy to master with guided practice and consistent efforts.",
    },
    {
      id: 3,
      q: "Are Quantitative Aptitude and Arithmetic Ability the same?",
      d: "No, Arithmetic Ability is a skill and part of Quantitative Aptitude. But at the foundational level, there is one slight difference.The foundation of Arithmetic Ability is formulas, but the foundation of Quantitative Aptitude is conceptual understanding, applicability, and abstract reasoning.",
    },
    {
      id: 4,
      q: "How to prepare for Quantitative Aptitude?",
      d: "Quantitative Aptitude preparation requires dedicated efforts on a daily basis. First and foremost, fully comprehend the big picture! Establish your objectives and aims. And then proceed by understanding the syllabus. Select the best possible resources, including books, websites, apps, and Youtube channels. Learn shortcut tricks to improve your speed. Memorise formulas to enhance your accuracy. Once you complete all the stages of the Quantitative Aptitude preparation guide, you'll feel more confident about the examinations.",
    },
    {
      id:5,
      q:"Which are the best books to learn Quantitative Aptitude?",
      d:"There is no such thing as a perfect Quantitative Aptitude book. However, numerous books are acknowledged by both toppers and industry professionals. To prepare for your exams, browse our best Quantitative Aptitude book guide."
    }
  ];


  const setClicked = (index) => {
    if (open.includes(index)) {
      setOpen(open.filter(i => i !== index));
    } else {
      setOpen([...open, index]);
    }
  }

  return (
    <div >
      <Header />
      
      <h1 className="faq-head">FAQs</h1>
      <div className="disp-faq">
        {faq.map((data, index) => (
          <div className="all-faq">
            <div onClick={() => setClicked(index)}>
              <div className="faq-open">
                <div>{data.q}</div>
                {
                  open.includes(index) ? <IoIosArrowForward className="faq-ios rotate" />
                  : <IoIosArrowForward className="faq-ios" />
                }
                  
              </div>
            </div>
            {open.includes(index) &&
                  <div className="faq-open-detail">
                    <div>{data.d}</div>
                  </div>
                }
          </div>
        ))}
      </div>  
      </div>     
  );
}

export default FAQ;
