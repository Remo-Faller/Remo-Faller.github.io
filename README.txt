Faller’OS – paczka PWA

Pliki:
  index.html     strona promocyjna
  app.html       pulpit (aplikacja PWA, start_url)
  manifest.json  manifest aplikacji
  sw.js          service worker (offline)
  icons/         ikony 192 i 512 px
  kuce-theme.mp3 muzyka do gry Kuce: The Game

Wdrożenie:
1. Wgraj całą zawartość folderu na hosting przez HTTPS (GitHub Pages, Netlify, Cloudflare Pages, własny serwer). Na http://localhost też działa.
2. Otwórz index.html i kliknij „Uruchom”, a potem Start → Instalacja PWA albo ikonę instalacji w pasku adresu.
3. Po pierwszym wejściu service worker zapisuje wszystko w pamięci podręcznej i system działa offline.
Uwaga: po zmianie plików zwiększ V w sw.js (np. fallerOS-v2), żeby odświeżyć cache.
Test lokalny: python3 -m http.server 8000 w tym folderze (Termux też może).
