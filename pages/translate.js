import Translate from "../components/Translate";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Button from "react-bootstrap/Button";
import Webcam from "react-webcam";

export default function Translation() {
  const [keyPressed, setKeyPressed] = useState(false);
  const [text, setText] = useState("Start Capturing");
  const [num, setNum] = useState(0);
  const result = ["Hi", "this", "is","my", "project", "thank you"];

  function downHandler({ key }) {
    setNum((prev) => {
      if (prev < 7) {
        return prev + 1;
      } else return prev;
    });
    setKeyPressed(true);
    console.log("dghdhd");
  }
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

    const startCapturing = ()=>{
      if(text == "Start Capturing"){
          setText("Stop Capturing")
      } else {
          setText("Start Capturing")
      }
    }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.ptitle}>Show the gesture to translate</p>
        <Webcam />
        {/* <div style={{ marginTop: "20px", width: "500px" }}></div> */}
        <div style={{margin:"20px"}}>
          {keyPressed &&
            result.slice(0, num).map((res) => (
              <div style={{display:"inline", padding:"15px", fontSize:"2em"}}>
                <span>{res}</span>
              </div>
            ))}
        </div>
        <Button style={{ width: "400px" }} variant="primary" onClick={startCapturing}>
         {text}
        </Button>
      </main>
    </div>
  );
}
