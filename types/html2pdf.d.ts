declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: string; quality?: number };
    enableLinks?: boolean;
    html2canvas?: object;
    jsPDF?: object;
  }

  function html2pdf(): html2pdf.Html2PdfInstance;
  function html2pdf(element: HTMLElement, options?: Html2PdfOptions): html2pdf.Html2PdfInstance;

  namespace html2pdf {
    interface Html2PdfInstance {
      from(element: HTMLElement): Html2PdfInstance;
      set(options: Html2PdfOptions): Html2PdfInstance;
      save(): Promise<void>;
    }
  }

  export = html2pdf;
} 