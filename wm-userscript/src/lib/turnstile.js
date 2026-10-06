// Cloudflare Turnstile, loaded once on first need. The site's CSP allows scripts by nonce, so the
// tag reuses the page's nonce when it has one. Site key from the native client.
export const SITE_KEY = "0x4AAAAAAEW_2IAWonrk_N5i";
let loading = null;

export function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    const nonce = document.querySelector("script[nonce]")?.nonce;
    if (nonce) s.nonce = nonce;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile indisponible")));
    s.onerror = () => { loading = null; reject(new Error("Turnstile indisponible")); };
    document.head.appendChild(s);
  });
  return loading;
}
