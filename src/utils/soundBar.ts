import soundFile from "./../sounds/stop-sound.mp3";

export function playMusic(): void {
  const sound = new Audio(soundFile);
  sound.play();
}
