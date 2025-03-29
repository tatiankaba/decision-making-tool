import App from "./components/app";
import "./normalize.css";
import navigateToPage from "./utils/navigate-to";
import handleHashChange from "./utils/handle-hash-events";

new App();

navigateToPage("/#/");

window.addEventListener("DOMContentLoaded", handleHashChange);
window.addEventListener("hashchange", handleHashChange);
