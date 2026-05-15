# COS202--SEN-Group1-
## Student Task Manager application

The Student Task Manager is a web-based application designed to help students organize academic tasks, manage deadlines, and improve productivity. The system allows users to create, update, delete, and monitor tasks through an interactive interface built with React.js and a backend powered by Node.js.

### Group Members
 - ADEBIYI Alexandra: Front End Developer
 - BAMIDELE Oluwagbolawole: Back End Developer
 - HARUNA Tayyib: DevOps/Integration 
 - MORAH Somtochukwu: Team Lead
 - NTEKOP Kendara: Front End Developer
 - OKONKWO Chibuifem: Back End Developer
 - OYELUYI Olaoluwasubomi: Quality Assurance/Documentation
 - WURAOLA Fatimah: Quality Assurance/Documentation

### Core Features
  - Create, edit and delete tasks
  - Set deadlines for tasks
  - Mark tasks as completed
  - Displays upcoming tasks
  - Sets priority of tasks with color codes
  - View tasks by status(pending/completed)

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

