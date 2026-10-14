import { Sparkles, Flower2, Heart, Users, HeartHandshake, Palette, Clock, MapPin, Star } from "lucide-react";

export const ICONS = { sparkles: Sparkles, flower: Flower2, heart: Heart, users: Users, heartHandshake: HeartHandshake, palette: Palette, clock: Clock, pin: MapPin, star: Star };
export const ICON_OPTIONS = Object.keys(ICONS).map((k) => ({
  value: k,
  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()),
}));
