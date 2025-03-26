import App from "./components/app";
import "./normalize.css";
import clearWorkSpace from "./utils/clearWorkSpace";
import DecisionPickerPage from "./decision-picker-page/decisionPicker";
import ErrorPage from "./error-page/ErrorPage";

new App();

window.addEventListener("popstate", () => {
  const path = window.location.pathname;

  clearWorkSpace();

  if (path === "/decision-picker") {
    return new DecisionPickerPage();
  } else if (path === "/") {
    return new App();
  } else {
    window.history.pushState({}, "", "./");
    return new ErrorPage();
  }
});
