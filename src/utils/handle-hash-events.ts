import clearWorkSpace from "./clear-work-space";
import DecisionPickerPage from "../decision-picker-page/decision-picker-page";
import ErrorPage from "../error-page/error-page";
import App from "../components/app";

export default function handleHashChange(): void {
  const page = window.location.hash.slice(1);
  clearWorkSpace();

  if (page === "/decision-picker") {
    new DecisionPickerPage();
  } else if (page === "/") {
    new App();
  } else {
    new ErrorPage();
  }
}
