# Task Management System

## Deskripsi

Task Management System adalah aplikasi manajemen tugas berbasis Full Stack yang dibangun menggunakan Spring Boot sebagai backend dan React.js sebagai frontend. Aplikasi ini memungkinkan pengguna untuk mengelola tugas secara efisien dengan fitur autentikasi JWT, pengelolaan tugas, upload/download Excel, notifikasi email otomatis, serta dashboard monitoring.

---

## Fitur Utama

### Authentication & Authorization

* Register User
* Login menggunakan JWT
* Role Based Access Control (Admin & User)
* Protected Route
* Logout

### Task Management

* Tambah Task
* Edit Task
* Hapus Task
* Detail Task
* Status Task
* Priority Task
* Deadline Task

### Dashboard

* Total Task
* Task Completed
* Task Pending
* Task In Progress
* Statistik Task

### Search & Filter

* Search berdasarkan Title
* Filter berdasarkan Status
* Filter berdasarkan Priority
* Pagination

### Import Export Excel

* Upload Data Task dari Excel
* Download Template Excel
* Download Semua Data Task
* Download Data Task Berdasarkan User

### Email Notification

* Reminder H-1 Hari Deadline
* Reminder H-1 Jam Deadline
* Email Otomatis Menggunakan Scheduler

### User Management

* Data User
* Role User
* Monitoring Task User

---

## Teknologi Yang Digunakan

### Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven
* Apache POI
* Java Mail Sender

### Frontend

* React.js
* Vite
* Axios
* React Router DOM
* Tailwind CSS
* Lucide React

### Database

* PostgreSQL

---

## Struktur Project

```bash
project
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── utils
│   └── package.json
│
├── task_service
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── payload
│   ├── utility
│   └── config
│
└── README.md
```

---

## Database

### Table Users

| Field    | Type    |
| -------- | ------- |
| id       | bigint  |
| username | varchar |
| password | varchar |
| role     | varchar |
| email    | varchar |

### Table Tasks

| Field       | Type      |
| ----------- | --------- |
| id          | bigint    |
| title       | varchar   |
| description | text      |
| deadline    | timestamp |
| priority    | varchar   |
| status      | varchar   |
| user_id     | bigint    |
| created_at  | timestamp |

---

## API Utama

### Authentication

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /auth/register |
| POST   | /auth/loginJwt |

### User

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /users         |
| GET    | /users/id/{id} |
| PUT    | /users         |
| DELETE | /users/{id}    |

### Task

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /tasks         |
| GET    | /tasks         |
| GET    | /tasks/id/{id} |
| PUT    | /tasks         |
| DELETE | /tasks/{id}    |

### Excel

| Method | Endpoint                 |
| ------ | ------------------------ |
| POST   | /tasks/uploadExcel       |
| GET    | /tasks/downloadExcel     |
| GET    | /tasks/downloadExcelUser |
| GET    | /tasks/downloadTemplate  |

---

Project ini dibuat untuk kebutuhan pembelajaran dan pelatihan Full Stack Development menggunakan Spring Boot dan React.
