import { useEffect, useRef } from "react";

export default function FashionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    // Palette
    const COLORS = [
      "rgba(99,102,241,VAL)",   // indigo
      "rgba(168,85,247,VAL)",   // purple
      "rgba(236,72,153,VAL)",   // pink
      "rgba(59,130,246,VAL)",   // blue
    ];

    class Item {
      x: number;
      y: number;
      size: number;
      speed: number;
      type: string;
      opacity: number;
      rotation: number;
      rotSpeed: number;
      color: string;

      constructor(randomY = true) {
        this.size = Math.random() * 28 + 18;
        this.x = Math.random() * W();
        this.y = randomY ? Math.random() * H() : H() + this.size * 2;
        this.speed = Math.random() * 0.5 + 0.15;
        this.opacity = Math.random() * 0.18 + 0.06;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.008;
        const types = ["shirt", "shoe", "bag", "hanger", "diamond"];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)].replace("VAL", String(this.opacity));
      }

      reset() {
        this.size = Math.random() * 28 + 18;
        this.x = Math.random() * W();
        this.y = H() + this.size * 2;
        this.speed = Math.random() * 0.5 + 0.15;
        this.opacity = Math.random() * 0.18 + 0.06;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.008;
        const types = ["shirt", "shoe", "bag", "hanger", "diamond"];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)].replace("VAL", String(this.opacity));
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        const s = this.size;

        switch (this.type) {
          case "shirt": {
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.5);
            ctx.lineTo(-s * 0.3, -s * 0.3);
            ctx.lineTo(-s * 0.5, -s * 0.5);
            ctx.lineTo(-s * 0.7, -s * 0.2);
            ctx.lineTo(-s * 0.4, 0);
            ctx.lineTo(-s * 0.4, s * 0.5);
            ctx.lineTo(s * 0.4, s * 0.5);
            ctx.lineTo(s * 0.4, 0);
            ctx.lineTo(s * 0.7, -s * 0.2);
            ctx.lineTo(s * 0.5, -s * 0.5);
            ctx.lineTo(s * 0.3, -s * 0.3);
            ctx.closePath();
            ctx.stroke();
            break;
          }
          case "shoe": {
            ctx.beginPath();
            ctx.moveTo(-s * 0.5, s * 0.15);
            ctx.bezierCurveTo(-s * 0.5, -s * 0.3, s * 0.1, -s * 0.45, s * 0.2, -s * 0.1);
            ctx.lineTo(s * 0.5, -s * 0.1);
            ctx.bezierCurveTo(s * 0.6, -s * 0.1, s * 0.6, s * 0.2, s * 0.5, s * 0.2);
            ctx.lineTo(-s * 0.5, s * 0.2);
            ctx.closePath();
            ctx.stroke();
            // sole
            ctx.beginPath();
            ctx.moveTo(-s * 0.5, s * 0.2);
            ctx.lineTo(s * 0.5, s * 0.2);
            ctx.stroke();
            break;
          }
          case "bag": {
            // body
            ctx.strokeRect(-s * 0.4, -s * 0.3, s * 0.8, s * 0.7);
            // handle
            ctx.beginPath();
            ctx.arc(0, -s * 0.3, s * 0.22, Math.PI, 0);
            ctx.stroke();
            // clasp
            ctx.beginPath();
            ctx.arc(0, s * 0.05, s * 0.07, 0, Math.PI * 2);
            ctx.stroke();
            break;
          }
          case "hanger": {
            ctx.beginPath();
            ctx.arc(0, -s * 0.4, s * 0.1, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.3);
            ctx.lineTo(0, -s * 0.1);
            ctx.lineTo(-s * 0.5, s * 0.3);
            ctx.lineTo(s * 0.5, s * 0.3);
            ctx.lineTo(0, -s * 0.1);
            ctx.stroke();
            break;
          }
          case "diamond": {
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.5);
            ctx.lineTo(s * 0.4, 0);
            ctx.lineTo(0, s * 0.5);
            ctx.lineTo(-s * 0.4, 0);
            ctx.closePath();
            ctx.stroke();
            // inner
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.25);
            ctx.lineTo(s * 0.2, 0);
            ctx.lineTo(0, s * 0.25);
            ctx.lineTo(-s * 0.2, 0);
            ctx.closePath();
            ctx.stroke();
            break;
          }
        }
        ctx.restore();
      }

      update() {
        this.y -= this.speed;
        this.rotation += this.rotSpeed;
        if (this.y < -this.size * 2) this.reset();
        this.draw();
      }
    }

    const COUNT = Math.min(35, Math.floor((W() * H()) / 28000));
    const items: Item[] = Array.from({ length: COUNT }, () => new Item());

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, W(), H());
      items.forEach(it => it.update());
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      resize();
      // redistribute items after resize
      items.forEach(it => {
        if (it.x > W()) it.x = Math.random() * W();
        if (it.y > H()) it.y = Math.random() * H();
      });
    };
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "linear-gradient(135deg, #faf9ff 0%, #eef2ff 50%, #fdf4ff 100%)",
      }}
    />
  );
}