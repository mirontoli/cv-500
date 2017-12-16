import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/App";
// import * as firebase from "firebase";
import registerServiceWorker from "./registerServiceWorker";

// const config = {
//   apiKey: "AIzaSyArKVBI6tJZqxYfm5vqFmtIqEIBwKAGjIA",
//   authDomain: "cv500ru.firebaseapp.com",
//   databaseURL: "https://cv500ru.firebaseio.com",
//   projectId: "cv500ru",
//   storageBucket: "cv500ru.appspot.com",
//   messagingSenderId: "154321306293"
// };
// firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
