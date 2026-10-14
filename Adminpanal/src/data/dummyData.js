export const user = {
  name: 'Aisha Kapoor',
  firstName: 'Aisha',
  role: 'Studio manager',
  initials: 'AK',
};

export const loginDefaults = {
  email: 'team@saanjhstudio.in',
};

export const navItems = [
  { id: 'overview',  label: 'Overview',  icon: 'grid',     path: '/dashboard', group: null },
  { id: 'bookings',  label: 'Bookings',  icon: 'calendar', path: '/bookings',   group: null, badge: '08' },

  // Website section - sabse neeche
  { id: 'website',   label: 'Website',   icon: 'page',     path: null,          group: 'website', isGroup: true },
  { id: 'home',      label: 'Home',      icon: null,       path: '/website/home',     group: 'website' },
  { id: 'gallery',   label: 'Gallery',   icon: null,       path: '/website/gallery',  group: 'website' },
  { id: 'services',  label: 'Services',  icon: null,       path: '/website/services', group: 'website' },
  { id: 'reviews',   label: 'Reviews',   icon: null,       path: '/website/reviews',  group: 'website' },
  { id: 'about',     label: 'About',     icon: null,       path: '/website/about',    group: 'website' },
  { id: 'booking',   label: 'Booking',   icon: null,       path: '/website/booking',  group: 'website' },
  { id: 'contact',   label: 'Contact',   icon: null,       path: '/website/contact',  group: 'website' },
];

export const dateLabel = 'Tuesday, 15 October';

export const stats = [
  { id: 1, label: 'New bookings today', value: '12', note: '↑ 20% from yesterday', tone: 'gold' },
  { id: 2, label: 'Pending confirmation', value: '18', note: '6 need a follow-up today', tone: 'red' },
  { id: 3, label: 'Confirmed this month', value: '64', note: '₹8.4L projected value', tone: 'gold' },
  { id: 4, label: 'Unread enquiries', value: '8', note: '3 via Instagram', tone: 'ink' },
];

export const pipeline = [
  { id: 'pending', label: 'Pending', count: 18, weight: 224, color: '#a8732a' },
  { id: 'contacted', label: 'Contacted', count: 14, weight: 178, color: '#ebd3c5' },
  { id: 'quote', label: 'Quote sent', count: 11, weight: 150, color: '#7b3442' },
  { id: 'confirmed', label: 'Confirmed', count: 64, weight: 224, color: '#f3e4d9' },
  { id: 'completed', label: 'Completed', count: 43, weight: 148, color: '#2e1f1f' },
];

export const monthlyTarget = {
  percent: 84,
  achieved: '₹8.4L',
  goal: '₹10L',
  remaining: '₹1.6L',
};

export const bookingsByMonth = [
  { month: 'May', value: 31 },
  { month: 'Jun', value: 42 },
  { month: 'Jul', value: 38 },
  { month: 'Aug', value: 56 },
  { month: 'Sep', value: 49 },
  { month: 'Oct', value: 64 },
];

export const servicesBooked = [
  { id: 'bridal', label: 'Bridal', value: 45, color: '#7b3442' },
  { id: 'party', label: 'Party', value: 20, color: '#a8732a' },
  { id: 'hair', label: 'Hair', value: 20, color: '#ebd3c5' },
  { id: 'trials', label: 'Trials', value: 15, color: '#f3e4d9' },
];

export const needsAction = [
  { id: 1, name: 'Meher Malhotra', meta: 'Bridal HD · 22 Nov · 31h waiting' },
  { id: 2, name: 'Tanya Bedi', meta: 'Bride + family · 09 Dec · 28h waiting' },
  { id: 3, name: 'Rhea Suri', meta: 'Bridal trial · 02 Nov · 25h waiting' },
];

export const upcomingWeddings = [
  { id: 1, day: '19', month: 'OCT', name: 'Ira & Arjun', meta: 'Taj Palace · Bridal HD + hair', status: 'Confirmed', tone: 'confirmed' },
  { id: 2, day: '26', month: 'OCT', name: 'Naina Kapoor', meta: 'The Oberoi · Bridal party', status: 'Confirmed', tone: 'confirmed' },
  { id: 3, day: '02', month: 'NOV', name: 'Kavya Mehta', meta: 'ITC Maurya · Bridal HD', status: 'Quote sent', tone: 'quote' },
];

/* ---------------- Bookings page ---------------- */
export const bookingsPage = {
  eyebrow: 'Booking management',
  title: 'Bookings',
  subtitle: 'Keep every bridal appointment moving from enquiry to celebration.',
  total: 126,
  showing: '1–25',
};

export const bookingTabs = [
  { id: 'all', label: 'All', count: 126 },
  { id: 'pending', label: 'Pending', count: 18 },
  { id: 'contacted', label: 'Contacted', count: 14 },
  { id: 'quote', label: 'Quote sent', count: 11 },
  { id: 'confirmed', label: 'Confirmed', count: 64 },
  { id: 'completed', label: 'Completed', count: 19 },
];

export const bookingRows = [
  {
    id: 1, ref: 'BK-2410', bride: 'Meher Malhotra', type: 'Bride + family',
    service: 'Bridal HD', date: '22 Nov 2024', day: 'Saturday',
    venue: 'Taj Palace, Delhi', phone: '+91 98104 21890', created: '14 Oct 2024',
    status: 'Pending', tone: 'pending',
  },
  {
    id: 2, ref: 'BK-2409', bride: 'Ira Bansal', type: 'Bridal + hair',
    service: 'Bridal HD + Hair', date: '19 Oct 2024', day: 'Saturday',
    venue: 'The Oberoi, Gurgaon', phone: '+91 98716 41072', created: '12 Oct 2024',
    status: 'Confirmed', tone: 'confirmed',
  },
  {
    id: 3, ref: 'BK-2408', bride: 'Kavya Mehta', type: 'Bridal trial',
    service: 'Bridal Trial', date: '02 Nov 2024', day: 'Saturday',
    venue: 'ITC Maurya, Delhi', phone: '+91 98992 10543', created: '10 Oct 2024',
    status: 'Quote sent', tone: 'quote',
  },
  {
    id: 4, ref: 'BK-2407', bride: 'Tanya Bedi', type: 'Bride + family',
    service: 'Bride + Family', date: '09 Dec 2024', day: 'Monday',
    venue: 'Roseate House, Delhi', phone: '+91 99585 33981', created: '09 Oct 2024',
    status: 'Contacted', tone: 'contacted',
  },
];

export const pagination = { pages: [1, 2, 3], current: 1 };
