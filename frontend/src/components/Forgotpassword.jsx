import React, { useEffect, useState } from 'react'
import validator from "validator"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './Forgot.css'
import Header from './Header';
import Modal from "react-bootstrap/Modal";
import logo2 from '../images/logo2.png'

export default function Forgotpassword() {
    const [phoneNo, setPhoneNo] = useState();
    const [otp, setOtp] = useState();
    const [users, setUsers] = useState();
    const [changeEdit, setChangeEdit] = useState(false);
    const [otpEdit, setOtpEdit] = useState(false);
    const [newPass, setNewPaas] = useState();
    const [confirmnewPass, setConfirmNewPaas] = useState();
    const[show,setShow]=useState(false);
    const[loading,setLoading]=useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await fetch("http://localhost:8000/user");
            const res = await data.json();
            setUsers(res);
        }
        fetchUsers();
    }, [])

    const firebaseConfig = {
        apiKey: "AIzaSyDIGIxb1dCYDNv850PsM7CR63FWtpWTtpE",
        authDomain: "quantquestions-d3773.firebaseapp.com",
        projectId: "quantquestions-d3773",
        storageBucket: "quantquestions-d3773.appspot.com",
        messagingSenderId: "463849816874",
        appId: "1:463849816874:web:b5dbea95be78b1a1179453",
        measurementId: "G-H033GHCRKL"
    };

    firebase.initializeApp(firebaseConfig);
    var auth = firebase.auth();

    const configureCaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // handleSendOtp();
                    // console.log("Recaptca varified")
                },
                defaultCountry: "IN"
            });
        }
    }

    const handleSendOtp = () => {
        setLoading(true)
        configureCaptcha();
        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = "+91" + phoneNo
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                alert("OTP has been sent");
                setOtpEdit(true);
                setLoading(false);
            }).catch((error) => {
                // console.log(error)
            });
    };

    const submitPhoneNo = (e) => {
        e.preventDefault();
        // console.log(phoneNo);
        if (phoneNo) {
            validator.isMobilePhone(phoneNo)
                ? handleSendOtp()
                : alert('Enter a valid Phone Number')
                  setShow(true); 
        }
        else {
            alert("Phone Number can't be empty");
        }
    }

    const onSubmitOTP = (e) => {
        e.preventDefault()
        const code = otp
        window.confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            alert("User is verified");
            let count = 0;
            users.map((data) => {
                // console.log(data.phoneNo,phoneNo)
                if (data.phoneNo == phoneNo) {
                    setChangeEdit(true);
                    count = 1;
                }
            })
            if (count == 0) {
                alert("Not a valid user");
                setChangeEdit(false);
                setOtpEdit(false);
            } else if (count == 1) {
                setChangeEdit(true);
                setOtpEdit(false);
            }
        }).catch((error) => {
            alert("Wrong Otp")
        });
    }

    const submitPassword = async (e) => {
        e.preventDefault();
        // console.log(newPass, confirmnewPass, phoneNo);
        if (newPass === confirmnewPass) {
            const data = await fetch(`http://localhost:8000/auth/update/new/password/${phoneNo}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPass })
            });
            const res = await data.json();
            alert(res);
            window.location.href='/login';
        } else {
            alert("New Passwords doesn't match!");
        }
    }

    const handleClose = () => setShow(false);


    return (
        <div>
            <Header/>
            {
                !changeEdit &&
                <div>
                <div className="dforgot">Password Reset</div>
                <form className='forgot-page' onSubmit={submitPhoneNo}>
                    <div className='box'>
                        <div className='login'>
                        <img src={logo2} className="login-logo" alt="" />
                            <div id="sign-in-button"></div>
                            <div className='passwordfield'>
                                <input type="number" className='inputBox' onChange={(e) => setPhoneNo(e.target.value)} autoComplete="new-password" placeholder='Enter Phone No.' />
                            </div>
                            {loading ? (
                                <button class="buttonload">
                                Wait  <i class="fa fa-spinner fa-spin"></i>
                              </button>
                            
                          ) : (
                            <button type="submit" className='subbtn'>Get OTP</button>
                          )
                          }
                        </div>
                    </div>
                </form>
                </div>
            }

            {
                otpEdit && !changeEdit &&
                <>
                    <Modal
                    show={show}
                    backdrop="static"
                    onHide={handleClose}
                    className="my-modal">

                    <Modal.Header closeButton>
                        <Modal.Title>Enter OTP!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="otp-body">OTP sent to<span>+91{phoneNo}</span></div>    
                    <form onSubmit={onSubmitOTP} className="otp-form">
                        <input type="number" name="otp" placeholder="OTP Number" className='otp-input' required onChange={(e) => setOtp(e.target.value)} />
                        <button type="submit" className="otp-btn">Submit</button>
                    </form>
                    </Modal.Body>
                </Modal>
                    
                </>
            }
            {
                changeEdit && !otpEdit &&
                <form className='forgot-page' onSubmit={submitPassword}>
                    <div className='box'>
                        <div className='login'>
                            <div className='passwordfield'>
                                <input type="text" className='inputBox' onChange={(e) => setNewPaas(e.target.value)} autoComplete="new-password" placeholder='Enter New Password' />
                            </div>
                            <div className='passwordfield'>
                                <input type="text" className='inputBox' onChange={(e) => setConfirmNewPaas(e.target.value)} autoComplete="new-password" placeholder='Confirm New Password' />
                            </div>
                            <button type="submit" className='subbtn'>Submit</button>
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}
