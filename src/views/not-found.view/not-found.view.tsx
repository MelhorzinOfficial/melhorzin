import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function NotFoundView() {
  return (
    <section className="bg-black text-white flex-col flex h-screen justify-center items-center">
      <div className="flex items-center justify-center relative">
        <span className="text-[400px] mr-32 leading-none">4</span>
        <div className="absolute">
          <Image
            src="/img/not-found.png"
            width={400}
            height={400}
            alt="404"
          />
        </div>
        <span className="text-[400px] ml-20 leading-none">4</span>
      </div>
      <div className="text-primary text-3xl font-bold mt-4">
        Oooops... Página não encontrada
      </div>
      <Button className="mt-8">Começar Novamente</Button>
    </section>
  )
}
