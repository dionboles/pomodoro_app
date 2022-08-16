import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

const Hello = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const totalSeconds = 20 * 60;
  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(() => seconds + 1);
      }, 1000);
    if (seconds == totalSeconds){
      reset()
    }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  let percentage = Math.round(seconds/totalSeconds) * 100;
  let minutes = Math.floor(seconds / 60);
  let seconds_left:any = seconds % 60
  if (seconds < 10){
      seconds_left = '0'+seconds
  }
  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${seconds_left}`}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',

          // Text size
          textSize: '16px',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: `#fedc2a`,
          textColor: '#fff',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
      ;
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? 'active' : 'inactive'
          }`}
          onClick={toggle}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
