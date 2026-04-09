export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UserRole = 'donor' | 'recipient' | 'admin';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type RequestStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodGroup: BloodGroup;
  location: string;
  role: UserRole;
  availability: boolean;
  lastDonationDate?: string;
  avatar?: string;
  donationsCount: number;
  livesSaved: number;
}

export interface BloodRequest {
  id: string;
  requesterId: string;
  bloodGroup: BloodGroup;
  location: string;
  status: RequestStatus;
  urgency: UrgencyLevel;
  createdAt: string;
  hospitalName: string;
  patientName: string;
  contactNumber: string;
  description?: string;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  date: string;
  location: string;
  recipientName?: string;
  status: 'completed' | 'pending';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'emergency' | 'system' | 'reminder';
}