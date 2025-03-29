import handleHashChange from "./handleHashEvents";

export default function navigateToPage(path: string): void {
  history.pushState({}, "page", path);
  handleHashChange();
}
