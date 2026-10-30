import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const photos = [
  {
    id: 1,
    title: "Pagi yang pelan",
    place: "Ubud, Bali",
    date: "JUNI 2024",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85",
    alt: "Pemandangan hijau Ubud di bawah sinar matahari",
    featured: true,
  },
  {
    id: 2,
    title: "Hari paling cerah",
    place: "Nusa Penida",
    date: "JUNI 2024",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=85",
    alt: "Tebing dan laut biru di sebuah pulau tropis",
  },
  {
    id: 3,
    title: "Lari ke pantai",
    place: "Sanur, Bali",
    date: "JUNI 2024",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
    alt: "Ombak kecil menyentuh pasir pantai",
  },
  {
    id: 4,
    title: "Di antara pepohonan",
    place: "Munduk, Bali",
    date: "JULI 2024",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
    alt: "Hutan hijau dengan cahaya matahari menembus pepohonan",
  },
  {
    id: 5,
    title: "Jeda sore",
    place: "Canggu, Bali",
    date: "JULI 2024",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=85",
    alt: "Suasana pantai saat matahari mulai terbenam",
  },
  {
    id: 6,
    title: "Langit selepas hujan",
    place: "Bedugul, Bali",
    date: "AGUSTUS 2024",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
    alt: "Danau di kaki pegunungan dengan langit berawan",
  },
  {
    id: 7,
    title: "Kecil-kecil bahagia",
    place: "Pasar Ubud",
    date: "AGUSTUS 2024",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85",
    alt: "Bunga-bunga segar berwarna cerah",
  },
  {
    id: 8,
    title: "Rumah sebentar",
    place: "Kintamani, Bali",
    date: "SEPTEMBER 2024",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85",
    alt: "Kabin kayu kecil di tengah alam",
  },
  {
    id: 9,
    title: "Makan, cerita, ulang",
    place: "Denpasar, Bali",
    date: "OKTOBER 2024",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
    alt: "Restoran hangat dengan meja untuk makan bersama",
  },
  {
    id: 10,
    title: "Sampai jumpa lagi",
    place: "Jimbaran, Bali",
    date: "NOVEMBER 2024",
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=85",
    alt: "Matahari senja di tepian laut",
  },
  {
    id: 11,
    title: "Satu langkah lagi",
    place: "Gunung Batur",
    date: "DESEMBER 2024",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
    alt: "Puncak-puncak gunung menjulang di bawah langit cerah",
  },
  {
    id: 12,
    title: "Warna-warni pulang",
    place: "Ubud, Bali",
    date: "JANUARI 2025",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    alt: "Lanskap perbukitan hijau yang luas",
  },
];

const visiblePhotos = photos.slice(0, 9);

function PhotoCard({ photo, index, onSelect, featured = false }) {
  return (
    <motion.button
      className={`photo-card group relative block w-full overflow-hidden rounded-[1.4rem] text-left ${
        featured ? "photo-card-featured" : ""
      }`}
      onClick={() => onSelect(photo)}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07 }}
      whileHover={{ y: -5 }}
      aria-label={`Buka foto: ${photo.title}, ${photo.place}`}
    >
      <img
        src={photo.image}
        alt={photo.alt}
        className="photo-image absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
        loading={index < 3 ? "eager" : "lazy"}
      />
      <div className="photo-scrim absolute inset-0" />
      {featured && (
        <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#fffaf0]/90 px-3 py-1.5 text-[10px] font-bold tracking-[0.13em] text-[#52634c] backdrop-blur-sm">
          <Sparkles size={12} />
          CERITA FAVORIT
        </span>
      )}
      <span className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
        <span className="block text-[9px] font-bold tracking-[0.18em] text-white/75">
          {photo.place.toUpperCase()} <span className="mx-1.5">·</span> {photo.date}
        </span>
        <span
          className={`mt-1 block font-display font-semibold leading-tight ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {photo.title}
        </span>
      </span>
      <span className="photo-open absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#344233] opacity-0 shadow-sm transition-all group-hover:opacity-100">
        <ArrowUpRight size={17} />
      </span>
    </motion.button>
  );
}

function App() {
  const [showAlbum, setShowAlbum] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const movePhoto = (direction) => {
    const currentIndex = photos.findIndex((photo) => photo.id === selectedPhoto?.id);
    const nextIndex = (currentIndex + direction + photos.length) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-cream text-ink">
      <section id="album" className="mx-auto max-w-7xl scroll-mt-8 px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12 lg:px-12">
        <div className="mb-5 flex items-end justify-between sm:mb-7">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#8b927f]">
              ARSIP KENANGAN
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold sm:text-[30px]">
              Cerita yang tersimpan
            </h2>
          </div>
          <span className="pb-1 text-xs text-[#8d8e82]">
            {visiblePhotos.length} foto <span className="mx-1">·</span> pilih untuk melihat
          </span>
        </div>

        <div className="photo-grid">
          {visiblePhotos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onSelect={setSelectedPhoto}
              featured={photo.featured}
            />
          ))}
        </div>

        {photos.length > visiblePhotos.length && (
          <motion.button
            type="button"
            onClick={() => setShowAlbum(true)}
            className="more-photos group mx-auto mt-8 flex items-center gap-4 rounded-full border border-[#e8e4d9] bg-[#fffdf9] py-2 pl-2 pr-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#aab49d] hover:shadow-md sm:mt-10"
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9eddf] text-[#68795d] transition group-hover:bg-[#dce5d2]">
              <span className="font-display text-sm font-bold">
                +{photos.length - visiblePhotos.length}
              </span>
            </span>
            <span>
              <span className="block text-sm font-semibold">Masih ada cerita lainnya</span>
              <span className="mt-0.5 block text-[11px] text-[#87897e]">
                Lihat semua {photos.length} foto
              </span>
            </span>
            <ArrowRight
              size={17}
              className="ml-1 text-[#8a967d] transition group-hover:translate-x-1"
            />
          </motion.button>
        )}
      </section>

      <footer className="border-t border-[#eee9df]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left lg:px-12">
          <span className="font-display text-sm text-[#74796b]">
            dibuat untuk mengingat yang baik-baik
          </span>
          <span className="text-[11px] text-[#9b9b8e]">
            Copyright © @I J F_D I E
          </span>
        </div>
      </footer>

      <AnimatePresence>
        {showAlbum && (
          <motion.div
            className="overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAlbum(false)}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="album-title"
              className="album-dialog relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.6rem] bg-cream shadow-2xl sm:rounded-[2rem]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.99 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#eae5db] px-5 py-4 sm:px-8 sm:py-5">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.19em] text-[#8b927f]">
                    ALBUM LENGKAP
                  </p>
                  <h2 id="album-title" className="mt-0.5 font-display text-xl font-semibold sm:text-2xl">
                    Semua cerita, satu tempat.
                  </h2>
                  <p className="mt-1 text-[11px] text-[#85877c]">{photos.length} momen tersimpan</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAlbum(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e4da] text-[#60675b] transition hover:bg-white"
                  aria-label="Tutup album"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="album-scroll overflow-y-auto px-4 py-4 sm:px-8 sm:py-6">
                <div className="album-grid">
                  {photos.map((photo, index) => (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      index={index}
                      onSelect={(item) => setSelectedPhoto(item)}
                      featured={photo.featured}
                    />
                  ))}
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="overlay photo-viewer fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedPhoto.title}
              className="relative w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:-right-12 sm:top-0"
                aria-label="Tutup foto"
              >
                <X size={20} />
              </button>
              <div className="relative overflow-hidden rounded-[1.2rem] bg-black sm:rounded-[1.6rem]">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.alt}
                  className="max-h-[76vh] min-h-[260px] w-full object-contain"
                />
              </div>
              <div className="mt-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.17em] text-white/60">
                    {selectedPhoto.place.toUpperCase()} <span className="mx-1">·</span> {selectedPhoto.date}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{selectedPhoto.title}</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => movePhoto(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition hover:bg-white/15"
                    aria-label="Foto sebelumnya"
                  >
                    <ArrowLeft size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => movePhoto(1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition hover:bg-white/15"
                    aria-label="Foto berikutnya"
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
