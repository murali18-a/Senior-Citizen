import { format, subDays, addDays, addHours } from 'date-fns'

const today = new Date()
const todayStr = format(today, 'yyyy-MM-dd')

// ─── Users ──────────────────────────────────────────────────
export const mockUsers = {
  senior: {
    id: 'sr-001',
    name: 'Margaret Johnson',
    email: 'margaret@example.com',
    role: 'senior',
    age: 78,
    phone: '+1 555-123-4567',
    address: '45 Maple Lane, Springfield, IL',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Peanuts'],
    medicalConditions: ['Hypertension', 'Type 2 Diabetes', 'Mild Arthritis'],
    emergencyContacts: [
      { name: 'Robert Johnson', relation: 'Son', phone: '+1 555-234-5678' },
      { name: 'Sarah Williams', relation: 'Daughter', phone: '+1 555-345-6789' },
      { name: 'Dr. Emily Carter', relation: 'Primary Doctor', phone: '+1 555-456-7890' },
    ],
    avatar: null,
    joinDate: '2024-08-15',
    status: 'active',
  },
  caregiver: {
    id: 'cg-001',
    name: 'Nurse Emily Davis',
    email: 'emily.davis@example.com',
    role: 'caregiver',
    phone: '+1 555-567-8901',
    specialization: 'Geriatric Care',
    certification: 'RN, Certified Geriatric Nurse',
    experience: '8 years',
    avatar: null,
    joinDate: '2024-06-20',
    status: 'active',
  },
  provider: {
    id: 'pv-001',
    name: 'Sunrise Meal Services',
    email: 'contact@sunrisemeals.com',
    role: 'provider',
    phone: '+1 555-678-9012',
    businessType: 'Food Delivery',
    rating: 4.8,
    deliveries: 1240,
    avatar: null,
    joinDate: '2024-04-10',
    status: 'active',
  },
  admin: {
    id: 'ad-001',
    name: 'Admin User',
    email: 'admin@elderease.com',
    role: 'admin',
    phone: '+1 555-000-0001',
    avatar: null,
    joinDate: '2024-01-01',
    status: 'active',
  },
}

// ─── Medicines ──────────────────────────────────────────────
export const mockMedicines = [
  {
    id: 'med-001', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily',
    times: ['08:00', '20:00'], remaining: 24, threshold: 10,
    prescribedBy: 'Dr. Emily Carter', pharmacy: 'CVS Pharmacy',
    startDate: '2024-09-01', endDate: null, instructions: 'Take with meals',
    category: 'Diabetes', takenToday: ['08:00'],
  },
  {
    id: 'med-002', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily',
    times: ['09:00'], remaining: 30, threshold: 10,
    prescribedBy: 'Dr. Emily Carter', pharmacy: 'CVS Pharmacy',
    startDate: '2024-07-15', endDate: null, instructions: 'Take in the morning',
    category: 'Blood Pressure', takenToday: [],
  },
  {
    id: 'med-003', name: 'Aspirin', dosage: '81mg', frequency: 'Once daily',
    times: ['08:00'], remaining: 45, threshold: 15,
    prescribedBy: 'Dr. Emily Carter', pharmacy: 'Walgreens',
    startDate: '2024-06-01', endDate: null, instructions: 'Take with food',
    category: 'Heart', takenToday: ['08:00'],
  },
  {
    id: 'med-004', name: 'Calcium + Vitamin D', dosage: '600mg/400IU', frequency: 'Once daily',
    times: ['12:00'], remaining: 8, threshold: 10,
    prescribedBy: 'Dr. Emily Carter', pharmacy: 'CVS Pharmacy',
    startDate: '2024-08-01', endDate: null, instructions: 'Take with lunch',
    category: 'Supplements', takenToday: [],
  },
  {
    id: 'med-005', name: 'Acetaminophen', dosage: '500mg', frequency: 'As needed',
    times: ['PRN'], remaining: 18, threshold: 5,
    prescribedBy: 'Dr. Emily Carter', pharmacy: 'CVS Pharmacy',
    startDate: '2024-09-20', endDate: null, instructions: 'Max 4 per day for pain',
    category: 'Pain Relief', takenToday: [],
  },
]

// ─── Food Providers ─────────────────────────────────────────
export const mockFoodProviders = [
  {
    id: 'fp-001', name: 'Sunrise Meal Services', rating: 4.8, cuisine: 'Home-style American',
    deliveryTime: '30-45 min', image: null, dietaryOptions: ['diabetic-friendly', 'low-sodium', 'heart-healthy'],
    description: 'Fresh, nutritious home-cooked meals delivered with care.',
  },
  {
    id: 'fp-002', name: 'Golden Kitchen', rating: 4.6, cuisine: 'Multi-cuisine',
    deliveryTime: '25-40 min', image: null, dietaryOptions: ['vegetarian', 'soft-foods', 'low-sodium'],
    description: 'Variety of cuisines adapted for senior dietary needs.',
  },
  {
    id: 'fp-003', name: 'NutriCare Meals', rating: 4.9, cuisine: 'Health-focused',
    deliveryTime: '35-50 min', image: null, dietaryOptions: ['diabetic-friendly', 'low-sodium', 'gluten-free', 'heart-healthy'],
    description: 'Doctor-recommended meals with precise nutritional balance.',
  },
]

// ─── Meals / Orders ─────────────────────────────────────────
export const mockMeals = [
  {
    id: 'meal-001', provider: 'Sunrise Meal Services', meal: 'Grilled Chicken with Steamed Vegetables',
    status: 'delivered', eta: null, orderedAt: format(subDays(today, 1), "yyyy-MM-dd'T'HH:mm"),
    rating: 5, dietaryTags: ['low-sodium', 'diabetic-friendly'],
  },
  {
    id: 'meal-002', provider: 'NutriCare Meals', meal: 'Oatmeal with Fresh Berries & Honey',
    status: 'on-the-way', eta: '11:30 AM', orderedAt: format(today, "yyyy-MM-dd'T'09:00"),
    rating: null, dietaryTags: ['heart-healthy', 'diabetic-friendly'],
  },
  {
    id: 'meal-003', provider: 'Golden Kitchen', meal: 'Vegetable Soup with Whole Wheat Bread',
    status: 'preparing', eta: '1:00 PM', orderedAt: format(today, "yyyy-MM-dd'T'10:30"),
    rating: null, dietaryTags: ['vegetarian', 'soft-foods'],
  },
]

// ─── Weekly Meal Plan ───────────────────────────────────────
export const mockMealPlan = [
  { day: 'Monday', breakfast: 'Oatmeal & Fruit', lunch: 'Grilled Chicken Salad', dinner: 'Baked Fish & Vegetables' },
  { day: 'Tuesday', breakfast: 'Scrambled Eggs & Toast', lunch: 'Lentil Soup', dinner: 'Pasta Primavera' },
  { day: 'Wednesday', breakfast: 'Yogurt Parfait', lunch: 'Turkey Sandwich', dinner: 'Steamed Rice & Curry' },
  { day: 'Thursday', breakfast: 'Pancakes & Syrup', lunch: 'Grilled Vegetables', dinner: 'Chicken Stew' },
  { day: 'Friday', breakfast: 'Cereal & Milk', lunch: 'Tomato Soup', dinner: 'Baked Salmon' },
  { day: 'Saturday', breakfast: 'French Toast', lunch: 'Caesar Salad', dinner: 'Vegetable Stir-fry' },
  { day: 'Sunday', breakfast: 'Eggs Benedict', lunch: 'Mushroom Soup', dinner: 'Roast Chicken' },
]

// ─── Emergencies ────────────────────────────────────────────
export const mockEmergencies = [
  {
    id: 'emg-001', type: 'Medical', status: 'resolved',
    triggeredAt: format(subDays(today, 5), "yyyy-MM-dd'T'14:30"),
    resolvedAt: format(subDays(today, 5), "yyyy-MM-dd'T'14:45"),
    responders: ['Nurse Emily Davis', 'Robert Johnson'],
    notes: 'Dizziness episode — resolved after rest and medication.',
  },
  {
    id: 'emg-002', type: 'Fall', status: 'resolved',
    triggeredAt: format(subDays(today, 12), "yyyy-MM-dd'T'09:15"),
    resolvedAt: format(subDays(today, 12), "yyyy-MM-dd'T'09:40"),
    responders: ['Nurse Emily Davis', 'Emergency Services'],
    notes: 'Minor fall in bathroom — no injuries.',
  },
]

// ─── Activity Feed ──────────────────────────────────────────
export const mockActivityFeed = [
  { id: 'act-001', type: 'medicine', message: 'Took Metformin (500mg)', time: format(today, "yyyy-MM-dd'T'08:00"), icon: '💊' },
  { id: 'act-002', type: 'medicine', message: 'Took Aspirin (81mg)', time: format(today, "yyyy-MM-dd'T'08:05"), icon: '💊' },
  { id: 'act-003', type: 'meal', message: 'Breakfast delivered by Sunrise Meals', time: format(today, "yyyy-MM-dd'T'08:30"), icon: '🍽️' },
  { id: 'act-004', type: 'caregiver', message: 'Nurse Emily checked in', time: format(subDays(today, 1), "yyyy-MM-dd'T'16:00"), icon: '👩‍⚕️' },
  { id: 'act-005', type: 'meal', message: 'Rated dinner 5 stars', time: format(subDays(today, 1), "yyyy-MM-dd'T'19:30"), icon: '⭐' },
]

// ─── Caregiver: Assigned Seniors ────────────────────────────
export const mockAssignedSeniors = [
  {
    id: 'sr-001', name: 'Margaret Johnson', age: 78, photo: null,
    medicineCompliance: 85, lastMealStatus: 'Delivered', lastActive: '2 hours ago',
    conditions: ['Hypertension', 'Diabetes'], status: 'online',
  },
  {
    id: 'sr-002', name: 'Harold Williams', age: 82, photo: null,
    medicineCompliance: 92, lastMealStatus: 'Scheduled', lastActive: '30 min ago',
    conditions: ['Heart Disease', 'Arthritis'], status: 'online',
  },
  {
    id: 'sr-003', name: 'Dorothy Chen', age: 75, photo: null,
    medicineCompliance: 68, lastMealStatus: 'Preparing', lastActive: '1 hour ago',
    conditions: ['Osteoporosis'], status: 'offline',
  },
  {
    id: 'sr-004', name: 'Frank Martinez', age: 80, photo: null,
    medicineCompliance: 95, lastMealStatus: 'Delivered', lastActive: '15 min ago',
    conditions: ['Diabetes', 'High Cholesterol'], status: 'online',
  },
]

// ─── Caregiver: Alerts ──────────────────────────────────────
export const mockAlerts = [
  {
    id: 'alert-001', seniorName: 'Dorothy Chen', seniorId: 'sr-003', type: 'Missed Medicine',
    priority: 'high', message: 'Missed Calcium + Vitamin D at 12:00 PM',
    time: format(today, "yyyy-MM-dd'T'12:30"), status: 'pending',
  },
  {
    id: 'alert-002', seniorName: 'Margaret Johnson', seniorId: 'sr-001', type: 'Low Stock',
    priority: 'medium', message: 'Calcium + Vitamin D — only 8 tablets remaining',
    time: format(today, "yyyy-MM-dd'T'10:00"), status: 'acknowledged',
  },
  {
    id: 'alert-003', seniorName: 'Harold Williams', seniorId: 'sr-002', type: 'SOS',
    priority: 'critical', message: 'Emergency SOS triggered — Medical',
    time: format(subDays(today, 2), "yyyy-MM-dd'T'14:30"), status: 'resolved',
  },
]

// ─── Caregiver: Tasks ───────────────────────────────────────
export const mockTasks = [
  { id: 'task-001', title: 'Check Margaret\'s blood pressure', senior: 'Margaret Johnson', dueTime: '10:00 AM', status: 'pending', priority: 'high' },
  { id: 'task-002', title: 'Confirm Harold\'s lunch delivery', senior: 'Harold Williams', dueTime: '12:00 PM', status: 'pending', priority: 'medium' },
  { id: 'task-003', title: 'Review Dorothy\'s medicine compliance', senior: 'Dorothy Chen', dueTime: '2:00 PM', status: 'pending', priority: 'high' },
  { id: 'task-004', title: 'Update Frank\'s care notes', senior: 'Frank Martinez', dueTime: '4:00 PM', status: 'completed', priority: 'low' },
]

// ─── Provider: Service Requests ─────────────────────────────
export const mockServiceRequests = [
  {
    id: 'req-001', type: 'food', seniorName: 'Margaret Johnson', seniorId: 'sr-001',
    details: 'Grilled chicken with steamed vegetables — diabetic-friendly, low-sodium',
    address: '45 Maple Lane, Springfield, IL', specialInstructions: 'Soft-cooked vegetables please',
    status: 'pending', requestedAt: format(today, "yyyy-MM-dd'T'09:00"),
  },
  {
    id: 'req-002', type: 'food', seniorName: 'Harold Williams', seniorId: 'sr-002',
    details: 'Vegetable soup with wheat bread — heart-healthy',
    address: '120 Oak Street, Springfield, IL', specialInstructions: 'Extra warm',
    status: 'accepted', requestedAt: format(today, "yyyy-MM-dd'T'09:30"),
  },
  {
    id: 'req-003', type: 'medicine', seniorName: 'Dorothy Chen', seniorId: 'sr-003',
    details: 'Calcium + Vitamin D refill — 30 tablets',
    address: '88 Pine Avenue, Springfield, IL', specialInstructions: null,
    status: 'in-progress', requestedAt: format(subDays(today, 1), "yyyy-MM-dd'T'11:00"),
  },
]

// ─── Provider: Menu Items ───────────────────────────────────
export const mockMenuItems = [
  { id: 'menu-001', name: 'Grilled Chicken & Vegetables', price: 12.99, dietaryTags: ['low-sodium', 'diabetic-friendly'], available: true, image: null, description: 'Tender grilled chicken with steamed broccoli and carrots.' },
  { id: 'menu-002', name: 'Oatmeal & Fresh Berries', price: 7.99, dietaryTags: ['heart-healthy', 'diabetic-friendly'], available: true, image: null, description: 'Warm oatmeal topped with seasonal berries and a drizzle of honey.' },
  { id: 'menu-003', name: 'Vegetable Soup', price: 8.99, dietaryTags: ['vegetarian', 'soft-foods', 'low-sodium'], available: true, image: null, description: 'Hearty vegetable soup with soft-cooked veggies.' },
  { id: 'menu-004', name: 'Baked Salmon', price: 15.99, dietaryTags: ['heart-healthy', 'gluten-free'], available: false, image: null, description: 'Oven-baked salmon with lemon butter and asparagus.' },
]

// ─── Admin: All Users ───────────────────────────────────────
export const mockAllUsers = [
  { id: 'sr-001', name: 'Margaret Johnson', role: 'senior', status: 'active', joinDate: '2024-08-15', email: 'margaret@example.com' },
  { id: 'sr-002', name: 'Harold Williams', role: 'senior', status: 'active', joinDate: '2024-09-01', email: 'harold@example.com' },
  { id: 'sr-003', name: 'Dorothy Chen', role: 'senior', status: 'active', joinDate: '2024-10-10', email: 'dorothy@example.com' },
  { id: 'sr-004', name: 'Frank Martinez', role: 'senior', status: 'active', joinDate: '2024-07-20', email: 'frank@example.com' },
  { id: 'cg-001', name: 'Emily Davis', role: 'caregiver', status: 'active', joinDate: '2024-06-20', email: 'emily.davis@example.com' },
  { id: 'cg-002', name: 'James Wilson', role: 'caregiver', status: 'pending', joinDate: '2024-11-01', email: 'james.w@example.com' },
  { id: 'pv-001', name: 'Sunrise Meal Services', role: 'provider', status: 'active', joinDate: '2024-04-10', email: 'contact@sunrisemeals.com' },
  { id: 'pv-002', name: 'MedExpress Pharmacy', role: 'provider', status: 'pending', joinDate: '2024-11-05', email: 'info@medexpress.com' },
  { id: 'ad-001', name: 'Admin User', role: 'admin', status: 'active', joinDate: '2024-01-01', email: 'admin@elderease.com' },
]

// ─── Admin: Analytics ───────────────────────────────────────
export const mockAnalytics = {
  totalSeniors: 156,
  activeCaregivers: 42,
  pendingRequests: 18,
  openEmergencies: 2,
  todayDeliveries: 89,
  registrationTrend: [
    { month: 'Jun', seniors: 12, caregivers: 4, providers: 2 },
    { month: 'Jul', seniors: 18, caregivers: 6, providers: 3 },
    { month: 'Aug', seniors: 25, caregivers: 8, providers: 4 },
    { month: 'Sep', seniors: 22, caregivers: 7, providers: 5 },
    { month: 'Oct', seniors: 30, caregivers: 9, providers: 4 },
    { month: 'Nov', seniors: 28, caregivers: 8, providers: 6 },
  ],
  serviceDistribution: [
    { name: 'Food Delivery', value: 45 },
    { name: 'Medicine Delivery', value: 30 },
    { name: 'Emergency Responses', value: 15 },
    { name: 'Consultations', value: 10 },
  ],
  emergencyFrequency: [
    { month: 'Jun', medical: 5, fall: 3, other: 2 },
    { month: 'Jul', medical: 4, fall: 4, other: 1 },
    { month: 'Aug', medical: 7, fall: 2, other: 3 },
    { month: 'Sep', medical: 3, fall: 5, other: 2 },
    { month: 'Oct', medical: 6, fall: 3, other: 1 },
    { month: 'Nov', medical: 4, fall: 2, other: 2 },
  ],
  medicineComplianceAvg: 82,
}

// ─── Notifications ──────────────────────────────────────────
export const mockNotifications = [
  { id: 'notif-001', type: 'medicine', title: 'Medicine Reminder', message: 'Time to take Lisinopril (10mg)', time: format(today, "yyyy-MM-dd'T'09:00"), read: false },
  { id: 'notif-002', type: 'meal', title: 'Meal Update', message: 'Your breakfast is on the way!', time: format(today, "yyyy-MM-dd'T'08:30"), read: false },
  { id: 'notif-003', type: 'alert', title: 'Low Stock Alert', message: 'Calcium + Vitamin D is running low (8 left)', time: format(today, "yyyy-MM-dd'T'07:00"), read: true },
  { id: 'notif-004', type: 'caregiver', title: 'Caregiver Update', message: 'Nurse Emily will visit at 3 PM today', time: format(subDays(today, 1), "yyyy-MM-dd'T'16:00"), read: true },
]

// ─── Testimonials ───────────────────────────────────────────
export const mockTestimonials = [
  {
    id: 'test-001', name: 'Ruth Anderson', role: 'Senior Citizen', age: 76,
    text: 'ElderEase has been a blessing. I never miss my medicines now, and the meals are always so fresh and delicious. My children feel so relieved knowing I\'m taken care of.',
    rating: 5,
  },
  {
    id: 'test-002', name: 'Michael Torres', role: 'Caregiver',
    text: 'Managing multiple seniors was overwhelming before ElderEase. Now I can see all my patients at a glance, respond to alerts instantly, and ensure no medicine is missed.',
    rating: 5,
  },
  {
    id: 'test-003', name: 'Patricia Kim', role: 'Family Member',
    text: 'My mother lives alone, and the SOS button gives our whole family peace of mind. The emergency response was incredibly fast when she needed it.',
    rating: 5,
  },
]

// ─── Medicine Compliance History ────────────────────────────
export const mockComplianceHistory = [
  { day: 'Mon', taken: 4, missed: 0, skipped: 1 },
  { day: 'Tue', taken: 5, missed: 0, skipped: 0 },
  { day: 'Wed', taken: 3, missed: 1, skipped: 1 },
  { day: 'Thu', taken: 5, missed: 0, skipped: 0 },
  { day: 'Fri', taken: 4, missed: 1, skipped: 0 },
  { day: 'Sat', taken: 5, missed: 0, skipped: 0 },
  { day: 'Sun', taken: 4, missed: 0, skipped: 1 },
]
