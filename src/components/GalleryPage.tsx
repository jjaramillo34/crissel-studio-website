import { useState } from 'react'

const images = [
  'extensiones-pestanas-1.jpg',
  'extensiones-pestanas-2.jpg',
  'extensiones-pestanas-3.jpg',
  'extensiones-pestanas-4.jpg',
  'maquillaje-fantasia-1.jpg',
  'maquillaje-fantasia-2.jpg',
  'maquillaje-fantasia-3.jpg',
  'maquillaje-fantasia-4.jpg',
  'maquillaje-fantasia-5.jpg',
  'maquillaje-fantasia-6.jpg',
  'maquillaje-fantasia-7.jpg',
  'maquillaje-fantasia-8.jpg',
  'maquillaje-fantasia-9.jpg',
  'maquillaje-fantasia-10.jpg',
  'maquillaje-fantasia-11.jpg',
  'maquillaje-social-1.jpg',
  'microblading-cejas-1.jpg',
  'microblading-cejas-2.jpg',
  'planchado-cejas-1.jpg',
  'planchado-cejas-2.jpg',
]

const GalleryPage = () => {
  const [selected, setSelected] = useState<number|null>(null)

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#E57373] mb-10">Galería</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <button
              key={img}
              className="focus:outline-none"
              onClick={() => setSelected(i)}
            >
              <img
                src={require(`../assets/gallery/${img}`)}
                alt={img.replace(/[-_]/g, ' ').replace(/\..+$/, '')}
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-200 object-cover w-full h-40 sm:h-48 md:h-56"
                loading="lazy"
              />
            </button>
          ))}
        </div>
        {/* Lightbox Modal */}
        {selected !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setSelected(null)}>
            <div className="relative max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 text-white text-2xl bg-black/40 rounded-full px-2 py-1 hover:bg-black/70 transition"
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
              >
                ×
              </button>
              <img
                src={require(`../assets/gallery/${images[selected]}`)}
                alt={images[selected].replace(/[-_]/g, ' ').replace(/\..+$/, '')}
                className="rounded-lg shadow-2xl max-h-[80vh] w-auto object-contain"
              />
              <div className="flex gap-4 mt-4">
                <button
                  className="text-white bg-[#E57373] rounded-full px-4 py-2 disabled:opacity-50"
                  onClick={() => setSelected(selected > 0 ? selected - 1 : selected)}
                  disabled={selected === 0}
                >Anterior</button>
                <button
                  className="text-white bg-[#E57373] rounded-full px-4 py-2 disabled:opacity-50"
                  onClick={() => setSelected(selected < images.length - 1 ? selected + 1 : selected)}
                  disabled={selected === images.length - 1}
                >Siguiente</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default GalleryPage 