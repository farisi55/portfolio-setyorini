import { About } from './components/About'
import { Admin } from './components/Admin'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'
import { Testimonials } from './components/Testimonials'
import { Values } from './components/Values'

function App() {
  if (window.location.pathname === '/admin') {
    return <Admin />
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Values />
        <About />
        <Skills />
        <Gallery />
        <Experience />
        <Testimonials />
        <Stats />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
