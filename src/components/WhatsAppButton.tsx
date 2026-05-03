import { MessageCircle } from "lucide-react";

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
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 ease-out hover:scale-110 hover:shadow-xl press"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={0} />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;