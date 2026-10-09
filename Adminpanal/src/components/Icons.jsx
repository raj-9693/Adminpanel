const base = {
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
};

export const GridIcon = (p) => (
  <svg {...base} {...p}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></svg>
);
export const CalendarIcon = (p) => (
  <svg {...base} {...p}><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
);
export const InboxIcon = (p) => (
  <svg {...base} {...p}><path d="M3.5 13.5 6 5.5h12l2.5 8v4a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" /><path d="M3.5 13.5H9a3 3 0 0 0 6 0h5.5" /></svg>
);
export const UsersIcon = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.3c2.2.7 3.5 2.6 3.5 5.2" /></svg>
);
export const ChartIcon = (p) => (
  <svg {...base} {...p}><path d="M4 3.5v17h17" /><path d="M9 16v-4M13 16V8M17 16v-6" /></svg>
);
export const SearchIcon = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
);
export const BellIcon = (p) => (
  <svg {...base} {...p}><path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2h-15z" /><path d="M10 21a2 2 0 0 0 4 0" /></svg>
);
export const PlusIcon = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const ChevronDownIcon = (p) => (
  <svg {...base} width="18" height="18" {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const EyeIcon = (p) => (
  <svg {...base} {...p}><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.8" /></svg>
);
export const EyeOffIcon = (p) => (
  <svg {...base} {...p}><path d="M3 3l18 18" /><path d="M10.6 6a9.6 9.6 0 0 1 1.4-.1c6.4 0 10 6.1 10 6.1a17 17 0 0 1-3.2 3.9M6.6 7.6A17 17 0 0 0 2 12s3.6 6.5 10 6.5c1.6 0 3-.4 4.2-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
);
export const AlertIcon = (p) => (
  <svg {...base} width="24" height="24" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.2v.1" /></svg>
);
export const SparkleIcon = (p) => (
  <svg {...base} width="24" height="24" {...p}><path d="M10 4l1.8 4.7L16.5 10.5l-4.7 1.8L10 17l-1.8-4.7L3.5 10.5l4.7-1.8z" /><path d="M18 3v4M16 5h4" /><circle cx="18" cy="18" r="1.4" /></svg>
);

export const DownloadIcon = (p) => (
  <svg {...base} {...p}><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" /><path d="M4.5 16.5v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-1.5" /></svg>
);
export const LayersIcon = (p) => (
  <svg {...base} {...p}><path d="m12 3.5 9 4.5-9 4.5L3 8z" /><path d="m3 12.5 9 4.5 9-4.5" /><path d="m3 16.5 9 4.5 9-4.5" /></svg>
);
export const FilterIcon = (p) => (
  <svg {...base} width="26" height="26" {...p}><path d="M3.5 5h17l-6.5 7.5V19l-4 1.5v-8z" /></svg>
);
export const ListIcon = (p) => (
  <svg {...base} {...p}><path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h12" /><circle cx="4" cy="6.5" r=".6" /><circle cx="4" cy="12" r=".6" /><circle cx="4" cy="17.5" r=".6" /></svg>
);
export const DotsIcon = (p) => (
  <svg {...base} {...p}><circle cx="5" cy="12" r="1.3" fill="currentColor" /><circle cx="12" cy="12" r="1.3" fill="currentColor" /><circle cx="19" cy="12" r="1.3" fill="currentColor" /></svg>
);
export const ChatIcon = (p) => (
  <svg {...base} width="22" height="22" {...p}><path d="M12 3.8a8.2 8.2 0 1 0 0 16.4c1.3 0 2.5-.3 3.6-.8l3.9.8-1-3.5A8.2 8.2 0 0 0 12 3.8z" /></svg>
);
