export type AdminRole =
  | 'super_admin'
  | 'hotel_editor'
  | 'sleep_assessor'
  | 'review_editor'
  | 'read_only_analyst';

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: AdminRole;
  status: 'active' | 'suspended';
  createdAt: string;
  lastLoginAt?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface ReportedIssue {
  id?: string;
  hotelId: string;
  hotelName: string;
  issueType: 'inaccurate_score' | 'outdated_amenity' | 'noise_complaint' | 'closed_property' | 'other';
  description: string;
  reporterEmail?: string;
  status: 'open' | 'investigating' | 'resolved';
  createdAt: string;
}
