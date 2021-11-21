import React, { useState, useEffect, useRef, useReducer } from "react";

import './App.css';

import { debounce } from "lodash-es";

import Counter from "./components/Counter";

const initState = { count: 1, max: 1000 };

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      const newCount = state.count + 1;
      return {
        ...state,
        count: newCount <= state.max ? newCount : state.count,
      };
    case "dec":
      return { ...state, count: state.count - 1 };
    case "abs":
      return {
        ...state,
        count: +action.value <= state.max ? +action.value : state.count,
      };
    default:
      return state;
  }
}



const PUT_URL = "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json";
const GET_URL = "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/praveen.json";

const apiCaller = async (url = "", method = "GET", body) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const res = await fetch(url, options).then(res => res.json());
    return res;
  } catch (e) {
    throw e;
  }
};




function App({ initialValue = 1, max = 1000 }) {

  const [counter, dispatchCounter] = useReducer(reducer, {
    ...initState,
    count: initialValue, max ,
  });

  const [isSave, setIsSave] = useState(false);
  const countValFromGet = useRef(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await apiCaller(GET_URL);
        if (value && value !== null) {
          countValFromGet.current = value;
          dispatchCounter({
            type: "absolute",
            value,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [dispatchCounter]);

  const onIncrement = () => dispatchCounter({ type: "inc" });
  const onDecrement = () => dispatchCounter({ type: "dec" });
  const onChange = e =>
    dispatchCounter({ type: "abs", value: e.target.value });

  const insertCount = useRef(
    debounce(async count => {
      try {
        setIsSave(true);
        await apiCaller(PUT_URL, "PUT", { praveen: count });
      } catch (e) {
        console.log("Unable to save ", e);
      } finally {
        setIsSave(false);
      }
    }, 500)
  ).current;

  useEffect(() => {
    if (countValFromGet.current !== counter.count)
      insertCount(counter.count);
  }, [counter.count, insertCount]);

  return (
    <div className="App">
      <div className="count-app">
        <div
          className="loader-state"
          style={isSave ? {} : { visibility: "hidden" }}
        >
          <div className="loader"></div>
          <p>Saving counter value</p>
        </div>
        <Counter
          count={counter.count}
          max={counter.max}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          onChange={onChange}
        />
        <p>Counter value : {counter.count}</p>
      </div>
    </div>
  );
}

export default App;
