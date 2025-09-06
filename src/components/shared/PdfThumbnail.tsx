// "use client";

// import { useEffect, useRef } from "react";
// import * as pdfjsLib from 'pdfjs-dist';
// import { imgUrl } from "@/app/(dashboard)/layout";

// // Set the worker source for pdf.js
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// interface PdfThumbnailProps {
//   pdfUrl: string;
//   width?: number;
//   height?: number;
// }

// const PdfThumbnail: React.FC<PdfThumbnailProps> = ({
//   pdfUrl,
//   width = 100,
//   height = 100,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const renderThumbnail = async () => {
//       try {
//         // Prepend imgUrl to the pdfUrl if needed
//         const fullUrl = pdfUrl.startsWith("http")
//           ? pdfUrl
//           : `${imgUrl}${pdfUrl}`;

//         // Load the PDF document
//         const pdf = await pdfjsLib.getDocument(fullUrl).promise;

//         // Get the first page
//         const page = await pdf.getPage(1);

//         // Set up the viewport for rendering
//         const viewport = page.getViewport({ scale: 1.0 });
//         const scale = Math.min(
//           width / viewport.width,
//           height / viewport.height
//         );
//         const scaledViewport = page.getViewport({ scale });

//         // Get the canvas element
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const context = canvas.getContext("2d");
//         if (!context) return;

//         // Set canvas dimensions
//         canvas.width = scaledViewport.width;
//         canvas.height = scaledViewport.height;

//         // Render the PDF page to the canvas
//         await page.render({
//           canvas: null,
//           canvasContext: context,
//           viewport: scaledViewport,
//         }).promise;
//       } catch (error) {
//         console.error("Error rendering PDF thumbnail:", error);
//       }
//     };

//     renderThumbnail();
//   }, [pdfUrl, width, height]);

//   return (
//     <div className="flex justify-center items-center">
//       <canvas ref={canvasRef} width={width} height={height} />
//     </div>
//   );
// };

// export default PdfThumbnail;
