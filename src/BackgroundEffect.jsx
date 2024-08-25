import React, { useEffect } from "react";
import "./BackgroundEffect.css";

const BackgroundEffect = () => {
  useEffect(() => {
    const container = document.querySelector(".background-effect-container");

    const handleMouseMove = (e) => {
      let c = new Circle();
      c.draw(e.clientX, e.clientY);
      setTimeout(() => {
        c.circle.remove();
      }, 1000);
    };

    class Circle {
      constructor() {
        this.circle = document.createElement("div");
        this.colors = [
          "#03045e",
          "#023e8a",
          "#0077b6",
          "#0096c7",
          "#00b4d8",
          "#90e0ef",
          "#ade8f4",
        ];
      }

      draw(x, y) {
        this.circle.classList.add("circle");
        this.circle.style.top = `${y}px`;
        this.circle.style.left = `${x}px`;
        this.circle.style.background = `${
          this.colors[Math.floor(Math.random() * this.colors.length)]
        }`;
        container.appendChild(this.circle);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="background-effect-container"></div>;
};

export default BackgroundEffect;
