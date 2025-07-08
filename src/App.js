import './App.css';
import { useState, useEffect } from 'react';
import BlackBackgroundSVG from './SvgImage';


const G = 1000.0; // Gravity Constant
const tick = 0.001;
const EPSILON = 0; // 거리가 가까워지는 경우에 추가


function App() {
  let [bodies, changeBody] = useState([]); // bodies
  let [mass, setMass] = useState(0.0);
  let [location, setLocation] = useState([0.0, 0.0]);
  let [velocity, setVelocity] = useState([0.0, 0.0]);

  function addBody() {
    let inputBody = [mass, location, velocity];

    var copyBodys = [...bodies];
    copyBodys.push(inputBody);
    
    changeBody(copyBodys);
  }

  function inputToFloat(e) {
    return parseFloat(e.target.value);
  }


  return (
    <div className="App">
      <div className="header">
        {useEffect(() => {
          document.title = "Three-Body Simulation"
        })}

        <div>Three-Body Simulation</div>
      </div>

      <div className="body-input">
        <p>질량:</p>
        <input onChange={(e) => {
          setMass ( inputToFloat(e) )
          }}>
          </input>
          
        <p>위치:</p>
        <input onChange={(e) => {
          var newLocation = [...location]

          newLocation[0] = inputToFloat(e)
          setLocation (newLocation)
          }}>
          </input>
          
        <input onChange={(e) => {
          var newLocation = [...location]

          newLocation[1] = inputToFloat(e)
          setLocation (newLocation)
          }}>
          </input>
          
        <p>속도:</p>
        <input onChange={(e) => {
          var newVelocity = [...velocity]

          newVelocity[0] = inputToFloat(e)
          setVelocity (newVelocity)
          }}>
          </input>
          
        <input onChange={(e) => {
          var newVelocity = [...velocity]

          newVelocity[1] = inputToFloat(e)
          setVelocity (newVelocity)
          }}>
          </input>

        <button className="add" onClick={ () => { addBody() } }>Add</button>
      </div>
      
      <div>
        <ul>
          {bodies.map((body, index) => (
            <div className="body-info">
              <p>물체 {index + 1}</p>
              <p>질량: {body[0]}</p>
              <p>위치: ({body[1][0]}, {body[1][1]})</p>
              <p>속도: ({body[2][0]}, {body[2][1]})</p>
            </div>
          ))}
        </ul>
      </div>
      
      <div className="simulation">
        <button onClick={() => {
          simulation(bodies)
        }}>Simulate</button>
      </div>

      {BlackBackgroundSVG(bodies)}
    </div>
  );


  async function simulation() {
    const length = bodies.length;
    
    let points = bodies;

    while (true) {
      // console.log(points);


      var newBodies = [];
      for (let i = 0; i < length; i++) {
        let acceleration = [0.0, 0.0];

        for (let j = 0; j < length; j++) {
          if (i !== j) {
            acceleration = addVector(acceleration, getAcceleration(points[i], points[j]));
          }
        }

        // console.log('ACCELARATION', acceleration);

        newBodies.push([points[i][0],
          addVector(points[i][1], timesVector(points[i][2], tick)),
          addVector(points[i][2], timesVector(acceleration, tick))
        ])
      }

      // console.log('NEWBODIES', newBodies);

      await delay(1000 * tick);

      points = newBodies;
      // console.log('CHANGED BODIES', points);


      changeBody(points)
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function square(x) {
  return x * x;
}

function distance(a, b) {
  return Math.sqrt(square(a[1][0] - b[1][0]) + square(a[1][1] - b[1][1]));
}

function getAcceleration(point, other) {
  const d = distance(point, other) + EPSILON; // 너무 가까워져서 너무 큰 가속도 방지
  const unitAcceleration = G * other[0] / square(d) / d;

  return [unitAcceleration * (other[1][0] - point[1][0]), unitAcceleration * (other[1][1] - point[1][1])];
}

function addVector(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}

function timesVector(v, n) {
  return [v[0] * n, v[1] * n];
}


export default App;