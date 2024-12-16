# API Documentation

## Authentication Endpoints

### User Registration
**POST /api/auth/signup**
Content-Type: application/json

```json
{
  "email": string,
  "password": string,
  "userType": "RoomSeeker" | "RoomProvider",
  "firstName": string,
  "lastName": string
}
```

**Response:**
```json
{
  "token": string,
  "user": UserObject
}
```

### User Login
**POST /api/auth/login**
Content-Type: application/json

```json
{
  "email": string,
  "password": string
}
```

**Response:**
```json
{
  "token": string,
  "user": UserObject
}
```

## User Management Endpoints

### Get User Profile
**GET /api/users/:id**
Authorization: Bearer {token}

**Response:**
```json
{
  "id": string,
  "email": string,
  "userType": string,
  "firstName": string,
  "lastName": string,
  "profileComplete": boolean,
  "preferences": PreferencesObject
}
```

### Update User Profile
**PUT /api/users/:id**
Authorization: Bearer {token}
Content-Type: application/json

```json
{
  "firstName": string,
  "lastName": string,
  "phone": string,
  "occupation": string,
  "nationality": string
}
```

**Response:** Updated UserObject

### Get User Preferences
**GET /api/users/preferences/:id**
Authorization: Bearer {token}

**Response:**
```json
{
  "id": string,
  "userId": string,
  "lifestylePreferences": LifestyleObject,
  "schedulePreferences": ScheduleObject,
  "budgetPreferences": BudgetObject
}
```

### Set User Preferences
**POST /api/users/preferences**
Authorization: Bearer {token}
Content-Type: application/json

```json
{
  "lifestylePreferences": {
    "smoking": boolean,
    "drinking": boolean,
    "pets": boolean,
    "cleanliness": number,
    "noise": number
  },
  "schedulePreferences": {
    "workSchedule": string,
    "sleepSchedule": string,
    "socialActivity": number
  },
  "budgetPreferences": {
    "maxRent": number,
    "utilitySharingPreference": string
  }
}
```

**Response:** PreferencesObject

## Room Management Endpoints

### Create Room Listing
**POST /api/room-description**
Authorization: Bearer {token}
Content-Type: multipart/form-data

```json
{
  "rent": number,
  "sqft": number,
  "rooms": number,
  "bath": number,
  "location": LocationObject,
  "amenities": AmenitiesObject,
  "photos": File[],
  "description": string,
  "availability": string
}
```

**Response:** RoomDescriptionObject

### Get Room Details
**GET /api/room-description/:id**
Authorization: Bearer {token}

**Response:**
```json
{
  "id": string,
  "providerId": string,
  "rent": number,
  "sqft": number,
  "rooms": number,
  "bath": number,
  "location": LocationObject,
  "amenities": AmenitiesObject,
  "photos": string[],
  "description": string,
  "availability": string,
  "createdAt": string,
  "updatedAt": string
}
```

### Update Room Details
**PUT /api/room-description/:id**
Authorization: Bearer {token}
Content-Type: multipart/form-data

```json
{
  // Same fields as POST request
}
```

**Response:** Updated RoomDescriptionObject

## Compatibility Endpoints

### Get Compatibility Score
**GET /api/compatibility-score/:seekerId/:providerId**
Authorization: Bearer {token}

**Response:**
```json
{
  "score": number,
  "breakdown": {
    "lifestyle": number,
    "schedule": number,
    "budget": number,
    "additional": number
  }
}
```

### Calculate Compatibility
**POST /api/compatibility/calculate**
Authorization: Bearer {token}
Content-Type: application/json

```json
{
  "seekerId": string,
  "providerId": string,
  "preferences": {
    "seeker": PreferencesObject,
    "provider": PreferencesObject
  }
}
```

**Response:**
```json
{
  "score": number,
  "breakdown": CompatibilityBreakdownObject
}
```

## Connection Management Endpoints

### Send Connection Request
**POST /api/connections/request**
Authorization: Bearer {token}
Content-Type: application/json

```json
{
  "fromUserId": string,
  "toUserId": string,
  "message": string
}
```

**Response:** ConnectionObject

### Get Connection Status
**GET /api/connections/status/:userId1/:userId2**
Authorization: Bearer {token}

**Response:**
```json
{
  "status": "NONE" | "PENDING" | "CONNECTED" | "BLOCKED"
}
```
