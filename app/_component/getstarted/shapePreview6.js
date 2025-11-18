'use client'
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const ShapePreview6 = () => {
  const stageRef = useRef(null);
  const shapeRef = useRef(null);
  const pointRefs = useRef([]);
  const edgeRefs = useRef([]);
  const edgeTextRefs = useRef([]);
  // Initial points define a perfect rectangle
  const [points, setPoints] = useState([
    { x: 50, y: 100 },
    { x: 250, y: 100 },
    { x: 250, y: 250 },
    { x: 50, y: 250 },
  ]);
  
  const [edgeLengths, setEdgeLengths] = useState([]);

  const drawShape = () => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();

    // 1. Calculate current point positions from their DOM/GSAP transform
    const newPoints = pointRefs.current.map((el) => {
      const rect = el.getBoundingClientRect();
       return {
         // Calculate center point relative to the stage
         x: rect.left - stageRect.left + rect.width / 2,
         y: rect.top - stageRect.top + rect.height / 2,
       };
    });
    
    // 2. Generate and set the SVG path 'd' attribute
    const path =
      newPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") +
      " Z";

    shapeRef.current.setAttribute("d", path);

    const edgeLengths = [];

    // 3. Update edge midpoints and lengths
    edgeRefs.current.forEach((edge, i) => {
      const p1 = newPoints[i];
      const p2 = newPoints[(i + 1) % newPoints.length];

      // --- Line Length Calculation ---
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      edgeLengths.push(length);
      // -------------------------------

      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      
      // ===============================================
      // 📌 Logic to position label outside the rectangle
      // ===============================================
      const isHorizontalEdge = i % 2 === 0; // Edges 0 (Top) and 2 (Bottom)
      const OFFSET_DISTANCE = 30; // How far to push the label out
      
      let offsetX = 0;
      let offsetY = 0;
      let rotation = 0;

      if (isHorizontalEdge) {
        // Top Edge (i=0) or Bottom Edge (i=2)
        rotation = 0; // Keep text horizontal
        
        // Push label UP if it's the top edge (i=0), or DOWN if it's the bottom edge (i=2)
        // Note: In screen coordinates, negative Y is up.
        offsetY = (i === 0) ? -OFFSET_DISTANCE : OFFSET_DISTANCE; 
      } else {
        // Right Edge (i=1) or Left Edge (i=3)
        
        // We'll rotate the text 90 degrees to read parallel to the vertical edge.
        rotation = 90; 
        
        // Push label RIGHT if it's the right edge (i=1), or LEFT if it's the left edge (i=3)
        // Note: We need to determine if we want the text to read from bottom-to-top or top-to-bottom.
        // For right edge (i=1): Text will be pushed right (positive X).
        // For left edge (i=3): Text will be pushed left (negative X).
        offsetX = (i === 1) ? OFFSET_DISTANCE : -OFFSET_DISTANCE; 
      }
      // ===============================================
      
      // Update edge midpoint (draggable handle)
      gsap.set(edge, { x: midX, y: midY });
      
      // Position the length label
      if (edgeTextRefs.current[i]) {
        gsap.set(edgeTextRefs.current[i], {
          x: midX + offsetX,
          y: midY + offsetY,
          // Set xPercent/yPercent to -50 to center the label *on* the new offset point
          xPercent: -50,
          yPercent: -50,
          rotation: rotation,
        });
      }
    });

    setEdgeLengths(edgeLengths);
  };

  // === Initialize Draggable edges ===
  useEffect(() => {
    if (!stageRef.current) return;

    // Clean up old draggables
    gsap.utils.toArray([...pointRefs.current, ...edgeRefs.current]).forEach(
      (el) => Draggable.get(el)?.kill()
    );

    // Set the initial GSAP transforms for the corner points based on the initial state
    points.forEach((p, i) => {
        // Initial position is top: p.y - 9, left: p.x - 9. Set transform to match.
        gsap.set(pointRefs.current[i], { x: p.x - 9, y: p.y - 9 });
    });

    // --- Draggable edges ---
    edgeRefs.current.forEach((edge, i) => {
      Draggable.create(edge, {
        type: "x,y",
        bounds: stageRef.current,
        onPress() {
          this.startX = this.x;
          this.startY = this.y;
          this.isHorizontalEdge = i % 2 === 0;
        },
        onDrag() {
          const dx = this.x - this.startX;
          const dy = this.y - this.startY;
          
          let moveX = 0;
          let moveY = 0;
          
          if (this.isHorizontalEdge) {
            // Horizontal edges (0, 2) only allow vertical movement
            moveY = dy;
            this.update({ x: this.startX, y: this.y });
          } else {
            // Vertical edges (1, 3) only allow horizontal movement
            moveX = dx;
            this.update({ x: this.x, y: this.startY });
          }

          // Move both connected points by the constrained movement (moveX, moveY)
          const el1 = pointRefs.current[i];
          const el2 = pointRefs.current[(i + 1) % pointRefs.current.length];
          
          gsap.set([el1, el2], {
            x: `+=${moveX}`,
            y: `+=${moveY}`,
          });

          drawShape();
          
          this.startX = this.x;
          this.startY = this.y;
        },
      });
    });

    drawShape();
    
  }, [points.length]);


  return (
    <div
      ref={stageRef}
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        overflow: "hidden",
        padding: "10px",
        background: "transparent"
      }}
    >
      {/* Displaying Current Shape Dimensions */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, color: '#333', backgroundColor: 'rgba(255,255,255,0.9)', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}>
        Current Width: **{edgeLengths[0] ? edgeLengths[0].toFixed(1) : 'N/A'} px**
        <br/>
        Current Height: **{edgeLengths[1] ? edgeLengths[1].toFixed(1) : 'N/A'} px**
      </div>

      {/* SVG Shape */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path
          ref={shapeRef}
          fill="url(#grad)"
          stroke="#1e3a8a"
          strokeWidth="5"
        />
      </svg>

      {/* Edge Length Labels (A, B, C, D) */}
        {edgeLengths.map((length, i) => (
            <div
                key={`length-label-${i}`}
                ref={(el) => (edgeTextRefs.current[i] = el)}
                className="lengthIndicator"
                style={{
                    position: "absolute",
                    color: "#B91C1C", 
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "2px 5px",
                    borderRadius: "3px",
                    fontSize: "12px",
                    fontWeight: "600",
                    pointerEvents: "none",
                    zIndex: 4,
                }}
            >
                {/* Edge Name (A, B, C, D) and Length */}
                {String.fromCharCode(65 + i)}: {length.toFixed(1)} px
            </div>
        ))}

      {/* Point anchors (Visible but NOT draggable corners) */}
      {points.map((p, i) => (
        <div
          key={`point-${i}`}
          ref={(el) => (pointRefs.current[i] = el)}
          style={{
            position: "absolute",
            top: p.y - 9, 
            left: p.x - 9,
            width: "18px",
            height: "18px",
            background: "#fff",
            border: "2px solid #1e3a8a",
            borderRadius: "50%",
            cursor: "default",
            touchAction: "none",
            transform: "translate(0, 0)",
            zIndex: 5,
          }}
        ></div>
      ))}

      {/* Draggable Edges (line midpoints) */}
      {points.map((_, i) => (
        <div
          key={`edge-${i}`}
          ref={(el) => (edgeRefs.current[i] = el)}
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            width: "20px",
            height: "20px",
            background: "#1e3a8a",
            border: "2px solid #fff",
            borderRadius: "4px",
            cursor: "move",
            touchAction: "none",
            transform: "translate(-50%,-50%)",
            zIndex: 6, 
          }}
        ></div>
      ))}

    </div>
  );
};

export default ShapePreview6;