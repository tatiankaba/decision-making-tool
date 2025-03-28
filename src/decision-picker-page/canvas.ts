import type { localStorageObject } from "../types/common";
import "./decision-picker.css";
import getChosenOptionsArray from "../utils/getChosenOptionsArray";
import generateRandomColor from "../utils/generateRandomColor";

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
  #title: string;
  #trianglePosition: number;
  #startAngle: number;
  #endAngle: number;
  #rotationAngle: number;
  #animationFrameId: number | null;

  constructor() {
    this.#wrapper = document.createElement("div");
    this.#wrapper.classList.add(CssStyles.WRAPPER);
    this.#canvas = document.createElement("canvas");
    this.#canvas.setAttribute("id", "canvas1");
    this.#canvas.classList.add(CssStyles.CANVAS);
    this.#ctx = this.#canvas.getContext("2d");
    this.#radius = 0;
    this.#startAngle = 0;
    this.#endAngle = 0;
    this.#animationFrameId = null;
    this.#rotationAngle = 0;
    this.#trianglePosition = Math.PI;
    this.#title = "No name";
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

  public getTitle(): string {
    return this.#title;
  }

  public startRotation(): void {
    if (this.#animationFrameId) return;
    this.animate();
  }

  public stopRotation(): void {
    if (this.#animationFrameId) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#animationFrameId = null;
    }
  }

  private isSegmentInTriangle(startAngle: number, endAngle: number): boolean {
    const centerX = this.#canvas.width / 2;
    const centerY = this.#canvas.height / 2 - this.#radius;
    const triangleHeight = 30;
    const vertexX = centerX;
    const vertexY = centerY - triangleHeight;
    const getAngle = (x: number, y: number): number => {
      return Math.atan2(y - centerY, x - centerX);
    };

    const angle = getAngle(vertexX, vertexY);

    const normalizedStartAngle = (startAngle + 2 * Math.PI) % (2 * Math.PI);
    const normalizedEndAngle = (endAngle + 2 * Math.PI) % (2 * Math.PI);
    const normalizedAngle = (angle + 2 * Math.PI) % (2 * Math.PI);

    if (normalizedStartAngle < normalizedEndAngle) {
      return (
        normalizedAngle >= normalizedStartAngle &&
        normalizedAngle <= normalizedEndAngle
      );
    } else {
      return (
        normalizedAngle >= normalizedStartAngle ||
        normalizedAngle <= normalizedEndAngle
      );
    }
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

      let startAngle = this.#rotationAngle;

      for (let i = 0; i < weights.length; i++) {
        const sliceAngle = (weights[i] / totalWeight) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        const radiusDecline = 10;
        const radius =
          Math.min(this.#canvas.width, this.#canvas.height) / 2 - radiusDecline;
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

        this.#ctx.fillStyle =
          i < colors.length ? colors[i] : generateRandomColor();
        this.#ctx.strokeStyle = "blue";
        this.#ctx.lineWidth = 1;
        this.#ctx.fill();
        const radiusCenter = 0.65;
        const textAngle = startAngle + sliceAngle / 2;
        const textX = centerX + Math.cos(textAngle) * (radius * radiusCenter);
        const textY = centerY + Math.sin(textAngle) * (radius * radiusCenter);
        this.#ctx.fillStyle = "black";
        this.#ctx.font = "16px Arial";
        this.#ctx.textAlign = "center";
        this.#ctx.textBaseline = "middle";
        this.#ctx.fillText(`${titles[i]}`, textX, textY);
        this.#ctx.stroke();

        if (
          this.isSegmentInTriangle(startAngle, endAngle) &&
          this.#title !== titles[i]
        ) {
          this.#title = titles[i];
        }
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

  private animate(): void {
    this.#rotationAngle += 0.01;

    this.drawCircle();
    this.drawTriangle();

    this.#animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
