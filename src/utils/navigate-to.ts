import handleHashChange from "./handle-hash-events";

export default function navigateToPage(path: string): void {
  history.pushState({}, "page", path);
  handleHashChange();
}
