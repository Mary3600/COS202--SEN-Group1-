# COS202--SEN-Group1-
## Student Task Manager Application

The Student Task Manager is a web-based application designed to help students organize academic tasks, manage deadlines, and improve productivity. The system allows users to create, update, delete, and monitor tasks through an interactive interface built with React.js and a backend powered by Node.js.

### Group Members
  | Name | Role |
  | --- | ---|
  | ADEBIYI Alexandra | Front End Developer |
  | NTEKOP Kendara | Front End Developer |
  | BAMIDELE Oluwagbolawole | Back End Developer |
  | OKONKWO Chibuifem | Back End Developer |
  | MORAH Somtochukwu | Team Lead |
  | WURAOLA Fatimah | QA/Documentation |
  | OYELUYI Olaoluwasubomi | QA/Documentation |
  | HARUNA Tayyib | Integration |

### Core Features
  - Create, edit and delete tasks
  - Set deadlines for tasks
  - Mark tasks as completed
  - Displays upcoming tasks
  - Sets priority of tasks with color codes
  - View tasks by status(pending/completed)

## User Guide

### Creating a Task
1. Click the “Add Task” button
2. Enter task title
3. Select a date
4. Choose priority
5. Save task

### Viewing Tasks
- Tasks appear on the calendar based on their assigned date
- Click a task to view details

### Navigation
- Sidebar allows switching between views (Calendar, Dashboard, Archive)

## Application Pages

- Home Page  
  Displays a personalized welcome interface for users.

- Sign Up Page  
  Allows new users to create an account. UI implementation is complete and backend authentication integration is in progress.

- Task Dashboard  
  Displays all tasks including completed, pending, and upcoming tasks.

- Calendar View  
  Displays tasks in a calendar grid layout.

- Task Edit/View Page  
  Allows users to update or modify existing tasks.

- Archive Page  
  Displays archived or completed tasks.

## Features Currently Implemented

- Calendar grid view
- Task creation modal
- Responsive sidebar navigation
- Add task functionality
- Task priority tagging
- Upcoming task display
- Task categorization
- Task view modal
- Sign up page UI

## Features In Progress

- Edit task functionality
- Task rescheduling
- Task deletion
- Backend API integration
- Authentication system
- Sign up page functionality
- Frontend merge integration
- API endpoint implementation

## Tech Stack

### Frontend
- React.js / Next.js
- JavaScript
- CSS

### Backend
- Node.js
- Prisma ORM

### Database
- PostgreSQL (currently migrating to a cloud-based database)

## Database Notes

The project initially used a locally hosted PostgreSQL database integrated with Prisma ORM. 

Due to portability and deployment challenges associated with local database hosting, the team is currently migrating to a cloud-based database solution for easier collaboration and deployment across multiple systems.

## Frontend Components

- Sidebar
- TaskList
- TaskCard
- Task Modal
- Task View Modal
- Calendar Grid

## Planned API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /login | User authentication |
| POST | /tasks | Create a new task |
| GET | /tasks | Retrieve all tasks |
| PUT | /tasks/:id | Update existing task |
| DELETE | /tasks/:id | Delete task |

## Installation & Setup

### 1. Clone Repository
git clone <repo-url>

### 2. Install Frontend Dependencies
cd frontend
npm install

### 3. Install Backend Dependencies
cd backend
npm install

### 5. Generate Prisma Client
npx prisma generate

### 6. Run Backend Server
npm run dev

### 7. Run Frontend
cd frontend
npm run dev


## Known Issues

- Current backend database migration in progress
- Some task operations are incomplete
- Frontend is currently connected to mock data
- Prisma configuration and connection setup still being refined
- Ongoing frontend merge conflicts while integrating new UI work
- API endpoints still in development

## Development Workflow

- Features are developed on separate branches
- Pull requests are reviewed before merging into the main branch
- GitHub is used for version control and collaboration
- Frontend team is actively merging completed UI components
- API endpoints are currently being prepared for integration

## QA Findings and Technical Review

## QA Findings (Frontend UI Testing)

During functional testing of the Calendar View and task system, the following issues were observed:

### Task Persistence Issues
- Tasks are created successfully and displayed correctly across different calendar months.
- However, all tasks are stored in local React state and are lost when the page is refreshed.
- This indicates absence of persistent storage or backend integration for frontend data synchronization.

### Task Deletion Limitation
- There is currently no direct UI flow to delete tasks after creation from the calendar view.
- Task deletion logic exists in the system but is not fully exposed in the UI flow.

### Navigation Issues
- Sidebar navigation items such as:
  - Dashboard
  - Archive
  are not yet connected to functional routes or views.
- Notification and settings icons are currently non-interactive placeholders.

### Form Validation Issue
- When creating a task:
  - Missing date input incorrectly triggers validation error on the task title field instead of the date field.
- This indicates improper field-level validation mapping in the task modal form.

### Multi-task Handling
- Multiple tasks can successfully be assigned to the same date without conflict.
- This behavior is correct and supports concurrent task scheduling per day.

### UI/Logic Observations
- Calendar grid renders correctly and supports multi-month navigation.
- However, task rendering is dependent on string-based date matching, which may lead to inconsistencies if date formats change.

---

### Summary
The frontend is functionally stable for task creation and visualization but lacks:
- persistent storage
- complete CRUD UI flow
- proper form validation mapping
- fully implemented navigation system


## QA Findings (Backend API Testing)

During API testing and frontend integration review, the following issues were observed:

### Validation Issues
- The API allows task creation without strict validation of required fields such as title and date.
- Empty or malformed payloads are not consistently rejected.

### Error Handling Issues
- Invalid task IDs during update or delete operations may result in unhandled server errors instead of controlled responses.

### Data Integrity Concerns
- Backend relies heavily on client-side validation, which increases risk of inconsistent or invalid data storage.

### Setup Complexity
- Backend requires additional setup steps beyond `npm install`, including:
  - `npx prisma generate`
  - database configuration via `.env`
- Missing setup instructions can prevent successful onboarding of new contributors.

### Development Dependencies
- Additional runtime dependency (`tsx`) is required for development server execution.

---

### Summary
The backend is structurally complete for CRUD operations but requires:
- stronger validation layer
- improved error handling
- clearer setup documentation
- tighter integration with frontend validation rules

## System Integration Gaps

During end-to-end testing, the following integration gaps were identified:

- Frontend task state is not connected to backend persistence layer.
- Task creation, deletion, and updates are not synchronized with the database.
- Calendar view relies on local mock state instead of real-time API data.
- Navigation system (Dashboard, Archive, Settings) is not linked to backend or routing logic.

---

### Impact
These gaps result in:
- loss of data on refresh
- incomplete user workflow
- reduced usability of core features

## Recommended System Improvements

### Frontend Improvements
- Implement persistent state using backend API integration.
- Fix form validation mapping for task fields.
- Connect sidebar navigation to proper routes/pages.
- Add loading and error states for API interactions.

### Backend Improvements
- Add strict validation middleware for all task endpoints.
- Improve error handling for invalid IDs and malformed requests.
- Ensure consistent response structure across all endpoints.

### System Architecture Improvements
- Replace local state task storage with API-driven data fetching.
- Implement real-time sync between frontend and backend.
- Introduce centralized validation layer shared between frontend and backend.

## QA Checklist

- [ ] Task creation works
- [ ] Task editing works
- [ ] Task deletion works
- [ ] Calendar displays correctly
- [ ] Task priority tagging works
- [ ] UI is responsive
- [ ] No console errors
