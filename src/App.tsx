import { About } from './components/About'
import { Admin } from './components/Admin'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'

function App() {
  if (window.location.pathname === '/admin') {
    return <Admin />
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Gallery />
        <Experience />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
