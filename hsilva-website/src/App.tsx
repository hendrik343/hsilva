import Hero from './components/Hero'
import Stats from './components/Stats'
import Work from './components/Work'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Stats />
      <Work />
      <Contact />
    </div>
  )
}
