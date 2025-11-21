'use client';

import { useEffect, useRef } from 'react';
import './HorrorCursor.scss';

export default function HorrorCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    interface Point {
      x: number;
      y: number;
    }

    const segments: Point[] = [];
    const segmentCount = 25;
    const segmentDistance = 10;

    // Initialize segments
    for (let i = 0; i < segmentCount; i++) {
      segments.push({ x: canvas.width / 2, y: canvas.height / 2 });
    }

    function animate() {
      if (!ctx || !canvas) return;

      // Trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Head follows mouse
      segments[0].x = mouseX;
      segments[0].y = mouseY;

      // Each segment follows the previous
      for (let i = 1; i < segments.length; i++) {
        const dx = segments[i].x - segments[i - 1].x;
        const dy = segments[i].y - segments[i - 1].y;
        const angle = Math.atan2(dy, dx);
        
        segments[i].x = segments[i - 1].x + Math.cos(angle) * segmentDistance;
        segments[i].y = segments[i - 1].y + Math.sin(angle) * segmentDistance;
      }

      // Draw spine and ribs
      for (let i = 0; i < segments.length - 1; i++) {
        const thickness = 6 * (1 - i / segments.length);
        
        // Spine segment
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(segments[i].x, segments[i].y);
        ctx.lineTo(segments[i + 1].x, segments[i + 1].y);
        ctx.stroke();

        // Draw legs every 4 segments
        if (i % 4 === 0 && i > 0 && i < segments.length - 5) {
          const dx = segments[i + 1].x - segments[i].x;
          const dy = segments[i + 1].y - segments[i].y;
          const angle = Math.atan2(dy, dx);

          const limbLength = 25;
          const limbAngle1 = angle + Math.PI / 2;
          const limbAngle2 = angle - Math.PI / 2;

          // Left leg
          const leg1x = segments[i].x + Math.cos(limbAngle1) * limbLength;
          const leg1y = segments[i].y + Math.sin(limbAngle1) * limbLength;

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(segments[i].x, segments[i].y);
          ctx.lineTo(leg1x, leg1y);
          ctx.stroke();

          // Left claw
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(leg1x, leg1y);
          ctx.lineTo(leg1x + Math.cos(limbAngle1 + 0.5) * 8, leg1y + Math.sin(limbAngle1 + 0.5) * 8);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(leg1x, leg1y);
          ctx.lineTo(leg1x + Math.cos(limbAngle1 - 0.5) * 8, leg1y + Math.sin(limbAngle1 - 0.5) * 8);
          ctx.stroke();

          // Right leg
          const leg2x = segments[i].x + Math.cos(limbAngle2) * limbLength;
          const leg2y = segments[i].y + Math.sin(limbAngle2) * limbLength;

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(segments[i].x, segments[i].y);
          ctx.lineTo(leg2x, leg2y);
          ctx.stroke();

          // Right claw
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(leg2x, leg2y);
          ctx.lineTo(leg2x + Math.cos(limbAngle2 + 0.5) * 8, leg2y + Math.sin(limbAngle2 + 0.5) * 8);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(leg2x, leg2y);
          ctx.lineTo(leg2x + Math.cos(limbAngle2 - 0.5) * 8, leg2y + Math.sin(limbAngle2 - 0.5) * 8);
          ctx.stroke();
        }
      }

      // Draw head with glowing red eyes
      const headDx = segments[1].x - segments[0].x;
      const headDy = segments[1].y - segments[0].y;
      const headAngle = Math.atan2(headDy, headDx);

      const eye1X = segments[0].x - Math.cos(headAngle) * 8 + Math.cos(headAngle + Math.PI / 2) * 4;
      const eye1Y = segments[0].y - Math.sin(headAngle) * 8 + Math.sin(headAngle + Math.PI / 2) * 4;

      const eye2X = segments[0].x - Math.cos(headAngle) * 8 + Math.cos(headAngle - Math.PI / 2) * 4;
      const eye2Y = segments[0].y - Math.sin(headAngle) * 8 + Math.sin(headAngle - Math.PI / 2) * 4;

      ctx.fillStyle = '#ff0000';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ff0000';

      ctx.beginPath();
      ctx.arc(eye1X, eye1Y, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(eye2X, eye2Y, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="reptile-canvas" />;
}
