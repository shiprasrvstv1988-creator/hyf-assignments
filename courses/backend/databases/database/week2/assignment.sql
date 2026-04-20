--Part A: Aggregate Functions & Reporting

--Count the total number of tasks in the database
SELECT COUNT(*) FROM task

--Count how many tasks each user has been assigned (include users with zero tasks)
SELECT u.id, u.name, COUNT(t.id) AS tasks_assigned FROM user u
LEFT JOIN task t ON t.user_id = u.id
GROUP BY u.id, u.name

--Find the number of tasks per status (e.g., how many are "To Do", "In Progress", "Done")
SELECT s.name, COUNT(t.id) AS tasks_status from status s
LEFT JOIN task t ON t.status_id = s.id 
GROUP BY s.id, s.name

--Find the user who has the most tasks assigned
SELECT u.id, u.name, COUNT(t.id) AS task_count FROM "user" u 
JOIN task t ON t.user_id = u.id 
GROUP BY u.id, u.name
ORDER BY task_count DESC
LIMIT 1;

--Calculate the average number of tasks per user (only count users who have at least one task)
SELECT AVG(task_count) AS avg_tasks_per_user
FROM (
    SELECT user_id, COUNT(*) AS task_count
    FROM task
    GROUP BY user_id
);

--Find the earliest and latest due date across all tasks
SELECT 
    MIN(due_date) AS earliest_due_date,
    MAX(due_date) AS latest_due_date
FROM task;

--List each category along with the number of tasks it contains, ordered from most to least tasks
SELECT c.name, COUNT(tc.task_id) AS tasks_count FROM category c
LEFT JOIN task_category tc ON tc.category_id = c.id
GROUP BY c.id, c.name
ORDER BY tasks_count DESC

--Find all users who have more than 2 tasks assigned to them
SELECT u.name, COUNT(t.id) AS tasks_assigned FROM user u
JOIN task t ON u.id = t.user_id
GROUP BY u.id, u.name
HAVING tasks_assigned > 2

--Part B: SQL Injection
--1. Spot the Vulnerability

function getTasksByUser(userName) {
  const query = `SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = '${userName}')`;
  db.all(query, (err, rows) => console.log(rows));
}
--1. Explain in a comment in your .sql file: what would happen if userName was set to ' OR '1'='1? What data would be returned, and why is this dangerous?

/* VULNERABILITY EXPLANATION:
If userName is set to ' OR '1'='1, the resulting query becomes:
SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = '' OR '1'='1');
The code takes whatever the user types and pastes it directly into the database command. It can't tell the difference between a "name" and a "command."

WHAT HAPPENS:
1. The first quote (') trick the computer into thinking the name is finished.
2. The 'OR' adds a new rule.
3. The '1'='1' is a "math truth" that is always true.
4. Instead of finding one specific ID, the database gets confused because the "always true" math (1=1) makes it look like every user is a match.

WHY THIS IS DANGEROUS:
This trick breaks the search filter. Instead of seeing just one person's work, the attacker gets to see everyone's tasks across the whole company. 
It’s dangerous because they can peek at private info they aren't supposed to see. 
This is a "Broken Access Control" vulnerability.
*/

--2. Write the malicious string that an attacker could use to delete all tasks from the database. 
--You do not need to run it — just write it as a comment with an explanation of how it works.

/* MALICIOUS STRING: 
' ); DROP TABLE task; --

HOW IT WORKS:
1. The ' ); bits "close" the original search command early so the 
   computer thinks that part is finished.
2. The semicolon (;) acts like a "new line" allowing the 
   attacker to start a completely new command.
3. The "DROP TABLE task;" is the new command. This tells the database 
    to completely delete the table where all the tasks are stored.
4. The dashes (--) tell the computer to ignore anything that comes 
   after them. This prevents the code from crashing and ensures the 
   "Delete" command actually runs.
*/

/*2. Fix the Vulnerability
To fix this, we use "Parameterized Queries." Instead of putting the variable directly in the string, we use a '?' as a placeholder*/

function getTasksByUser(userName) {
  --1.Use '?' instead of '${userName}'
  const query = `SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = ?)`;

  --2.Pass the userName in a separate array. The database library will now treat it safely as data only.
  db.all(query, [userName], (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(rows);
  });
}

 /* WHY THIS WORKS:
This tells the database: "Here is the command, and here is the name to look for." 
Even if the user types 'DROP TABLE', the database just searches for a person 
literally named "DROP TABLE" rather than actually deleting anything.
 */

 --Part C: Transactions

 --1. Write a transaction that reassigns all tasks from one user to another, then deletes the original user.
BEGIN TRANSACTION;
 UPDATE task SET user_id = 2 WHERE user_id = 1;
 DELETE FROM user WHERE id = 1;
COMMIT;

--Write a second transaction that demonstrates a deliberate rollback
BEGIN TRANSACTION;
   UPDATE task SET status_id = 2 WHERE status_id = 1;
   INSERT INTO task (title,description,user_id,status_id)
   VALUES('Placeholder entry','This should not exist',2,999)
ROLLBACK;


--Part D: Putting It All Together

--Transaction: create "Urgent" + assign tasks
BEGIN TRANSACTION;
INSERT OR ROLLBACK INTO category (name) VALUES ('Urgent');
INSERT INTO task_category (task_id, category_id)
  SELECT id, (SELECT id FROM category WHERE name = 'Urgent')
  FROM task
  WHERE user_id = 1;
COMMIT; 

--Dashboard summary containing:
SELECT
    -- 1. Total number of tasks
    COUNT(t.id) AS total_tasks,

    -- 2. Number of completed tasks
    COUNT(CASE WHEN t.status_id = 3 THEN 1 END) AS completed_tasks,

    -- 3. Number of overdue tasks
    COUNT(CASE WHEN t.due_date < DATE('now') AND t.status_id != 3 THEN 1 END) AS overdue_tasks,

    -- 4. Number of users with at least one task
    COUNT(DISTINCT t.user_id) AS active_users
FROM task t
JOIN status s ON s.id = t.status_id;

