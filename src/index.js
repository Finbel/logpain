import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FirebaseAppProvider } from "reactfire";

const firebaseConfig = {
  apiKey: "AIzaSyBS94b0-stcifeAUxCJmKwuLTyGdWgXRE8",
  authDomain: "log-pain.firebaseapp.com",
  projectId: "log-pain",
  databaseURL:
    "https://log-pain-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "log-pain.appspot.com",
  messagingSenderId: "319120349529",
  appId: "1:319120349529:web:3344ba51005f3753a51448",
  measurementId: "G-20DX1RRWSR",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
