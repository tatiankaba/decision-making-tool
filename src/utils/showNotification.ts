import "./utils.css";

export default function showNotification(msg: string): void {
  const notificationBlock: HTMLElement = document.createElement("div");
  notificationBlock.classList.add("notification-msg");
  notificationBlock.textContent = msg;
  document.body.append(notificationBlock);
  setTimeout(() => {
    document.body.removeChild(notificationBlock);
  }, 2000);
}
