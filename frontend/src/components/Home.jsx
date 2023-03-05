import React from "react";
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

function Home() {
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
          <button className="create-acc" onClick={()=>window.location.href='/signup'}>Create a Free Account</button>
        </div>
      </div>

      <div className="services">
        <div className="home-serv">
          <div className="col-home">
            <img src={review} alt="" />
            <div className="serv-head">Review quant basics</div>
            <p>
              Our tutorials will help refresh all key concepts you will need
              ranging from statistics, finance, modern portfolio theory,
              programming, times series, etc.
            </p>
          </div>
          <div className="col-home">
            <img src={nail} alt="" />
            <div className="serv-head">Nail the interview</div>
            <p>
              We offer over 200 questions informed by real world interview
              experience with top finance firms. We also give practical tips on
              interview etiquette and structure so that you know what to expect
              when you meet on site or remotely.
            </p>
          </div>
          <div className="col-home">
            <img src={recruit} alt="" />
            <div className="serv-head">Get recruited</div>
            <p>
              Quant Questions partners with companies and recruiters identify
              top talent for quant finance roles. Let us introduce you.
            </p>
          </div>
        </div>
      </div>

      <div className="third">
        <div className="over">Over 1,500 quants train on Quant Questions.</div>
        <button className="acc" onClick={()=>window.location.href='/signup'}>Create a Free Account</button>
      </div>

      <div className="practice">
        <div className="over-head">
          Practice all core quant interview topics
        </div>

        <div className="prac1">
          <div className="prac-part1">
            <div className="prac-head">Fixed Income</div>
            <div>Bond Pricing</div>
            <div>Duration/Convexity</div>
            <div>Asset Backed</div>
            <div>Securities</div>
            <div>Interest Rates</div>
          </div>

          <div className="prac-part1">
            <div className="prac-head">Derivatives</div>
            <div>Derivatives</div>
            <div>Pricing</div>
            <div>Options & Futures</div>
            <div>The Greeks</div>
            <div>Monte Carlo</div>
            <div>Simulations</div>
          </div>

          <div className="prac-part1">
            <div className="prac-head">Probability</div>
            <div>Expected Value</div>
            <div>Combinatorics</div>
            <div>Markov Chains</div>
            <div>Martingales</div>
            <div>Stochastic</div>
            <div>Processes</div>
            <div>Statistical Distributions</div>
          </div>
          <div className="prac-part1">
            <div className="prac-head">Computer Science</div>
            <div>Algorithms</div>
            <div>Data Structures</div>
            <div>Numerical Methods</div>
            <div>Databases</div>
          </div>
        </div>

        <div className="prac2">
          <div className="prac-part1">
            <div className="prac-head">Modelling</div>
            <div>Econometrics</div>
            <div>Unsupervised learning</div>
            <div>Supervised learning</div>
            <div>Time Series</div>
          </div>
          <div className="prac-part1">
            <div className="prac-head">Risk Management</div>
            <div>Credit Risk</div>
            <div>CCAR/DFAST</div>
            <div>Value-at-Risk</div>
          </div>
          <div className="prac-part1">
            <div className="prac-head">Equities</div>
            <div>CAPM</div>
            <div>Factor Investing</div>
            <div>Generating</div>
            <div>Alpha</div>
          </div>
          <div className="prac-part1">
            <div className="prac-head">Other</div>
            <div>Sequences</div>
            <div>Estimation</div>
            <div>Mental Math</div>
            <div>Brainteasers</div>
          </div>
        </div>
      </div>

      <div className="third">
        <div className="over">What our users are saying</div>
        <div className="names">
            <div className="name1">
              <div className="name-disc"><img src={rotate} alt=""/>Thank you so much for creating such brilliant platform.<img src={invert} alt=""/></div>
              <div className="name-main">Liumeng</div>
            </div>
            <div className="name1 named1">
              <div className="name-disc"><img src={rotate} alt=""/>Great site! Thanks for the hard work.<img src={invert} alt=""/></div>
              <div className="name-main">Calvin</div>
            </div>
            <div className="name1">
              <div className="name-disc"><img src={rotate} alt=""/>The site is great, by the way<img src={invert} alt=""/></div>
              <div className="name-main">Kedar</div>
            </div>
        </div>
      </div>

      <div className="services2">
        <div className="over-head">Who is Quant Questions for?</div>
        <div className="myhome-serv">
          <div className="col-home">
            <img src={who1} alt="" />
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
            <img src={who2} alt="" />
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
            <img src={who3} alt="" />
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
  );
}

export default Home;
