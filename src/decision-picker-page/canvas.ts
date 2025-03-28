import type { localStorageObject } from "../types/common";
import "./decision-picker.css";
import getChosenOptionsArray from "../utils/getChosenOptionsArray";

const CssStyles = {
  CANVAS: "canvas",
  WRAPPER: "canvas-wrapper",
};

const colors: string[] = [
  "red",
  "blue",
  "green",
  "yellow",
  "pink",
  "purple",
  "orange",
  "cyan",
  "magenta",
  "lime",
  "brown",
  "black",
  "gray",
  "teal",
  "navy",
  "gold",
  "silver",
  "indigo",
  "violet",
];

export default class Canvas {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D | null;
  #wrapper: HTMLElement;
  #radius: number;

  constructor() {
    this.#wrapper = document.createElement("div");
    this.#wrapper.classList.add(CssStyles.WRAPPER);
    this.#canvas = document.createElement("canvas");
    this.#canvas.setAttribute("id", "canvas1");
    this.#canvas.classList.add(CssStyles.CANVAS);
    this.#ctx = this.#canvas.getContext("2d");
    this.#radius = 0;
    this.#canvas.width = 500;
    this.#canvas.height = 500;
    this.drawCircle();
    this.drawTriangle();
    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
    this.#wrapper.append(this.#canvas);
  }

  public getElement(): HTMLElement {
    return this.#wrapper;
  }

  private resizeCanvas(): void {
    const containerSize = this.#wrapper.getBoundingClientRect();
    this.#canvas.width = containerSize.width;
    this.#canvas.height = containerSize.height;
    this.drawCircle();
    this.drawTriangle();
  }

  private drawCircle(): void {
    if (!this.#ctx) return;
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    const options: localStorageObject[] | undefined = getChosenOptionsArray();
    let totalWeight: number;
    let titles: string[];
    let weights: number[];

    if (options) {
      totalWeight = options.reduce((prev, cur) => {
        return prev + Number(cur.weight);
      }, 0);
      titles = options.map((option) => option.title ?? "No name");
      weights = options.map((option) => Number(option.weight));

      let startAngle = 0;

      for (let i = 0; i < weights.length; i++) {
        const sliceAngle = (weights[i] / totalWeight) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;

        const radius =
          Math.min(this.#canvas.width, this.#canvas.height) / 2 - 10;
        const centerX = this.#canvas.width / 2;
        const centerY = this.#canvas.height / 2;

        this.#radius = radius;

        this.#ctx.beginPath();
        this.#ctx.moveTo(centerX, centerY);
        this.#ctx.arc(
          this.#canvas.width / 2,
          this.#canvas.height / 2,
          radius,
          startAngle,
          endAngle,
        );
        this.#ctx.closePath();
        this.#ctx.font = "15px Arial";
        this.#ctx.fillStyle = "blue";

        this.#ctx.fillStyle = colors[i % colors.length];
        this.#ctx.strokeStyle = "blue";
        this.#ctx.lineWidth = 1;
        this.#ctx.fill();
        const textAngle = startAngle + sliceAngle / 2;
        const textX = centerX + Math.cos(textAngle) * (radius * 0.65);
        const textY = centerY + Math.sin(textAngle) * (radius * 0.65);
        this.#ctx.fillStyle = "black";
        this.#ctx.font = "16px Arial";
        this.#ctx.textAlign = "center";
        this.#ctx.textBaseline = "middle";
        this.#ctx.fillText(`${titles[i]}`, textX, textY);
        this.#ctx.stroke();
        startAngle = endAngle;
      }
    }
  }

  private drawTriangle(): void {
    if (!this.#ctx) return;
    const centerX = this.#canvas.width / 2;
    const centerY = this.#canvas.height / 2 - this.#radius;
    const triangleHeight = 30;
    const triangleHalfWidth = 20;
    this.#ctx.beginPath();
    this.#ctx.moveTo(centerX - triangleHalfWidth, centerY);
    this.#ctx.lineTo(centerX, centerY + triangleHeight);
    this.#ctx.lineTo(centerX + triangleHalfWidth, centerY);
    this.#ctx.closePath();
    this.#ctx.fillStyle = "black";
    this.#ctx.fill();
  }
}
