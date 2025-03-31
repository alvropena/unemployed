"use client";
import { useState } from 'react';

export function usePDF() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async (element: HTMLElement) => {
    setIsDownloading(true);
    try {
      // Create a wrapper with explicit styles
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        background-color: rgb(255, 255, 255) !important;
        color: rgb(0, 0, 0) !important;
        width: 100%;
        height: 100%;
      `;
      
      // Clone and modify the element
      const clone = element.cloneNode(true) as HTMLElement;

      // Force all elements to use RGB colors
      const forceRGBColors = (element: HTMLElement) => {
        // Apply styles directly with !important
        element.style.cssText += `
          background-color: rgb(255, 255, 255) !important;
          color: rgb(0, 0, 0) !important;
          border-color: rgb(0, 0, 0) !important;
          fill: rgb(0, 0, 0) !important;
          stroke: rgb(0, 0, 0) !important;
        `;
      };

      // Apply RGB colors to all elements
      clone.querySelectorAll('*').forEach(el => {
        if (el instanceof HTMLElement) {
          forceRGBColors(el);
        }
      });
      // Apply to root element as well
      forceRGBColors(clone);
      
      wrapper.appendChild(clone);
      wrapper.style.display = 'none'; // Hide the wrapper
      document.body.appendChild(wrapper);

      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf()
        .set({
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            removeContainer: true
          },
          jsPDF: { 
            unit: 'in', 
            format: 'letter', 
            orientation: 'portrait',
            compress: true
          }
        })
        .from(wrapper)
        .save();

      // Clean up
      document.body.removeChild(wrapper);
      return true;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadPDF, isDownloading };
} 