import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import Navbar from "./components/sections/Navbar";
import Photos from "./components/sections/Photos";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Photos />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
