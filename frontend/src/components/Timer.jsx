import React, { useEffect, useRef, useState } from 'react';
import './Timer.css';

const Timer = () => {
    const hoursElement = useRef(null);
    const minutesElement = useRef(null);
    const secondsElement = useRef(null);
    const headingRef = useRef(null); // Added a reference for heading
    const counterTimerRef = useRef(null); // Added a reference for counterTimer
    const [targetTime, setTargetTime] = useState(() => {
        // Get the target time from localStorage, or default to null
        return localStorage.getItem('targetTime') || null;
    });

    useEffect(() => {
        if (targetTime=="null" || !targetTime) {
            
            const currentTime = new Date().getTime();
            const newTargetTime = currentTime + (1 * 60 * 60 * 1000); // 1 hr in milliseconds
            setTargetTime(newTargetTime);
            localStorage.setItem('targetTime', newTargetTime);
        }

        // Start the timer
        const timerInterval = setInterval(updateTimer, 1000);

        // Cleanup function to clear the timer interval
        return () => clearInterval(timerInterval);
    }, [targetTime]);

    const updateTimer = () => {
        // Calculate the time difference
        let difference = targetTime - new Date().getTime();

        // If the difference becomes negative (timer has expired), set it to 0
        difference = Math.max(difference, 0);

        // Calculate hours, minutes, and seconds
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update the timer display
        hoursElement.current.innerText = hours.toString().padStart(2, '0');
        minutesElement.current.innerText = minutes.toString().padStart(2, '0');
        secondsElement.current.innerText = seconds.toString().padStart(2, '0');

        // If the timer has expired, display "Time's Up" message
        if (difference <= 0) {
            // hoursElement.current.innerText = '00';
            // minutesElement.current.innerText = '00';
            // secondsElement.current.innerText = '00';
            counterTimerRef.current.style.display = "none"; // Hide the timer container
            headingRef.current.innerText = "Time's Up"; // Update heading text
            localStorage.removeItem('targetTime'); // Remove targetTime from localStorage
            window.location.href = '/profile'; // Redirect to '/profile'
        }
    };

    return (
        <div className="container">
            <h1 ref={headingRef}>Remaining Time</h1> {/* Added ref */}
            <div className="counterTimer" ref={counterTimerRef}> {/* Added ref */}
                <p><span className="hours" ref={hoursElement}></span>Hours</p>
                <p><span className="minutes" ref={minutesElement}></span>Minutes</p>
                <p><span className="seconds" ref={secondsElement}></span>Seconds</p>
            </div>
        </div>
    );
};

export default Timer;
