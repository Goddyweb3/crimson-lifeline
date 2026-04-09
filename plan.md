# Blood Donation Management System - Project Plan

## 1. Introduction
This plan outlines the steps to build the Blood Donation Management System as per the provided Software Requirements Specification (SRS).

## 2. Core Components
- Mobile App (Users/Donors)
- Web Admin Dashboard
- Backend API
- Database

## 3. Phases and Tasks

### Phase 1: Planning & Design
- **Task 1.1**: Define High-Level Architecture (as per SRS Section 5).
- **Task 1.2**: Design Database Schema (based on SRS Section 6, use SQL).
- **Task 1.3**: Design UI/UX Mockups (Figma style layout for Mobile App and Admin Dashboard, as per SRS Section 8).

### Phase 2: Backend Development
- **Task 2.1**: Set up Backend Environment (e.g., Node.js/PHP).
- **Task 2.2**: Implement Database Structure (based on Task 1.2).
- **Task 2.3**: Develop API Endpoints (as per SRS Section 7 and Functional Requirements).
    - User Registration & Authentication
    - Donor Management
    - Search & Filter Donors
    - Emergency Blood Request
    - Notification System integration (e.g., Firebase)
    - Communication System
    - Admin functionalities
    - Donation Tracking

### Phase 3: Frontend Development
- **Task 3.1**: Set up Frontend Environment (e.g., Flutter/React Native for Mobile, React/Vue for Admin).
- **Task 3.2**: Implement Mobile App UI (based on Task 1.3 and SRS Section 8).
    - Splash Screen
    - Login / Register
    - Dashboard
    - Search Donors
    - Emergency Request Form
    - Notifications
    - Profile
- **Task 3.3**: Implement Admin Dashboard UI (based on Task 1.3 and SRS Section 8).
    - User Management
    - Request Monitoring
    - Analytics

### Phase 4: Integration & Testing
- **Task 4.1**: Integrate Frontend with Backend APIs.
- **Task 4.2**: Implement Notification System (Firebase).
- **Task 4.3**: Conduct Unit Testing and Integration Testing.
- **Task 4.4**: Perform Security Testing (as per SRS Section 4.2).
- **Task 4.5**: Validate Non-Functional Requirements (Performance, Usability, Reliability, Scalability).

### Phase 5: Deployment
- **Task 5.1**: Set up Cloud Services (e.g., AWS, Firebase).
- **Task 5.2**: Deploy Backend API and Database.
- **Task 5.3**: Deploy Frontend Applications (Mobile app stores, Web hosting).

## 4. Tools & Technologies (Suggested)
- **Frontend**: Flutter / React Native (Mobile), React / Vue (Admin)
- **Backend**: Node.js / PHP (Laravel)
- **Database**: PostgreSQL / MySQL (or Supabase if suitable)
- **Notifications**: Firebase Cloud Messaging
- **Cloud**: AWS / Google Cloud Platform

## 5. Acceptance Criteria (from SRS Section 11)
- Users can register and log in.
- Donors can be searched within a location.
- Emergency requests trigger notifications.
- Admin can manage system effectively.

## 6. Future Enhancements (from SRS Section 10)
- AI-based donor matching
- Integration with hospitals
- Blood bank inventory tracking
- Offline SMS-based request system

## 7. Constraints (from SRS Section 9)
- Requires internet connectivity.
- GPS accuracy may vary.
- SMS integration depends on local providers.

## 8. Bonus Features (from SRS Section 'Bonus')
- Live map of donors
- QR code donor ID
- Health eligibility checker
- Multi-language support
