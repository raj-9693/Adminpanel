const base = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
};

export const SparkleIcon = (p) => (<svg {...base} {...p}><path d="M10 4l1.8 4.7L16.5 10.5l-4.7 1.8L10 17l-1.8-4.7L3.5 10.5l4.7-1.8z" /><path d="M18 3v4M16 5h4" /><circle cx="18" cy="18" r="1.4" /></svg>);
export const ChartIcon = (p) => (<svg {...base} {...p}><path d="M4 3.5v17h17" /><path d="M9 16v-4M13 16V8M17 16v-6" /></svg>);
export const LayersIcon = (p) => (<svg {...base} {...p}><path d="m12 3.5 9 4.5-9 4.5L3 8z" /><path d="m3 12.5 9 4.5 9-4.5" /><path d="m3 16.5 9 4.5 9-4.5" /></svg>);
export const ImageIcon = (p) => (<svg {...base} {...p}><rect x="3.5" y="4" width="17" height="16" rx="3" /><circle cx="9" cy="9.5" r="1.6" /><path d="m4 17.5 5-4.5 4 3.5 3-2.5 4 3.5" /></svg>);
export const ChatIcon = (p) => (<svg {...base} {...p}><path d="M12 3.8a8.2 8.2 0 1 0 0 16.4c1.3 0 2.5-.3 3.6-.8l3.9.8-1-3.5A8.2 8.2 0 0 0 12 3.8z" /></svg>);
export const HeartIcon = (p) => (<svg {...base} {...p}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" /></svg>);
export const ChevronIcon = (p) => (<svg {...base} width="18" height="18" {...p}><path d="m6 9 6 6 6-6" /></svg>);
export const DotsIcon = (p) => (<svg {...base} {...p}><circle cx="5" cy="12" r="1.3" fill="currentColor" /><circle cx="12" cy="12" r="1.3" fill="currentColor" /><circle cx="19" cy="12" r="1.3" fill="currentColor" /></svg>);
export const BellIcon = (p) => (<svg {...base} {...p}><path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2h-15z" /><path d="M10 21a2 2 0 0 0 4 0" /></svg>);
export const MonitorIcon = (p) => (<svg {...base} {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>);
export const PhoneIcon = (p) => (<svg {...base} {...p}><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 18h2" /></svg>);
export const SaveIcon = (p) => (<svg {...base} {...p}><path d="M5 4h11l3 3v13H5z" /><path d="M8 4v5h7V4M8 20v-6h8v6" /></svg>);
export const CloseIcon = (p) => (<svg {...base} width="16" height="16" {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const UploadIcon = (p) => (<svg {...base} {...p}><path d="M12 16V5M7.5 9.5 12 5l4.5 4.5" /><path d="M4.5 16.5v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-1.5" /></svg>);

export const sectionIcons = {
  sparkle: SparkleIcon, chart: ChartIcon, layers: LayersIcon,
  image: ImageIcon, chat: ChatIcon, heart: HeartIcon,
};
