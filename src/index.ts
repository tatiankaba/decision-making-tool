import App from "./components/app";
import "./normalize.css";
import clearWorkSpace from "./utils/clearWorkSpace";
import DecisionPickerPage from "./decision-picker-page/DecisionPickerPage";
import ErrorPage from "./error-page/ErrorPage";

new App();

handleHashChange();

function handleHashChange(): void {
  const page = window.location.hash.substring(1);
  clearWorkSpace();
  console.log(page);

  if (page === "/decision-picker") {
    new DecisionPickerPage();
  } else if (page === "/") {
    new App();
  } else {
    new ErrorPage();
  }
}

window.addEventListener("DOMContentLoaded", handleHashChange);
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("popstate", handleHashChange);
