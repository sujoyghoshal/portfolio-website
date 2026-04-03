import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
import ChatAssistant from '../components/ChatAssistant';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Testimonials from '../components/Testimonials';
import Payment from '../components/Payment';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <ChatAssistant />
      <Experience />
      <Projects />
      <Education />
      <Testimonials />
      <Payment />
      <Contact />
      <Footer />
    </>
  );
}
