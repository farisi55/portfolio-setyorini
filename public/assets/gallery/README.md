# Gallery images

Gallery foto tidak lagi diambil dari folder `public/assets/gallery`.

Semua foto gallery disimpan dan dibaca dari Cloudflare Workers KV melalui endpoint Worker:

- `/assets/gallery/gallery-{id}.webp` untuk foto utama yang sudah dikompresi.
- `/assets/gallery/thumb-gallery-{id}.webp` untuk thumbnail kecil yang sudah dikompresi.

Upload dilakukan melalui Admin Panel. Browser akan mengompresi gambar menjadi WebP sebelum dikirim ke Worker.
