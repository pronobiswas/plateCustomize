'use client'
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function ProportionalRectangle() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const widthHandleRef = useRef(null);
  const heightHandleRef = useRef(null);

  // Base width and height
  const [dimensions, setDimensions] = useState({ width: 305, height: 355 });

  // Keep original ratio
  const ratio = dimensions.height / dimensions.width;

  let baseWidth = 305;
  let baseHeight = 355;

  const updateHandles = () => {
    if (!svgRef.current || !widthHandleRef.current || !heightHandleRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Right handle
    widthHandleRef.current.style.left = rect.right - containerRect.left - 3 + 'px';
    widthHandleRef.current.style.top = rect.top - containerRect.top + 'px';
    widthHandleRef.current.style.height = rect.height + 'px';

    // Bottom handle
    heightHandleRef.current.style.left = rect.left - containerRect.left + 'px';
    heightHandleRef.current.style.top = rect.bottom - containerRect.top - 3 + 'px';
    heightHandleRef.current.style.width = rect.width + 'px';
  };

  useEffect(() => {
    updateHandles();
  }, [dimensions]);

  useEffect(() => {
    const svg = svgRef.current;

    // Width draggable (scale proportionally)
    Draggable.create(widthHandleRef.current, {
      type: 'x',
      bounds: { minX: -150, maxX: 800 },
      onDrag() {
        let newWidth = baseWidth + this.x;
        if (newWidth < 50) newWidth = 50;
        let newHeight = newWidth * ratio;

        gsap.set(svg, { width: newWidth, height: newHeight });
        setDimensions({ width: newWidth, height: newHeight });
        updateHandles();
      },
      onDragEnd() {
        baseWidth = dimensions.width;
        baseHeight = dimensions.height;
        gsap.to(this.target, { x: 0, duration: 0.2 });
      }
    });

    // Height draggable (scale proportionally)
    Draggable.create(heightHandleRef.current, {
      type: 'y',
      bounds: { minY: -150, maxY: 800 },
      onDrag() {
        let newHeight = baseHeight + this.y;
        if (newHeight < 50) newHeight = 50;
        let newWidth = newHeight / ratio;

        gsap.set(svg, { width: newWidth, height: newHeight });
        setDimensions({ width: newWidth, height: newHeight });
        updateHandles();
      },
      onDragEnd() {
        baseWidth = dimensions.width;
        baseHeight = dimensions.height;
        gsap.to(this.target, { y: 0, duration: 0.2 });
      }
    });

    window.addEventListener('resize', updateHandles);
    return () => window.removeEventListener('resize', updateHandles);
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex justify-center items-center bg-gray-200"
    >
      {/* Live dimensions */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-lg z-10">
        <p><strong>Width:</strong> {dimensions.width.toFixed(0)} px</p>
        <p><strong>Height:</strong> {dimensions.height.toFixed(0)} px</p>
        <p><strong>Ratio:</strong> {ratio.toFixed(2)}</p>
      </div>

      {/* SVG Rectangle */}
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 3005 4355"
      >
        <rect width="3005" height="4355" fill="#D9D9D9" />
      </svg>

      {/* Width Handle */}
      <div
        ref={widthHandleRef}
        style={{
          width: '6px',
          background: '#444',
          cursor: 'ew-resize',
          position: 'absolute',
          zIndex: 20,
        }}
      ></div>

      {/* Height Handle */}
      <div
        ref={heightHandleRef}
        style={{
          height: '6px',
          background: '#444',
          cursor: 'ns-resize',
          position: 'absolute',
          zIndex: 20,
        }}
      ></div>
    </div>
  );
}
