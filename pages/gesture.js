import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default function Gesture() {
  // const [showCamera, setShowCamera] = useState(true)
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState([]);
  const [addText, setAddText] = useState(false);
  const [train, setTrain] = useState(false);
  const [counter, setCounter] = useState(3);
  const [showCounter, setShowCounter] = useState(true);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 200,
      height: 150,
    });
    console.log(imgSrc);
    setImgSrc((prev) => [...prev, imageSrc]);
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    if (addText) {
      const timer = setTimeout(() => {
        setCounter(3);
        capture();
      }, 3000);
      counter > 0 && imgSrc.length < 5 && setTimeout(() => setCounter(counter - 1), 1000);
      console.log(timer);
      if (imgSrc.length == 5) {
        setTrain(true);
      }
      if (imgSrc.length >= 5) {
        setShowCounter(false)
        clearTimeout(timer);
      }
      return () => clearTimeout(timer);
    }
  }, [imgSrc, addText, counter]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Add a new gesture and Labeling</h1>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <div style={{ marginTop: "20px" }}>
          <InputGroup className="mb-3">
            <FormControl placeholder="Gesture meaning" />
          </InputGroup>
        </div>
        {!addText && (
          <Button onClick={() => setAddText(true)} variant="primary">
            Add Gesture
          </Button>
        )}
        {showCounter && <div>
          <p style={{ fontSize: "2em" }}>
            {counter == 0 ? "Taking photo..." : "Timer:" + counter}
          </p>
        </div>}
        {imgSrc && imgSrc.length > 0 && (
          <div style={{ display: "flex" }}>
            {imgSrc.map((im) => (
              <div style={{ flex: "25%", padding: "15px" }}>
                <img src={im} />
              </div>
            ))}
          </div>
        )}

        {train && (
          <Button href="/gesture" variant="primary">
            Add Gesture and Labeling
          </Button>
        )}
      </main>
    </div>
  );
}
