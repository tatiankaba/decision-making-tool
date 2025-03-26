export default function navigateToPage(path: string): void {
  history.pushState({}, "page", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
