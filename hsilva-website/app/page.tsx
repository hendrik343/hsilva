import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import ComoFunciona from '@/components/sections/ComoFunciona'
import QuemTemDireito from '@/components/sections/QuemTemDireito'
import HuamboVideoSection from '@/components/sections/HuamboVideo'
import Servicos from '@/components/sections/Servicos'
import Porque from '@/components/sections/Porque'
import Contacto from '@/components/sections/Contacto'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div id="top" className="relative">
      <Header />
      <main>
        <Hero />
        <Stats />
        <ComoFunciona />
        <QuemTemDireito />
        <HuamboVideoSection />
        <Servicos />
        <Porque />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
