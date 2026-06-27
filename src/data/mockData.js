export const BOOKS = [
  {
    id: "BK-1045", title: "Atomic Habits", author: "James Clear", category: "Self Help",
    copies: { total: 15, available: 8, borrowed: 6, reserved: 1 },
    location: { shelf: "A-14", floor: 2 }, status: "Available",
    details: { isbn: "978-1847941831", publisher: "Penguin", language: "English", pages: 320, rating: 4.9 },
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day.",
    currentHolder: null, returnDate: null, cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "BK-2099", title: "Deep Learning", author: "Ian Goodfellow", category: "Machine Learning",
    copies: { total: 5, available: 0, borrowed: 4, reserved: 1 },
    location: { shelf: "AI-02", floor: 3 }, status: "Occupied",
    details: { isbn: "978-0262035613", publisher: "MIT Press", language: "English", pages: 800, rating: 4.8 },
    description: "The comprehensive textbook on deep learning, covering mathematical and conceptual background.",
    currentHolder: "Rahul M.", returnDate: "Tomorrow, 10:00 AM", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "BK-3012", title: "Clean Architecture", author: "Robert C. Martin", category: "Programming",
    copies: { total: 10, available: 4, borrowed: 5, reserved: 1 },
    location: { shelf: "CS-05", floor: 1 }, status: "Available",
    details: { isbn: "978-0134494166", publisher: "Prentice Hall", language: "English", pages: 432, rating: 4.7 },
    description: "Universal rules of software architecture.",
    currentHolder: null, returnDate: null, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400"
  },
    {
    id: "BK-4128",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    category: "Programming",
    copies: { total: 8, available: 3, borrowed: 4, reserved: 1 },
    location: { shelf: "CS-08", floor: 1 },
    status: "Available",
    details: {
        isbn: "978-0135957059",
        publisher: "Addison-Wesley",
        language: "English",
        pages: 352,
        rating: 4.9
    },
    description: "A practical guide to becoming a better software developer through timeless engineering principles.",
    currentHolder: null,
    returnDate: null,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400"
    },

    {
    id: "BK-5176",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Algorithms",
    copies: { total: 6, available: 2, borrowed: 4, reserved: 0 },
    location: { shelf: "ALG-01", floor: 3 },
    status: "Available",
    details: {
        isbn: "978-0262046305",
        publisher: "MIT Press",
        language: "English",
        pages: 1312,
        rating: 4.8
    },
    description: "The definitive textbook covering fundamental and advanced algorithms.",
    currentHolder: null,
    returnDate: null,
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400"
    },

    {
    id: "BK-6284",
    title: "Python Crash Course",
    author: "Eric Matthes",
    category: "Programming",
    copies: { total: 12, available: 6, borrowed: 5, reserved: 1 },
    location: { shelf: "PY-04", floor: 2 },
    status: "Available",
    details: {
        isbn: "978-1718502703",
        publisher: "No Starch Press",
        language: "English",
        pages: 544,
        rating: 4.8
    },
    description: "A fast-paced, hands-on introduction to Python programming.",
    currentHolder: null,
    returnDate: null,
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400"
    },

    {
    id: "BK-7349",
    title: "Design Patterns",
    author: "Erich Gamma",
    category: "Software Engineering",
    copies: { total: 7, available: 1, borrowed: 5, reserved: 1 },
    location: { shelf: "SE-02", floor: 1 },
    status: "Occupied",
    details: {
        isbn: "978-0201633610",
        publisher: "Addison-Wesley",
        language: "English",
        pages: 416,
        rating: 4.7
    },
    description: "Classic catalog of reusable object-oriented software design patterns.",
    currentHolder: "Priya S.",
    returnDate: "28 Jun, 04:30 PM",
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400"
    },

    {
    id: "BK-8452",
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    category: "Machine Learning",
    copies: { total: 9, available: 5, borrowed: 3, reserved: 1 },
    location: { shelf: "AI-04", floor: 3 },
    status: "Available",
    details: {
        isbn: "978-1098125974",
        publisher: "O'Reilly Media",
        language: "English",
        pages: 851,
        rating: 4.9
    },
    description: "Practical machine learning using Scikit-Learn, Keras, and TensorFlow.",
    currentHolder: null,
    returnDate: null,
    cover: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=400"
    },

    {
    id: "BK-9563",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    copies: { total: 14, available: 10, borrowed: 4, reserved: 0 },
    location: { shelf: "FIN-03", floor: 2 },
    status: "Available",
    details: {
        isbn: "978-0857197689",
        publisher: "Harriman House",
        language: "English",
        pages: 256,
        rating: 4.8
    },
    description: "Timeless lessons on wealth, investing, and human behavior.",
    currentHolder: null,
    returnDate: null,
    cover: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400"
    },

    {
    id: "BK-1027",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Entrepreneurship",
    copies: { total: 10, available: 7, borrowed: 2, reserved: 1 },
    location: { shelf: "BUS-01", floor: 2 },
    status: "Available",
    details: {
        isbn: "978-0804139298",
        publisher: "Crown Business",
        language: "English",
        pages: 224,
        rating: 4.6
    },
    description: "Insights into building innovative companies that create the future.",
    currentHolder: null,
    returnDate: null,
    cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=400"
    },

    {
    id: "BK-1183",
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "Networking",
    copies: { total: 8, available: 3, borrowed: 5, reserved: 0 },
    location: { shelf: "NET-01", floor: 3 },
    status: "Available",
    details: {
        isbn: "978-0132126953",
        publisher: "Pearson",
        language: "English",
        pages: 960,
        rating: 4.7
    },
    description: "Comprehensive coverage of computer networking principles and protocols.",
    currentHolder: null,
    returnDate: null,
    cover: "https://images.unsplash.com/photo-1513530176992-0cf39c4cbed4?auto=format&fit=crop&q=80&w=400"
    },

    {
    id: "BK-1295",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    category: "Operating Systems",
    copies: { total: 7, available: 0, borrowed: 6, reserved: 1 },
    location: { shelf: "OS-02", floor: 3 },
    status: "Occupied",
    details: {
        isbn: "978-1119800361",
        publisher: "Wiley",
        language: "English",
        pages: 976,
        rating: 4.7
    },
    description: "Foundational concepts behind modern operating systems.",
    currentHolder: "Ankit R.",
    returnDate: "30 Jun, 11:00 AM",
    cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400"
    },

    {
    id: "BK-1408",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fiction",
    copies: { total: 18, available: 12, borrowed: 5, reserved: 1 },
    location: { shelf: "FIC-07", floor: 1 },
    status: "Available",
    details: {
        isbn: "978-0261103344",
        publisher: "HarperCollins",
        language: "English",
        pages: 310,
        rating: 4.9
    },
    description: "A fantasy adventure following Bilbo Baggins on an unforgettable journey.",
    currentHolder: null,
    returnDate: null,
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400"
    }
];



export const SHIFTS = [
  { id: 'morning', label: 'Morning', time: '8:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 4:00 PM' },
  { id: 'evening', label: 'Evening', time: '4:00 PM - 8:00 PM' },
  { id: 'night', label: 'Night', time: '8:00 PM - 12:00 AM' }
];

export const ROOMS = [
  { id: 'RM-101', name: 'Atrium Study Hall', floor: 1, capacity: 25, tags: ['Natural Light', 'Standard Desk'] },
  { id: 'RM-204', name: 'Deep Focus Lab', floor: 2, capacity: 15, tags: ['Soundproof', 'Individual Pods'] },
  { id: 'RM-302', name: 'Collaborative Hub', floor: 3, capacity: 30, tags: ['Whiteboards', 'Power Outlets'] },
  { id: 'RM-405', name: 'Post-Grad Research', floor: 4, capacity: 10, tags: ['Monitors', 'Ergonomic'] }
];

// Helper to simulate realistic occupancy changing throughout the day
const generateStatus = (seed) => {
  if (seed % 5 === 0) return 'occupied';
  if (seed % 7 === 0) return 'reserved';
  return 'available';
};

// Generates an independent status for every seat, for every shift
export const ROOM_SEATS = {
  'RM-101': Array.from({length: 25}).map((_, i) => ({ id: `A${i+1}`, shifts: { morning: generateStatus(i+1), afternoon: generateStatus(i+2), evening: generateStatus(i+3), night: generateStatus(i+4) } })),
  'RM-204': Array.from({length: 15}).map((_, i) => ({ id: `B${i+1}`, shifts: { morning: generateStatus(i+4), afternoon: generateStatus(i+1), evening: generateStatus(i+2), night: generateStatus(i+5) } })),
  'RM-302': Array.from({length: 30}).map((_, i) => ({ id: `C${i+1}`, shifts: { morning: generateStatus(i+2), afternoon: generateStatus(i+5), evening: generateStatus(i+1), night: generateStatus(i+3) } })),
  'RM-405': Array.from({length: 10}).map((_, i) => ({ id: `D${i+1}`, shifts: { morning: generateStatus(i+3), afternoon: generateStatus(i+1), evening: generateStatus(i+4), night: generateStatus(i+2) } }))
};