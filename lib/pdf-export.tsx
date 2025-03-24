export function exportResumeToPDF() {
	try {
		// Add print-specific styles
		const style = document.createElement("style");
		style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap');
      
      @page {
        margin: 0.75in 0.75in 0.75in 0.75in;
        size: A4;
        /* Remove header and footer */
        margin-top: 0.75in !important;
        margin-bottom: 0.75in !important;
        marks: none;
      }
      @media print {
        body * {
          visibility: hidden;
        }
        #resume-preview, #resume-preview * {
          visibility: visible;
        }
        #resume-preview {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          width: 8.27in; /* A4 width */
          min-height: 0 !important;
          height: auto !important;
          max-height: 11.69in !important; /* A4 height */
          padding: 0.5in;
          margin: 0 auto;
          overflow: hidden !important; /* Hide overflow to ensure one page */
          box-sizing: border-box;
          font-family: 'Times New Roman', serif !important;
          font-size: 11pt;
          line-height: 1.3;
          color: rgb(0, 0, 0);
          page-break-after: avoid;
          page-break-before: avoid;
        }
        
        /* Force content to fit on one page */
        #resume-preview {
          max-height: 11.69in !important;
          overflow: hidden !important;
        }
        
        /* Ensure no page breaks within elements */
        #resume-preview * {
          page-break-inside: avoid;
        }
        
        /* Prevent second page */
        @page {
          size: A4;
          margin: 0.75in;
        }
        
        /* Additional styles to ensure one page */
        html, body {
          height: 11.69in;
          overflow: hidden;
        }
        
        /* Adjust spacing to be more compact */
        #resume-preview h2 {
          margin-top: 8pt;
          margin-bottom: 4pt;
        }
        
        #resume-preview ul {
          margin-top: 1pt;
          margin-bottom: 1pt;
        }
        
        #resume-preview li {
          margin-bottom: 1pt;
        }
      }
    `;
		document.head.appendChild(style);

		// Set data attribute for header
		const resumePreview = document.getElementById("resume-preview");
		if (resumePreview) {
			// Scale content to fit on one page if needed
			const contentHeight = resumePreview.scrollHeight;
			const maxHeight = 11.69 * 96 - 96; // A4 height in pixels (96 DPI) minus margins

			if (contentHeight > maxHeight) {
				const scale = maxHeight / contentHeight;
				document.documentElement.style.setProperty("--scale", scale.toString());
				resumePreview.style.transform = `translateX(-50%) scale(${scale})`;
				resumePreview.style.transformOrigin = "top center";
			}
		}

		// Use window.print() for PDF generation
		window.print();

		// Clean up
		document.head.removeChild(style);
		if (resumePreview) {
			resumePreview.style.transform = "";
			resumePreview.style.transformOrigin = "";
		}
		document.documentElement.style.removeProperty("--scale");

		return true;
	} catch (error) {
		console.error("Error exporting PDF:", error);
		return false;
	}
}
