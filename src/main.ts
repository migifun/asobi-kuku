import "./style.css";
import { init } from "./ui";

init();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
