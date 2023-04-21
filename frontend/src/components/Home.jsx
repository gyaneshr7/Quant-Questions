import React, { useEffect } from "react";
import Header from "./Header";
import "./Home.css";
import nail from "../images/nail.png";
import recruit from "../images/recruit.png";
import review from "../images/review.png";
import who1 from "../images/who1.png";
import who2 from "../images/who2.png";
import who3 from "../images/who3.png";
import invert from '../images/invert.png';
import rotate from '../images/rotate.png';
import { GrMoney } from 'react-icons/gr';
import { FaBalanceScale } from 'react-icons/fa';
import { GrOptimize } from 'react-icons/gr';
import { FaDice } from 'react-icons/fa';
import { AiOutlineBranches } from 'react-icons/ai';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { RiLineChartFill } from 'react-icons/ri';
import { FaPuzzlePiece } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  // if user already logged in, redirect to questions page
  const navigate = useNavigate()
  const handleAuth = async() => {

    const isLoggedIn = localStorage.getItem("quantuser");
    if (isLoggedIn !== "null") {
      // alert("loggedin")
      navigate('/questions')
    }
  }

  useEffect(() => {
  handleAuth();
  }, [])

  return (

    <div>
      <Header />
      <div className="home">
        <div className="home-head">
          <div className="ace">Ace Your Next Quant Interview</div>
          <div className="sub-head">
            Quant Questions is a better way to get a job in quant finance. We
            prepare you with real quant interview questions from top firms to
            help you land a job.
          </div>
          <Link to="/signup" className="create-acc" >Create a Free Account</Link>
        </div>
      </div>

      <div className="services">
        <div className="home-serv">
          <div className="col-home">
            <img className="col-img" src={review} alt="" />
            <div className="serv-head">Review quant basics</div>
            <p className="col-text">
              Our tutorials will help refresh all key concepts you will need
              ranging from statistics, finance, modern portfolio theory,
              programming, times series, etc.
            </p>
          </div>
          <div className="col-home">
            <img className="col-img" src={nail} alt="" />
            <div className="serv-head">Nail the interview</div>
            <p className="col-text">
              We offer over 200 questions informed by real world interview
              experience with top finance firms. We also give practical tips on
              interview etiquette and structure so that you know what to expect
              when you meet on site or remotely.
            </p>
          </div>
          <div className="col-home">
            <img className="col-img" src={recruit} alt="" />
            <div className="serv-head">Get recruited</div>
            <p className="col-text">
              Quant Questions partners with companies and recruiters identify
              top talent for quant finance roles. Let us introduce you.
            </p>
          </div>
        </div>
      </div>

      <div className="third">
        <div className="over">Over 1,500 quants train on Quant Questions.</div>
        <div className="over-acc">
          <Link className="acc" to='/signup'>Create a Free Account</Link>
        </div>
      </div>

      <div className="practice">
        <div className="over-head">
          Practice all core quant interview topics
        </div>

        <div className="prac1 prac-web">
          <div className="prac-part1">
            <div className="prac-head"><GrMoney size="20" />Fixed Income</div>
            <div className="prac-p">Bond Pricing</div>
            <div className="prac-p">Duration/Convexity</div>
            <div className="prac-p">Asset Backed</div>
            <div className="prac-p">Securities</div>
            <div className="prac-p">Interest Rates</div>
          </div>

          <div className="prac-part1">
            <div className="prac-head"><GrOptimize size="20" />Derivatives</div>
            <div className="prac-p">Derivatives</div>
            <div className="prac-p">Pricing</div>
            <div className="prac-p">Options & Futures</div>
            <div className="prac-p">The Greeks</div>
            <div className="prac-p">Monte Carlo</div>
            <div className="prac-p">Simulations</div>
          </div>

          <div className="prac-part1">
            <div className="prac-head"><FaDice size="20" />Probability</div>
            <div className="prac-p">Expected Value</div>
            <div className="prac-p">Combinatorics</div>
            <div className="prac-p">Markov Chains</div>
            <div className="prac-p">Martingales</div>
            <div className="prac-p">Stochastic</div>
            <div className="prac-p">Processes</div>
            <div className="prac-p">Statistical Distributions</div>
          </div>
          <div className="prac-part1">
            <div className="prac-head"><AiOutlineBranches size="20" />Computer Science</div>
            <div className="prac-p">Algorithms</div>
            <div className="prac-p">Data Structures</div>
            <div className="prac-p">Numerical Methods</div>
            <div className="prac-p">Databases</div>
          </div>
        </div>

        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "25px" }}>
          <div className="prac-ph">
            <div className="prac-part1">
              <div className="prac-head"><GrMoney size="20" />Fixed Income</div>
              <div className="prac-p">Bond Pricing</div>
              <div className="prac-p">Duration/Convexity</div>
              <div className="prac-p">Asset Backed</div>
              <div className="prac-p">Securities</div>
              <div className="prac-p">Interest Rates</div>
            </div>

            <div className="prac-part1">
              <div className="prac-head"><GrOptimize size="20" />Derivatives</div>
              <div className="prac-p">Derivatives</div>
              <div className="prac-p">Pricing</div>
              <div className="prac-p">Options & Futures</div>
              <div className="prac-p">The Greeks</div>
              <div className="prac-p">Monte Carlo</div>
              <div className="prac-p">Simulations</div>
            </div>
          </div>

          <div className="prac-ph">
            <div className="prac-part1">
              <div className="prac-head"><FaDice size="20" />Probability</div>
              <div className="prac-p">Expected Value</div>
              <div className="prac-p">Combinatorics</div>
              <div className="prac-p">Markov Chains</div>
              <div className="prac-p">Martingales</div>
              <div className="prac-p">Stochastic</div>
              <div className="prac-p">Processes</div>
              <div className="prac-p">Statistical Distributions</div>
            </div>
            <div className="prac-part1">
              <div className="prac-head"><AiOutlineBranches size="20" />Computer Science</div>
              <div className="prac-p">Algorithms</div>
              <div className="prac-p">Data Structures</div>
              <div className="prac-p">Numerical Methods</div>
              <div className="prac-p">Databases</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "25px", paddingBottom: "30px" }}>
          <div className="prac-ph">
            <div className="prac-part1">
              <div className="prac-head"><BsGrid3X3Gap size="20" />Modelling</div>
              <div className="prac-p">Econometrics</div>
              <div className="prac-p">Unsupervised learning</div>
              <div className="prac-p">Supervised learning</div>
              <div className="prac-p">Time Series</div>
            </div>
            <div className="prac-part1">
              <div className="prac-head"><FaBalanceScale size="20" />Risk Management</div>
              <div className="prac-p">Credit Risk</div>
              <div className="prac-p">CCAR/DFAST</div>
              <div className="prac-p">Value-at-Risk</div>
            </div>
          </div>

          <div className="prac-ph">
            <div className="prac-part1">
              <div className="prac-head"><RiLineChartFill size="20" />Equities</div>
              <div className="prac-p">CAPM</div>
              <div className="prac-p">Factor Investing</div>
              <div className="prac-p">Generating</div>
              <div className="prac-p">Alpha</div>
            </div>
            <div className="prac-part1">
              <div className="prac-head"><FaPuzzlePiece size="20" />Other</div>
              <div className="prac-p">Sequences</div>
              <div className="prac-p">Estimation</div>
              <div className="prac-p">Mental Math</div>
              <div className="prac-p">Brainteasers</div>
            </div>
          </div>
        </div>

        <div className="prac2 prac-web">
          <div className="prac-part1">
            <div className="prac-head"><BsGrid3X3Gap size="20" />Modelling</div>
            <div className="prac-p">Econometrics</div>
            <div className="prac-p">Unsupervised learning</div>
            <div className="prac-p">Supervised learning</div>
            <div className="prac-p">Time Series</div>
          </div>
          <div className="prac-part1">
            <div className="prac-head"><FaBalanceScale size="20" />Risk Management</div>
            <div className="prac-p">Credit Risk</div>
            <div className="prac-p">CCAR/DFAST</div>
            <div className="prac-p">Value-at-Risk</div>
          </div>
          <div className="prac-part1">
            <div className="prac-head"><RiLineChartFill size="20" />Equities</div>
            <div className="prac-p">CAPM</div>
            <div className="prac-p">Factor Investing</div>
            <div className="prac-p">Generating</div>
            <div className="prac-p">Alpha</div>
          </div>
          <div className="prac-part1">
            <div className="prac-head"><FaPuzzlePiece size="20" />Other</div>
            <div className="prac-p">Sequences</div>
            <div className="prac-p">Estimation</div>
            <div className="prac-p">Mental Math</div>
            <div className="prac-p">Brainteasers</div>
          </div>
        </div>
      </div>

      <div className="third">
        <div className="over">What our users are saying</div>
        <div className="names">
          <div className="name1">
            <div className="name-disc"><img src={rotate} alt="" />Thank you so much for creating such brilliant platform.<img src={invert} alt="" /></div>
            <div className="name-main">Liumeng</div>
          </div>
          <div className="name1 named1">
            <div className="name-disc"><img src={rotate} alt="" />Great site! Thanks for the hard work.<img src={invert} alt="" /></div>
            <div className="name-main">Calvin</div>
          </div>
          <div className="name1">
            <div className="name-disc"><img src={rotate} alt="" />The site is great, by the way<img src={invert} alt="" /></div>
            <div className="name-main">Kedar</div>
          </div>
        </div>
      </div>

      <div className="services2">
        <div className="over-head">Who is Quant Questions for?</div>
        <div className="myhome-serv">
          <div className="col-home">
            <img className="serv-img" src={who1} alt="" />
            <div className="myserv-head">Undergraduates in STEM majors</div>
            <p className="my-text">
              You are majoring in engineering, applied math or computer science
              and have taken a few courses in finance, operations research or
              economics. Get your career off to the best possible start by
              landing the best offer you can. These interviews are challenging
              and you need to prepare in order to succeed.
            </p>
          </div>
          <div className="col-home">
            <img className="serv-img" src={who2} alt="" />
            <div className="myserv-head">Graduate students & PhD candidates</div>
            <p className="my-text">
              You are getting your masters in financial engineering, math
              finance, computational finance, data science or analytics and are
              actively preparing for quant interviews. Or maybe you are getting
              your PhD in math, computers science or physics and a colleague
              told you about their lucrative career on Wall Street. We will help
              you practice all the quant interview questions you need to know.
            </p>
          </div>
          <div className="col-home">
            <img className="serv-img" src={who3} alt="" />
            <div className="myserv-head">Early career quant professionals</div>
            <p className="my-text">
              You went through this quant interview rodeo once before and you
              know how much of a headache it is. And now that you have been
              working, you have since forgotten all about those brainteasers,
              probability and coding questions. Let us help you make this second
              time just a little bit less painful.
            </p>
          </div>
        </div>
      </div>

      <div className="footer web-footer">
        <div className="all-foots">
          <a href="/">&copy;Quant Questions</a>
          <a href="/">Contact Us</a>
          <a href="/">Terms</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Blogs</a>
          <a href="/">FAQs</a>
        </div>
      </div>

      <div className="footer mobile-footer">
        <div className="all-foots">
          <a href='/'>Home</a>
          <a href="/">Contact</a>
          <a href="/">Terms</a>
          <a href="/">Privacy</a>
          <a href="/">Blogs</a>
          <a href="/">FAQs</a>
        </div>
      </div>

    </div>
  )
}


export default Home;
