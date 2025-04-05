
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type ROIData = {
  initialInvestment: number;
  expectedReturn: number;
  durationYears: number;
  annualCosts: number;
  totalROI: number;
  totalReturn: number;
  annualizedROI: number;
  costSavings: number;
  paybackPeriod: number;
};

/**
 * Generate a PDF with ROI calculation results
 */
export const generateROIPDF = async (
  elementId: string,
  data: ROIData,
  userName: string = "",
  userEmail: string = ""
): Promise<string> => {
  // Create a new PDF document
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Get the element to capture
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Element not found");
  }
  
  try {
    // Capture the element as an image using html2canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL("image/png");
    
    // Add branding header
    pdf.setFillColor(36, 94, 79); // Primary color
    pdf.rect(0, 0, pageWidth, 30, "F");
    
    // Add logo/title text
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("Verde Insights", 15, 15);
    pdf.setFontSize(14);
    pdf.text("ROI Calculator Results", 15, 23);
    
    // Add current date
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-IN");
    pdf.setFontSize(10);
    pdf.text(`Generated on: ${dateStr}`, pageWidth - 60, 15);
    
    if (userName) {
      pdf.text(`Prepared for: ${userName}`, pageWidth - 60, 22);
    }
    
    // Add summary content
    pdf.setTextColor(51, 51, 51);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    
    let yPosition = 40;
    
    // Add title and description
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("ROI Calculation Summary", 15, yPosition);
    yPosition += 10;
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text("This report summarizes the Return on Investment calculation based on your inputs.", 15, yPosition);
    yPosition += 10;
    
    // Add input parameters section
    pdf.setFillColor(242, 242, 242);
    pdf.rect(15, yPosition, pageWidth - 30, 30, "F");
    
    pdf.setFont("helvetica", "bold");
    pdf.text("Input Parameters:", 20, yPosition + 8);
    pdf.setFont("helvetica", "normal");
    
    const formatCurrency = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
    
    pdf.text(`Initial Investment: ${formatCurrency.format(data.initialInvestment)}`, 25, yPosition + 16);
    pdf.text(`Expected Annual Return: ${data.expectedReturn.toFixed(2)}%`, 25, yPosition + 24);
    pdf.text(`Duration: ${data.durationYears} years`, pageWidth - 100, yPosition + 16);
    pdf.text(`Annual Costs: ${formatCurrency.format(data.annualCosts)}`, pageWidth - 100, yPosition + 24);
    
    yPosition += 40;
    
    // Add results section
    pdf.setFont("helvetica", "bold");
    pdf.text("Key Results:", 15, yPosition);
    yPosition += 8;
    
    // Format results in columns
    const results = [
      ["Total ROI:", `${data.totalROI.toFixed(2)}%`],
      ["Total Return:", formatCurrency.format(data.totalReturn)],
      ["Annualized ROI:", `${data.annualizedROI.toFixed(2)}%`],
      ["Cost Savings:", formatCurrency.format(data.costSavings)],
      ["Payback Period:", `${data.paybackPeriod.toFixed(1)} years`],
    ];
    
    results.forEach((row, index) => {
      pdf.setFont("helvetica", "normal");
      pdf.text(row[0], 20, yPosition);
      pdf.setFont("helvetica", "bold");
      pdf.text(row[1], 80, yPosition);
      yPosition += 8;
    });
    
    yPosition += 15;
    
    // Add the chart image
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 20, yPosition, imgWidth, imgHeight);
    
    yPosition += imgHeight + 20;
    
    // Add disclaimer and footer
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "italic");
    pdf.text("Disclaimer: This ROI calculation is an estimate based on the provided inputs. Actual returns may vary.", 15, yPosition);
    
    // Add footer with contact info
    pdf.setFillColor(36, 94, 79);
    pdf.rect(0, pageHeight - 15, pageWidth, 15, "F");
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "normal");
    pdf.text("Verde Insights | www.verdeinsights.com | contact@verdeinsights.com | +91 1234567890", pageWidth / 2, pageHeight - 6, { align: "center" });
    
    // Return the PDF as a data URL
    return pdf.output("dataurlstring");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

/**
 * Send results via email
 */
export const sendResultsEmail = (
  email: string,
  name: string,
  pdfDataUrl: string,
  data: ROIData
): Promise<boolean> => {
  // In a real implementation, this would connect to a backend service
  // For demo purposes, we'll just log the attempt and simulate success
  console.log(`Would send email to ${email} with ROI results`);
  
  // In a real application, you would:
  // 1. Call your backend API to send an email with the PDF attachment
  // 2. The API would use a service like SendGrid, AWS SES, etc.
  
  // For this demonstration, we'll just simulate success after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};
