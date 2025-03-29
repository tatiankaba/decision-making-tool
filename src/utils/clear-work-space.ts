export default function clearWorkSpace(): void {
  while (document.body.firstElementChild) {
    document.body.firstElementChild.remove();
  }
}
