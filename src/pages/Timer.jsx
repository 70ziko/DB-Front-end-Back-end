import { useState, useEffect } from "react";
export default function Timer() {

    const [scrambles, setscrambles] = useState(''); // scramble 
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [time, setTime] = useState(0);
    const [times, setTimes] = useState([]);


    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    const moves = ['U', 'U2', 'U\'', 'D', 'D2', 'D\'', 'L', 'L2', 'L\'', 'R', 'R2', 'R\'', 'F', 'F2', 'F\'', 'B', 'B2', 'B\''];
    const axes = ['U', 'D', 'L', 'R', 'F', 'B'];


    function generateScramble() {
        const scrambleLength = 20; // the basic length of scramble
        let scramble = ''; //empty string for scramble 
        let lastAxis = null; // last axis is null bc there is no move no -1

        for (let i = 0; i < scrambleLength; i++) {
            let move; // for each iteration is generated new var called move
            do {
                move = moves[Math.floor(Math.random() * moves.length)]; // first iteration, just generation random move 
            } while (axes.indexOf(move[0]) === axes.indexOf(lastAxis));  // 
            scramble += move + ' ' // adding move to our scramble 
            lastAxis = move[0] // setting last axis
        }
        setscrambles(scramble) // setting scramble to my var Hook
    }



    useEffect(() => { // new scramble is generating when timer is stopped
        if (!isRunning) {
            generateScramble()
            console.log(times)
        }
    }, [isRunning]);



    useEffect(() => {
        let interval = null;
        if (isRunning) {
            setTime(elapsedTime)
            interval = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);

            }, 10)
        } else if (!isRunning && elapsedTime !== 0) {
            clearInterval(interval)
            setTime(elapsedTime)
            setTimes(prevTimes => [...prevTimes, time])

        }
        return () => clearInterval(interval)
    }, [isRunning, elapsedTime]);

    const handleKeyDown = event => {
        if (event.key === ' ') {
            setIsRunning((prevIsRunning) => !prevIsRunning);
        }
        if (!isRunning) {
            setElapsedTime(0);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });


    const showtimes = times.map(time => (
      //  <h1 key={time}></h1>
        <div className="little-time">
            {Math.floor(time / 60000)}:{Math.floor((time % 60000) / 1000)}:{Math.floor((time % 1000) / 10)}
        </div>
    ))



    //  <p>{scrambles}</p>
    //{!minutes ? <h1>{seconds}.{milliseconds}</h1> : <h1>{minutes}:{seconds}.{milliseconds}</h1>}
    //{showtimes}
    return (
        <div className="timer">
            <div className="scramble"><span>{scrambles}</span></div>
            <div className="mains">
                <div className="left">{showtimes}</div>
                <div className="center">{!minutes ? <span>{seconds}.{milliseconds}</span> : <span>{minutes}:{seconds}.{milliseconds}</span>}</div>
                <div className="right"></div>
            </div>

        </div>
    )
}



