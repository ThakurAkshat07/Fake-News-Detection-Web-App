import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [newsBox, setNewsBox] = useState("");
  const [message, setMessage] = useState(
    "Predict any news using our app......"
  );
  const [appState, setAppState] = useState(0);
  const [newsCollection, setNewsCollection] = useState([]);
  const makePrediction = async () => {
    setMessage("Waiting for the prediction.........");
    setAppState(1);
    let inputNews = newsBox;
    await axios
      .get(`/predict/${encodeURIComponent(inputNews)}`)
      .then((response) => {
        console.log(response);
        let val = response?.data.prediction === "1" ? 1 : 0;
        setNewsCollection([
          ...newsCollection,
          {
            news: inputNews,
            result: val,
          },
        ]);
        if (val === 1) {
          setAppState(2);
          setMessage("The entered news is real news");
        } else {
          setAppState(3);
          setMessage("The entered news is false news");
        }
      })
      .catch((err) => {
        setAppState(0);
        setMessage("Could not fetch the result, please try again...");
        console.log(err);
      });
    setTimeout(() => {
      setAppState(0);
      setMessage("Predict any news using our app......");
      setNewsBox("");
    }, 2000);
  };
  return (
    <div className="App">
      <div className="newsArea">
        <div
          className="message"
          style={{
            color: `${
              appState === 2 ? "green" : appState === 3 ? "red" : "black"
            }`,
          }}
        >
          {message}
        </div>
        <textarea
          type="text"
          name="news"
          value={newsBox}
          onChange={(event) => {
            setNewsBox(event.target.value);
          }}
        />
        <button
          onClick={() => {
            makePrediction();
          }}
        >
          {appState === 1 ? "Predicting..." : "Make Prediction"}
        </button>
      </div>
      <div className="history"></div>
    </div>
  );
}

export default App;
