import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";

import Hero from "../../components/ui/Hero/Hero";
import Features from "../../components/ui/Features/Features";
import HowItWorks from "../../components/ui/HowItWorks/HowItWorks";
import AIPrediction from "../../components/ui/AIPrediction/AIPrediction";
import Dashboard from "../../components/ui/Dashboard/Dashboard";
import Testimonials from "../../components/ui/Testimonials/Testimonials";
import CTA from "../../components/ui/CTA/CTA";
import Impact from "../../components/ui/Impact/Impact";
import FAQ from "../../components/ui/FAQ/FAQ";

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AIPrediction />
      <Dashboard />
      <Testimonials />
      <CTA />
      <Impact />
      <FAQ />
      <Footer />
    </>
  );
}

export default Landing;