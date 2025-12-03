'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

const INITIAL_POINTS = "150,150 250,150 250,250 100,250 100,200";

const Shape7 = () => {
  const svgRef = useRef(null);
  const handleLayerRef = useRef(null);
  const polygonRef = useRef(null);
  const handleDefRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    const star = polygonRef.current;
    const handleDef = handleDefRef.current;
    const handleLayer = handleLayerRef.current;
    const output = outputRef.current;

    // Load saved points if available
    const savedPoints = JSON.parse(localStorage.getItem('polygonPoints'));
    if (savedPoints && savedPoints.length) {
      const pointsStr = savedPoints.map(p => `${p.x},${p.y}`).join(' ');
      star.setAttribute('points', pointsStr);
    }

    const numPoints = star.points.numberOfItems;

    // Create draggable handles
    for (let i = 0; i < numPoints; i++) {
      const point = star.points.getItem(i);
      createHandle(point);
    }

    function createHandle(point) {
      const handle = handleDef.cloneNode(true);
      handleLayer.appendChild(handle);
      gsap.set(handle, { x: point.x, y: point.y });

      const update = function () {
        point.x = this.x;
        point.y = this.y;
        savePoints();
        calculateLineLengths();
      };

      new Draggable(handle, {
        onDrag: update,
        onThrowUpdate: update,
        bounds: window,
        inertia: true,
        onDragEnd: calculateLineLengths,
        onThrowComplete: calculateLineLengths,
      });
    }

    function savePoints() {
      const pointsArr = [];
      for (let i = 0; i < star.points.numberOfItems; i++) {
        const p = star.points.getItem(i);
        pointsArr.push({ x: p.x, y: p.y });
      }
      localStorage.setItem('polygonPoints', JSON.stringify(pointsArr));
    }

    function calculateLineLengths() {
      let totalLength = 0;
      const sideLengths = [];
      for (let i = 0; i < star.points.numberOfItems; i++) {
        const p1 = star.points.getItem(i);
        const p2 = star.points.getItem((i + 1) % star.points.numberOfItems);
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        sideLengths.push(length.toFixed(2));
        totalLength += length;
      }
      output.innerHTML = `<strong>Updated Side Lengths:</strong><br>${sideLengths.join(
        ' px<br>'
      )}<br><br><strong>Total Perimeter:</strong> ${totalLength.toFixed(2)} px`;
    }

    // Initial calculation
    calculateLineLengths();
  }, []);

  return (
    <div className="w-full h-full relative">
      <svg
        ref={svgRef}
        id="svg"
        viewBox="0 0 400 400"
         style={{ position: 'absolute', width: '80%', height: '80%' ,border:'5px solid red'}}
      >
        <defs>
          <circle ref={handleDefRef} className="handle" r="10" />
          <linearGradient id="grad-1" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0.2" stopColor="#00bae2" />
            <stop offset="0.8" stopColor="#fec5fb" />
          </linearGradient>
        </defs>

        <polygon
          ref={polygonRef}
          id="star"
          points={INITIAL_POINTS}
          stroke="url(#grad-1)"
          fill="url(#grad-1)"
          strokeWidth="20"
          strokeLinejoin="round"
        />
        <g ref={handleLayerRef} id="handle-layer"></g>
      </svg>
      <div ref={outputRef} id="output">Line lengths will appear here…</div>
    </div>
  );
};

export default Shape7;
