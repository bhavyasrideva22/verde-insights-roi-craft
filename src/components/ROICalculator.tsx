
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  calculateROI, 
  formatIndianRupee, 
  formatPercentage, 
  formatYears 
} from "@/utils/calculatorUtils";
import { ROIChart } from "@/components/ROIChart";
import { ROIResults } from "@/components/ROIResults";
import { EmailForm } from "@/components/EmailForm";
import { Download, Mail } from "lucide-react";
import { generateROIPDF, sendResultsEmail } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

const ROICalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000000);
  const [expectedReturn, setExpectedReturn] = useState<number>(15);
  const [durationYears, setDurationYears] = useState<number>(5);
  const [annualCosts, setAnnualCosts] = useState<number>(50000);
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const {
    totalROI,
    totalReturn,
    annualizedROI,
    costSavings,
    paybackPeriod,
    monthlyDataPoints
  } = calculateROI(investmentAmount, expectedReturn, durationYears, annualCosts);

  const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    if (!isNaN(value)) {
      setInvestmentAmount(value);
    } else {
      setInvestmentAmount(0);
    }
  };

  const handleExpectedReturnChange = (value: number[]) => {
    setExpectedReturn(value[0]);
  };

  const handleDurationChange = (value: number[]) => {
    setDurationYears(value[0]);
  };

  const handleAnnualCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    if (!isNaN(value)) {
      setAnnualCosts(value);
    } else {
      setAnnualCosts(0);
    }
  };

  const handleDownloadPDF = async () => {
    if (!resultsRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const roiData = {
        initialInvestment: investmentAmount,
        expectedReturn,
        durationYears,
        annualCosts,
        totalROI,
        totalReturn,
        annualizedROI,
        costSavings,
        paybackPeriod
      };
      
      const pdfDataUrl = await generateROIPDF("roi-results", roiData, name);
      
      // Create a link element to download the PDF
      const link = document.createElement("a");
      link.href = pdfDataUrl;
      link.download = "Verde-Insights-ROI-Calculator-Results.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "PDF Generated Successfully",
        description: "Your ROI calculation report has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to send the results.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSendingEmail(true);
    
    try {
      const roiData = {
        initialInvestment: investmentAmount,
        expectedReturn,
        durationYears,
        annualCosts,
        totalROI,
        totalReturn,
        annualizedROI,
        costSavings,
        paybackPeriod
      };
      
      const pdfDataUrl = await generateROIPDF("roi-results", roiData, name, email);
      const success = await sendResultsEmail(email, name, pdfDataUrl, roiData);
      
      if (success) {
        toast({
          title: "Email Sent Successfully",
          description: `Your ROI calculation results have been sent to ${email}.`,
        });
        setShowEmailForm(false);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Email Failed",
        description: "There was an error sending your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <Card className="card-shadow">
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle className="text-2xl">ROI Calculator</CardTitle>
              <CardDescription className="text-white/80">
                Estimate your return on investment with precision
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="investment-amount">Initial Investment (₹)</Label>
                  <Input
                    id="investment-amount"
                    type="text"
                    value={investmentAmount.toLocaleString('en-IN')}
                    onChange={handleInvestmentAmountChange}
                    className="calculator-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
                    <span className="font-medium">{expectedReturn}%</span>
                  </div>
                  <Slider
                    id="expected-return"
                    min={1}
                    max={50}
                    step={0.5}
                    value={[expectedReturn]}
                    onValueChange={handleExpectedReturnChange}
                    className="calculator-slider"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="duration">Duration (Years)</Label>
                    <span className="font-medium">{durationYears} years</span>
                  </div>
                  <Slider
                    id="duration"
                    min={1}
                    max={20}
                    step={1}
                    value={[durationYears]}
                    onValueChange={handleDurationChange}
                    className="calculator-slider"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="annual-costs">Annual Costs (₹)</Label>
                  <Input
                    id="annual-costs"
                    type="text"
                    value={annualCosts.toLocaleString('en-IN')}
                    onChange={handleAnnualCostsChange}
                    className="calculator-input"
                  />
                </div>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pt-4">
                  <Button 
                    onClick={() => setShowEmailForm(true)}
                    className="flex items-center space-x-2 bg-secondary text-charcoal hover:bg-secondary/90"
                  >
                    <Mail size={18} />
                    <span>Email Results</span>
                  </Button>
                  <Button 
                    onClick={handleDownloadPDF}
                    className="flex items-center space-x-2 bg-accent text-charcoal hover:bg-accent/90"
                    disabled={isGeneratingPDF}
                  >
                    <Download size={18} />
                    <span>{isGeneratingPDF ? "Generating..." : "Download PDF"}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {showEmailForm && (
            <EmailForm
              name={name}
              email={email}
              setName={setName}
              setEmail={setEmail}
              onCancel={() => setShowEmailForm(false)}
              onSubmit={handleSendEmail}
              isLoading={isSendingEmail}
            />
          )}
        </div>
        
        <div className="lg:col-span-7" id="roi-results" ref={resultsRef}>
          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="chart">Visualization</TabsTrigger>
            </TabsList>
            
            <TabsContent value="results" className="mt-0">
              <ROIResults
                totalROI={totalROI}
                totalReturn={totalReturn}
                annualizedROI={annualizedROI}
                costSavings={costSavings}
                paybackPeriod={paybackPeriod}
                initialInvestment={investmentAmount}
              />
            </TabsContent>
            
            <TabsContent value="chart" className="mt-0">
              <Card className="card-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">ROI Visualization</CardTitle>
                  <CardDescription>
                    Graphical representation of your investment growth over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ROIChart 
                    dataPoints={monthlyDataPoints} 
                    durationYears={durationYears}
                    initialInvestment={investmentAmount}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
