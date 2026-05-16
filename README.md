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

### Core Features
  - Create, edit and delete tasks
  - Set deadlines for tasks
  - Mark tasks as completed
  - Displays upcoming tasks
  - Sets priority of tasks with color codes
  - View tasks by status(pending/completed)

## Project Structure
/frontend
  /app
    /calendar page
  /pages
  /styles(layout&globals)


/backend
  /prisma
   /migrations
    /schema.prisma
  /src



## Application Pages

- Home Page  
  Displays a personalized welcome interface for users.

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

## Features In Progress

- Edit task functionality
- Task rescheduling
- Task deletion
- Backend API integration
- Authentication system

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

1. Clone the repository
2. Navigate into the project directory
3. Install dependencies

```bash
npm install

npm run dev
```

## Known Issues

- Current backend database migration in progress
- Some task operations are incomplete
- Frontend is currently connected to mock data
- Prisma configuration and connection setup still being refined

## Development Workflow

- Features are developed on separate branches
- Pull requests are reviewed before merging into the main branch
- GitHub is used for version control and collaboration

## QA Findings and Technical Review

### Issues Identified During Testing
- The calendar uses a fixed number of grid cells, which may not correctly display all months.
- Task dates are manually constructed as strings, which can cause incorrect task placement in some cases.
- The "today" highlight may not always be accurate for all calendar cells.
- Task data is stored only in local state and is not saved permanently.

### System Limitations

- Task data is currently stored in local React state and does not persist across sessions.
- The application is not yet connected to a backend API.
- Styling is implemented using inline CSS, which limits scalability and maintainability.
- Calendar logic is frontend-generated and not dynamically validated from a backend source.

### Recommended Improvements

- Replace fixed calendar grid with dynamic 42-cell calendar generation.
- Refactor date handling using JavaScript Date objects instead of manual string construction.
- Introduce backend API integration for persistent task storage.
- Replace inline styles with a scalable styling approach (CSS modules or Tailwind CSS).


## QA Findings (Backend API)

During testing of the task API, the following issues were observed:

- The API allows task creation without validating required fields such as title.
- Invalid or empty request data may still be processed without proper rejection.
- Task update endpoint does not validate input types for fields like "completed".
- Invalid task IDs may cause server errors instead of controlled responses.

### System Limitations

- Input validation is minimal, making the API vulnerable to incorrect or malformed data.
- There is no error handling for cases where a task is not found during updates or deletion.
- Data integrity is fully dependent on client-side correctness.

### Recommended Improvements

- Add validation for required fields (e.g. title must not be empty).
- Validate request parameters to ensure correct data types.
- Handle cases where task ID does not exist before updating or deleting.
- Improve error messages to make API responses clearer for frontend integration.

## QA Checklist

- [ ] Task creation works
- [ ] Task editing works
- [ ] Task deletion works
- [ ] Calendar displays correctly
- [ ] Task priority tagging works
- [ ] UI is responsive
- [ ] No console errors
