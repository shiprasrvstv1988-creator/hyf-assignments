
--Part 1: Basic CRUD Operations

--Insert a new user with your own name and email
INSERT INTO user (name, email, phone) VALUES ('Shipra Srivastava', 'shiprasrvstv1988@gmail.com', '+4571399739')

--Insert a new task assigned to yourself
INSERT INTO task (title, description, created, updated, due_date, status) VALUES
  ('Learn SQL', 'Practice database queries', datetime('now'), datetime('now'), '2026-04-20', 'In Progress')

--Update the title of the task you just created to "Master SQL Basics"
SELECT * from task WHERE title = 'Learn SQL'
UPDATE task SET title = 'Master SQL Basics' WHERE id = 5

--Change the due date of your task to two weeks from today
UPDATE task SET due_date = date('now', '+14 days') WHERE id = 5

--Change the status of your task to "Done"
UPDATE task SET status = 'Done' WHERE id = 5

--Delete one of the tasks in the database (choose any task)
DELETE FROM task WHERE id = 5

--Part 2: Working with Relationships

--List all users who don't have any tasks assigned
SELECT * from "user" u 
LEFT JOIN user_task ut ON u.id = ut.user_id 
WHERE ut.user_id IS NULL  

--Find all tasks with a status of "Done"
SELECT t.title AS task_name, s.name AS status from task t 
JOIN status s ON t.status_id = s.id 
WHERE s.name = 'Done'

--Find all overdue tasks (due_date is earlier than today)
SELECT t.title AS overdue_tasks, t.due_date FROM task t 
WHERE due_date < date('now')

--Part 3: Modifying the Database Schema

--Add a new column called priority to the task table with possible values: 'Low', 'Medium', 'High'. 💡 Remember to provide default values.
ALTER TABLE task ADD COLUMN priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) Default 'Medium'

--Update some existing tasks to have different priority values
UPDATE task SET priority = 'High' WHERE id IN (3,9,18,20,26,31,36,40)
UPDATE task SET priority = 'Low' WHERE due_date IS NULL

--Create a new table called category
CREATE TABLE category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, 
  color TEXT NOT NULL
);

--Create a linking table called task_category to establish a many-to-many relationship between tasks and categories:
CREATE TABLE task_category (
  task_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL, 
  PRIMARY KEY (task_id, category_id),
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
);

--Insert at least 3 categories
INSERT INTO category (name, color) VALUES ('Work','Red'), ('Personal','Blue'), ('Study', 'Green')

--Assign categories to at least 5 different tasks
INSERT INTO task_category (task_id, category_id) VALUES(2, 1);
INSERT INTO task_category (task_id, category_id) VALUES(24, 1);
INSERT INTO task_category (task_id, category_id) VALUES(11, 2);
INSERT INTO task_category (task_id, category_id) VALUES(32, 2);
INSERT INTO task_category (task_id, category_id) VALUES(41, 3);
INSERT INTO task_category (task_id, category_id) VALUES(23, 3);

--Part 4: Advanced Queries

--Find all tasks in a specific category (e.g., "Work")    
SELECT t.title AS task, c.name AS category from task t 
JOIN task_category tc ON t.id = tc.task_id 
JOIN category c ON tc.category_id = c.id 
WHERE c.name = "Work"

--List tasks ordered by priority (High to Low) and by due date (earliest first)
SELECT title, priority, due_date from task
ORDER BY 
  CASE 
    WHEN priority = 'High' THEN 1
    WHEN priority = 'Medium' THEN 2
    WHEN priority = 'Low' THEN 3
  END,
  due_date ASC;

--Find which category has the most tasks
SELECT c.name, COUNT(tc.task_id) AS task_count
FROM category c
JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.id
ORDER BY task_count DESC
LIMIT 1

--Get all high priority tasks that are either "In Progress" or "To Do"
SELECT t.title AS task_name, t.priority, s.name AS status from task t 
JOIN status s ON s.id = t.status_id 
WHERE t.priority = 'High'
AND s.name IN ('In progress', 'Not started');

--Find users who have tasks in more than one category
SELECT u.id, u.name, COUNT(DISTINCT tc.category_id) AS category_count from "user" u 
JOIN user_task ut ON u.id = ut.user_id 
JOIN task t ON t.id = ut.task_id 
JOIN task_category tc ON t.id = tc.task_id
GROUP BY u.id,  u.name
HAVING COUNT(DISTINCT tc.category_id) > 1;