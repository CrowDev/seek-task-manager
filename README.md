# Task Manager Web Application

## Project Overview

This is a modern task management application built with React that enables users to organize and track their tasks across different stages of completion. The application features a clean, responsive interface with a kanban-style board for desktop users and a tab-based interface for mobile users.

## Key Features

- **User Authentication**: Secure login using AWS Cognito
- **Task Management**: Create, read, update, and delete tasks
- **Kanban Board View**: Visual task organization by status columns
- **Responsive Design**: Adapts to different screen sizes with optimized layouts
- **Task Prioritization**: Mark tasks with different priority levels
- **Status Tracking**: Move tasks through different stages (Todo, In Progress, In Review, Done, Blocked)

## Technology Stack

### Frontend

- **React 19**: Modern component-based UI library
- **Material UI**: Component library for consistent design elements
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Router**: Navigation and routing
- **React OIDC Context**: Authentication management

### Authentication

- **AWS Cognito**: User authentication and identity management

### Development Tools

- **Vite**: Next-generation frontend build tool
- **ESLint**: Code quality and style checking
- **Vitest**: Testing framework

## Application Architecture

### Component Structure

The application follows a modular component-based architecture:

- **Layout Components**: Provide the overall structure and navigation
- **Board Components**: Display and organize tasks in columns
- **Task Components**: Render individual task cards with actions
- **Dialog Components**: Handle task creation, editing, and deletion
- **Context Providers**: Manage global state across components

### State Management

- **React Context API**: Used for global state management through `DashboardContext`
- **Custom Hooks**: Handle API interactions and component-specific state
  - `useTasks`: Fetch and manage task data
  - `useUpsertTask`: Create and update tasks
  - `useDeleteTask`: Remove tasks
  - `useBreakpoint`: Handle responsive design transitions

### Authentication Flow

1. Users are redirected to the AWS Cognito login/signup page
2. Upon successful authentication, users are redirected back to the application
3. Protected routes validate authentication status before rendering
4. Token management is handled by the OIDC context provider

### Data Flow

1. Task data is fetched from an external API
2. Tasks are organized by status into appropriate columns
3. Users can create, edit, and delete tasks through modal dialogs
4. Actions trigger API calls and context updates to refresh the UI

## Responsive Design

The application implements a responsive design strategy:

- **Desktop View**: Full kanban board with all columns visible
- **Mobile/Tablet View**: Tab-based interface showing one status column at a time

## User Interface

The UI employs a clean, professional design with:

- **Color Coding**: Visual indicators for task priority
- **Card-Based Layout**: Individual task cards with context menus
- **Modal Dialogs**: Form interfaces for task creation and editing
- **Navigation Header**: App title and user options
