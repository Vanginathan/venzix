// src/components/WhatsAppButton.tsx

const PHONE = "917708201511"; // India country code + number
const MESSAGE = "Hi, I'm interested in your web development services.";

const WhatsAppButton = () => {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Ripple rings */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-[wa-ping_2s_ease-out_infinite]"
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-[wa-ping_2s_ease-out_0.6s_infinite]"
      />

      {/* Button */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)]">
        {/* Official WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-7 w-7"
          aria-hidden="true"
          fill="white"
        >
          <path d="M24 4C12.95 4 4 12.95 4 24c0 3.58.95 6.94 2.6 9.84L4 44l10.4-2.72A19.86 19.86 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36c-3.12 0-6.05-.82-8.58-2.26l-.6-.36-6.17 1.62 1.64-6-.4-.63A15.93 15.93 0 0 1 8 24c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16zm8.73-11.9c-.48-.24-2.82-1.39-3.26-1.55-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.55-1.52 1.87-.28.32-.56.36-1.04.12-.48-.24-2.02-.74-3.84-2.36-1.42-1.26-2.38-2.82-2.66-3.3-.28-.48-.03-.74.21-.98.22-.21.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.38-.92-.78-.8-1.08-.82-.28-.02-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.14.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.02.19.92-.14 2.82-1.15 3.22-2.27.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z" />
        </svg>
      </span>

      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;