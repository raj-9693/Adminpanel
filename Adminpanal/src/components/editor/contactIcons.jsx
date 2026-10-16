import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

// lucide ke naye versions me brand icons nahi hain, isliye Instagram inline hai
const Insta = ({ size = 18, strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" />
  </svg>
);

export const CONTACT_ICONS = { phone: Phone, whatsapp: MessageCircle, instagram: Insta, pin: MapPin, clock: Clock, mail: Mail };
export const CONTACT_ICON_OPTIONS = [
  { value: "phone", label: "Phone" }, { value: "whatsapp", label: "WhatsApp / chat" }, { value: "instagram", label: "Instagram" },
  { value: "pin", label: "Location" }, { value: "clock", label: "Clock / hours" }, { value: "mail", label: "Email" },
];
