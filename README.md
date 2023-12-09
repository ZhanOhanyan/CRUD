# CRUD
CampusCrafter API Documentation
Introduction
CampusCrafter is a robust, web-based platform designed to streamline and enhance the educational experience for students, educators, and administrators. This comprehensive solution manages academic processes and offers a suite of tools tailored to the unique needs of the educational sector.
Scope and Requirements
User Types
Students: Access courses, submit assignments.
Teachers: Create/manage courses, assignments, grade submissions.
Admins: Manage user accounts, oversee the system.
Data Models
Course:
id
title
description
teacher_id (foreign key/reference linking to the teacher's user profile)
start_date
credits
enrollment_limit
status (active, completed, upcoming)
Assignment:
id
title
content
due_date
course_id (foreign key linking to the associated course)
posted_date
max_score
submission_format
Grade:
id
student_id (foreign key linking to the student's user profile)
assignment_id (foreign key linking to the assignment)
score
feedback
submission_date
User Profile:
id
name
email
role (student, teacher, admin)
password (hashed for security)
date_joined
last_login
profile_picture
bio (optional for students and teachers)
Functional Requirements
Students:
Browse courses
Submit assignments
Teachers:
Create assignments, courses
Grade submissions
Admins:
Create/manage user accounts
Access all data
Courses API
Get All Courses
GET /api/courses
Accessible by students, teachers, and admins
Optional filters for status, teacher ID, etc.
Get Single Course
GET /api/courses/{id}
Accessible by students, teachers, and admins
Retrieves detailed information about a specific course
Create Course
POST /api/courses
Accessible by teachers and admins
Teachers can create a course; admins can also create on behalf of teachers
Update Course
PUT /api/courses/{id}
Accessible by the course's teacher and admins
Only the teacher who created the course or admins can update the course
Delete Course
DELETE /api/courses/{id}
Accessible by the course's teacher and admins
Only the teacher who created the course or admins can delete the course
Assignments API
Get Assignments for Course
GET /api/courses/{courseId}/assignments
Accessible by students, teachers, and admins
Students can view assignments for their enrolled courses; teachers and admins can view all assignments
Create Assignment
POST /api/courses/{courseId}/assignments
Accessible by the course's teacher and admins
Teachers can create assignments for their courses; admins can also create assignments
Update Assignment
PUT /api/assignments/{id}
Accessible by the course's teacher and admins
Teachers can update their assignments; admins can update any assignment
Delete Assignment
DELETE /api/assignments/{id}
Accessible by the course's teacher and admins
Assignments can be deleted by the teacher who created them or by admins
Grades API
Submit Grade
POST /api/assignments/{assignmentId}/grades
Accessible by teachers and admins
Teachers post grades for assignments they created; admins can post grades for any assignment
Get Grades for Student
GET /api/students/{studentId}/grades
Accessible by the student for their grades, teachers for students in their courses, and admins
Students can view their grades; teachers can view grades for students in their courses; admins can view all grades
User Profile API
Get User Profile
GET /api/users/{userId}
Accessible by the user themselves and admins
Users can view their profiles; admins can view any profile
Update User Profile
PUT /api/users/{userId}
Accessible by the user themselves and admins
Users can update their profiles; admins can update any user profile
Create User
POST /api/users
Accessible by admins
Admins can create new user accounts
Delete User
DELETE /api/users/{userId}
Accessible by admins
Admins can delete user accounts
Set Up Authentication and Authorization
Implement user registration and login.
Use JWT or session-based authentication.
Set up role-based access control (RBAC) for different user types.
Tools and Frameworks to Consider
Frameworks: Express.js for Node.js
ORMs: Mongoose (Node.js for MongoDB)
Documentation Tools: Swagger, Postman
Languages: JavaScript
