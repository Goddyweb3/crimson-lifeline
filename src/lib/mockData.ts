import { User, BloodRequest, DonationRecord, Notification } from '../types';

export const ASSETS = {
  LOGO: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e4a9196c-e2ab-4503-9807-26f960a88ad3/pulseshare-logo-4629a46e-1775666244555.webp',
  HERO: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e4a9196c-e2ab-4503-9807-26f960a88ad3/hero-image-11241a93-1775666245989.webp',
  MAP: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e4a9196c-e2ab-4503-9807-26f960a88ad3/map-background-67c188ba-1775666244817.webp',
  AVATARS: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e4a9196c-e2ab-4503-9807-26f960a88ad3/user-avatars-c8669813-1775666245076.webp'
};

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '+1 234 567 890',
  bloodGroup: 'O+',
  location: 'Downtown, Cityville',
  role: 'donor',
  availability: true,
  lastDonationDate: '2023-11-15',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
  donationsCount: 2,
  livesSaved: 6
};

export const MOCK_DONORS: User[] = [
  { id: 'd1', name: 'Sarah Chen', email: 'sarah@example.com', phone: '+1 111 222 333', bloodGroup: 'A+', location: 'Westside', role: 'donor', availability: true, lastDonationDate: '2024-01-10', donationsCount: 4, livesSaved: 12 },
  { id: 'd2', name: 'Michael Ross', email: 'michael@example.com', phone: '+1 444 555 666', bloodGroup: 'O-', location: 'Eastwood', role: 'donor', availability: true, donationsCount: 1, livesSaved: 3 },
  { id: 'd3', name: 'Elena Gilbert', email: 'elena@example.com', phone: '+1 777 888 999', bloodGroup: 'B+', location: 'South Shore', role: 'donor', availability: false, donationsCount: 0, livesSaved: 0 },
  { id: 'd4', name: 'David Miller', email: 'david@example.com', phone: '+1 999 000 111', bloodGroup: 'AB-', location: 'North Park', role: 'donor', availability: true, donationsCount: 2, livesSaved: 6 },
  { id: 'd5', name: 'Priya Sharma', email: 'priya@example.com', phone: '+1 222 333 444', bloodGroup: 'O+', location: 'Downtown', role: 'donor', availability: true, donationsCount: 3, livesSaved: 9 },
];

export const MOCK_REQUESTS: BloodRequest[] = [
  {
    id: 'r1',
    requesterId: 'u2',
    bloodGroup: 'O-',
    location: 'City General Hospital',
    status: 'pending',
    urgency: 'critical',
    createdAt: new Date().toISOString(),
    hospitalName: 'City General Hospital',
    patientName: 'Jane Smith',
    contactNumber: '+1 987 654 321',
    description: 'Patient requires emergency surgery. Please reach out immediately.'
  },
  {
    id: 'r2',
    requesterId: 'u3',
    bloodGroup: 'A+',
    location: "St. Mary's Medical Center",
    status: 'pending',
    urgency: 'high',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    hospitalName: "St. Mary's Medical Center",
    patientName: 'Robert Brown',
    contactNumber: '+1 654 321 098'
  }
];

export const MOCK_DONATIONS: DonationRecord[] = [
  { id: 'dn1', donorId: 'u1', date: '2023-11-15', location: 'City Blood Bank', recipientName: 'Jane Doe', status: 'completed' },
  { id: 'dn2', donorId: 'u1', date: '2023-08-20', location: 'Red Cross Center', recipientName: 'John Smith', status: 'completed' }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Emergency Nearby!', message: 'O- needed at City General Hospital.', time: '2m ago', isRead: false, type: 'emergency' },
  { id: 'n2', title: 'Reminder', message: 'It has been 3 months since your last donation.', time: '1h ago', isRead: true, type: 'reminder' },
  { id: 'n3', title: 'System Update', message: 'PulseShare is now available in your city.', time: '1d ago', isRead: true, type: 'system' }
];