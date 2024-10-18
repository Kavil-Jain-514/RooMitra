# RooMitra
## Database Schema
DBDiagram.io link - https://dbdiagram.io/d/RooMitra-6703766ffb079c7ebd8b55a7
![RooMitra_Schema](RooMitra.svg)

Database - RooMitra-db

Collections

ActivityLog: Tracks user activities like matches, messages, profile updates, and feedback. This helps keep track of important events for users.

BookingRequests: Manages requests made by room seekers for a specific room. It allows providers to accept or reject booking requests.

Feedback: Allows users to provide ratings and comments about each other, contributing to the rating system in the app.

Locations: Stores geographical details like street name, city, and coordinates, which is linked to rooms and users.

Matches: Stores accepted or pending matches between room seekers and providers. The lastInteractionAt timestamp is useful for determining when the last activity occurred, helping drive features like reminders or tracking engagement.

Messages: Stores conversation history between matched users (room seekers and providers).

Nationalities: Lists nationalities for both room seekers and providers.

Notifications: Manages various notifications for users based on activities like new matches, messages, and booking requests.

Occupations: Stores occupation data for users.

ProviderPreferenceQuestions and SeekerPreferenceQuestions: Manages predefined questions for both providers and seekers, and the possible answers they can choose from.

ProviderPreferences and SeekerPreferences: Stores each user’s answers to preference questions, helping in matching users with similar preferences.

RoomDescription: Provides detailed room information, including location, amenities, and availability.

RoomProviders and RoomSeekers: Store user profiles, including basic info, preferences, and room-related details.

Verification: Manages verification processes, including email and document verification, ensuring that only verified users can engage in renting activities.
