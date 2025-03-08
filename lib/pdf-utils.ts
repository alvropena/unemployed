import html2pdf from 'html2pdf.js';

export async function downloadResume(element: HTMLElement) {
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: true,
    },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait' 
    }
  };

  return new Promise((resolve, reject) => {
    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.error('PDF generation error:', error);
        reject(error);
      });
  });
}