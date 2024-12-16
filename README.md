# RooMitra - Roommate Matching Platform

## Overview

RooMitra is a comprehensive roommate matching platform that connects room seekers with room providers using an intelligent compatibility matching system. The platform offers a seamless experience for users to find their ideal living situations based on preferences, lifestyle choices, and room requirements.

## Features

### User Types

1. Room Seeker: Users looking for rooms and roommates
2. Room Provider: Users with rooms available for rent

### Core Functionalities

#### 1. User Authentication & Profile Management

- Secure signup/login system

- Separate flows for room seekers and providers

- Profile customization and preference settings

#### 2. Room Management

- Room listing and description
  Features include:

  - Detailed room descriptions - Amenity specifications - Photo gallery (up to 5 photos) - Location details - Room availability and pricing

- Room search and filtering by location

#### 3. Compatibility Matching System

- Percentage-based matching algorithm

- Visual compatibility score display

- Match categorization:
  - High Match (≥75%)
  - Medium Match (50-74%)
  - Low Match (<50%)

## Database Schema

DBDiagram.io link - https://dbdiagram.io/d/RooMitra-6703766ffb079c7ebd8b55a7
![RooMitra_Schema](RooMitra.svg)

### Database - RooMitra-db

#### Collections

- Matches: Stores accepted or pending matches between room seekers and providers. The lastInteractionAt timestamp is useful for determining when the last activity occurred, helping drive features like reminders or tracking engagement.

- Messages: Stores conversation history between matched users (room seekers and providers).

- Nationalities: Lists nationalities for both room seekers and providers.

- Notifications: Manages various notifications for users based on activities like new matches, messages, and booking requests.

- Occupations: Stores occupation data for users.

- ProviderPreferenceQuestions and SeekerPreferenceQuestions: Manages predefined questions for both providers and seekers, and the possible answers they can choose from.

- ProviderPreferences and SeekerPreferences: Stores each user’s answers to preference questions, helping in matching users with similar preferences.

- RoomDescription: Provides detailed room information, including location, amenities, and availability.

- RoomProviders and RoomSeekers: Store user profiles, including basic info, preferences, and room-related details.

- Verification: Manages verification processes, including email and document verification, ensuring that only verified users can engage in renting activities.

## Technical Architecture

### Frontend Routes

- // Public Routes

  - / - Landing Page
  - /login - User Login
  - /userSignup - User Registration

- // Protected Routes
  - /dashboard - User Dashboard
  - /preferences-setup - User Preferences
  - /room-details - Room Management
  - /profile/:id - User Profiles
  - /update-room-details - Room Updates

### API Endpoints

#### Authentication

- POST /api/auth/signup
- POST /api/auth/login

#### User Management

- GET /api/users/:id
- PUT /api/users/:id
- GET /api/users/preferences/:id
- POST /api/users/preferences

#### Room Management

- POST /api/room-description
- GET /api/room-description/:id
- PUT /api/room-description/:id
- DELETE /api/room-description/:id

#### Compatibility

- GET /api/compatibility-score/:seekerId/:providerId
- POST /api/compatibility/calculate

## Compatibility Algorithm

The matching algorithm considers multiple factors:

1. **Lifestyle Preferences** (40% weight)

   - Smoking habits
   - Drinking habits
   - Dietary preferences
   - Pets
   - Cleanliness
   - Noise level

2. **Schedule Compatibility** (30% weight)

   - Work schedule
   - Social activities
   - Sleep schedule

3. **Budget Alignment** (20% weight)

   - Utility sharing preferences
   - Rent affordability

4. **Additional Factors** (10% weight)

   - Age
   - Gender
   - Nationality
   - Occupation

### Score Calculation

```
final_score = (
    (lifestyle_score * 0.4) +
    (schedule_score * 0.3) +
    (budget_score * 0.2) +
    (additional_score * 0.1)
) * 100
```

## Installation & Setup

1. Clone the repository

```
git clone https://github.com/Kavil-Jain-514/roomitra.git
```

2. Install dependencies

```
# Frontend

cd client/roomitra-frontend
npm install

# Backend
cd backend/roomitra
mvn install
```

3. Environment Setup

```
# Frontend (.env)
REACT_APP_API_URL=http://localhost:8080/api

# Backend (application.properties)
spring.data.mongodb.uri=mongodb://localhost:27017/roomitra
```

4. Run the application

```
# Frontend
npm start

# Backend
./mvnw spring-boot:run
```
