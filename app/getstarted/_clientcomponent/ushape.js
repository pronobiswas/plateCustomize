'use client'
import React, { useState, useRef, useEffect } from "react";

export default function ResizableRoundedShape() {
  const boxRef = useRef(null);

  // State for width, height
  const [size, setSize] = useState({ width: 300, height: 200 });

  // Top corner radius
  const [radius, setRadius] = useState(40);

  // Track which drag is active
  const [resizeSide, setResizeSide] = useState(null); 
  const [isRounding, setIsRounding] = useState(false);

  // =========================
  // Width / Height Resizing
  // =========================
  useEffect(() => {
    const handleMove = (e) => {
      if (!resizeSide) return;
      const rect = boxRef.current.getBoundingClientRect();

      if (resizeSide === "right") {
        const newWidth = Math.max(80, e.clientX - rect.left);
        setSize((prev) => ({ ...prev, width: newWidth }));
      }

      if (resizeSide === "bottom") {
        const newHeight = Math.max(50, e.clientY - rect.top);
        setSize((prev) => ({ ...prev, height: newHeight }));
      }
    };

    const stopResize = () => setResizeSide(null);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopResize);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopResize);
    };
  }, [resizeSide]);

  // =========================
  // Top-Rounding Control
  // =========================
  useEffect(() => {
    const handleRound = (e) => {
      if (!isRounding) return;
      const rect = boxRef.current.getBoundingClientRect();
      const diff = e.clientY - rect.top;
      const newRadius = Math.max(0, Math.min(diff, size.height / 2));
      setRadius(newRadius);
    };

    const stopRound = () => setIsRounding(false);

    window.addEventListener("mousemove", handleRound);
    window.addEventListener("mouseup", stopRound);

    return () => {
      window.removeEventListener("mousemove", handleRound);
      window.removeEventListener("mouseup", stopRound);
    };
  }, [isRounding, size.height]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200 relative">

      {/* =========================
          Live Width / Height / Radius Display
      ========================= */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-lg">
        <p><strong>Width:</strong> {size.width.toFixed(0)} px</p>
        <p><strong>Height:</strong> {size.height.toFixed(0)} px</p>
        <p><strong>Top Radius:</strong> {radius.toFixed(0)} px</p>
      </div>

      {/* =========================
          Resizable Box
      ========================= */}
      <div
        ref={boxRef}
        style={{
          width: size.width,
          height: size.height,
          background: "black",
          borderTopLeftRadius: radius + "px",
          borderTopRightRadius: radius + "px",
          transition: resizeSide || isRounding ? "none" : "0.2s",
        }}
        className="relative shadow-lg"
      >
        {/* Top-Round Handle */}
        <div
          onMouseDown={() => setIsRounding(true)}
          className="absolute top-5 left-1/2 -translate-x-1/2 w-5 h-5 bg-red-500/50 rounded-full cursor-pointer"
        >
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-fit h-fit bg-white text-black text-center text-sm rounded-md px-2">
                {radius.toFixed(0)}
            </div>
        </div>

        {/* Right Resize Handle (Width) */}
        <div
          onMouseDown={() => setResizeSide("right")}
          className="absolute top-1/2 -translate-y-1/2 right-1 w-3 h-5 bg-red-500/50 cursor-ew-resize"
        >
            <div className="absolute bottom-0 -left-12  w-fit h-fit bg-white text-black text-center text-sm rounded-md px-2">
                    {size.height.toFixed(0)}
                </div>
        </div>

        {/* Bottom Resize Handle (Height) */}
        <div
          onMouseDown={() => setResizeSide("bottom")}
          className="absolute bottom-0 left-0 w-full h-3 bg-red-500/50 cursor-ns-resize"
        >
            <div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-fit h-fit bg-white text-black text-center text-sm rounded-md px-2">
                    {size.width.toFixed(0)}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
