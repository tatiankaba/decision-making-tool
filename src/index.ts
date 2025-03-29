import App from "./components/app";
import "./normalize.css";
import navigateToPage from "./utils/navigateTO";
import handleHashChange from "./utils/handleHashEvents";

new App();

navigateToPage("/#/");

window.addEventListener("DOMContentLoaded", handleHashChange);
window.addEventListener("hashchange", handleHashChange);
