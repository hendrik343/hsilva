import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import Stats from './components/Stats'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="bg-bg text-text-primary min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Stats />
        <Contact />
      </main>
    </div>
  )
}
