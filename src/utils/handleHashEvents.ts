import clearWorkSpace from "./clearWorkSpace";
import DecisionPickerPage from "../decision-picker-page/DecisionPickerPage";
import ErrorPage from "../error-page/ErrorPage";
import App from "../components/app";

export default function handleHashChange(): void {
  const page = window.location.hash.substring(1);
  clearWorkSpace();

  if (page === "/decision-picker") {
    new DecisionPickerPage();
  } else if (page === "/") {
    new App();
  } else {
    new ErrorPage();
  }
}
