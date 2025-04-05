
import React from "react";
import ROICalculator from "@/components/ROICalculator";
import ROIExplanation from "@/components/ROIExplanation";
import { BadgeIndianRupee, BarChart2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Verde Insights ROI Calculator
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90">
            Make informed financial decisions with our professional ROI calculator.
            Visualize your returns and optimize your investments with ease.
          </p>
          <div className="flex justify-center mt-8 space-x-6">
            <div className="flex items-center space-x-2">
              <BadgeIndianRupee size={24} className="text-accent" />
              <span className="text-white/80">Indian Rupee</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart2 size={24} className="text-accent" />
              <span className="text-white/80">Interactive Charts</span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <section className="mb-16">
          <ROICalculator />
        </section>
        
        <section>
          <ROIExplanation />
        </section>
      </main>
      
      <footer className="bg-primary text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Verde Insights</h3>
              <p className="text-white/80">
                Empowering businesses with data-driven financial tools and insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-white/80">
                <li>ROI Calculator</li>
                <li>Investment Guides</li>
                <li>Financial Planning</li>
                <li>Business Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-white/80">
                <li>About Us</li>
                <li>Our Services</li>
                <li>Contact</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-white/80">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Disclaimer</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>© {new Date().getFullYear()} Verde Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
