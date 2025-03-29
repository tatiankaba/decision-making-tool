import "./utils.css";

export default function showNotification(message: string): void {
  const notificationBlock: HTMLElement = document.createElement("div");
  notificationBlock.classList.add("notification-msg");
  notificationBlock.textContent = message;
  document.body.append(notificationBlock);
  setTimeout(() => {
    notificationBlock.remove();
  }, 2000);
}
