import express from "express";
import knex from "knex";

const app = express();
const port = 3000;
app.use(express.json());

// This connects to the database stored in the file mentioned below

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename:
      "/Users/shipra/Documents/HYF_Clean/hyf-assignments/courses/foundation/intro-to-backend/database.sqlite3",
  },
  useNullAsDefault: true, // Omit warning in console
});

async function getUsersCount() {
  const result = await knexInstance("users").count("id as total_users");
  return result[0].total_users;
}

function renderUsersCountPage(count) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>User Dashboard</title>
      <style>
      * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        box-sizing: border-box;
      }
      .container {
        width: 100%;
        min-height: 100vh;
        background: linear-gradient(135deg, #cf9aff, #95c0ff);
        padding: 10px;
      }
      .dashboard {
        width: 100%;
        max-width: 540px;
         background: #fff;
        margin: 100px auto 20px;
        padding: 40px 30px 70px;
        border-radius: 10px;
      }
      .dashboard h1 {
        color: #002765;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      .dashboard p {
        font-size: 18px;
        font-weight: 600;
        margin-top: 10px
      }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="dashboard">
          <h1>Hello! Welcome to My User Dashboard</h1>
          <p>We currently have <strong>${count}</strong> users registered!</p>
          <p>Feel free to explore the API endpoints to see more details.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

app.get("/", async (req, res) => {
  const count = await getUsersCount();
  const page = renderUsersCountPage(count);
  res.send(page);
});

// Here is an example of the first route, /all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC;");
  res.json(rows);
});

// TODO implement more routes here

//gmail-users should respond with users with an @gmail.com email

async function getGmailUsers() {
  return knexInstance.raw(
    "SELECT * FROM users WHERE email LIKE '%@gmail.com%';"
  );
}

app.get("/gmail-users", async (req, res) => {
  const rows = await getGmailUsers();
  res.json(rows);
});

//unconfirmed-users should respond with unconfirmed users

async function getUnconfirmedUsers() {
  return knexInstance.raw("SELECT * FROM users WHERE confirmed_at is NULL;");
}

app.get("/unconfirmed-users", async (req, res) => {
  const rows = await getUnconfirmedUsers();
  res.json(rows);
});

//2022-users should respond with users created in 2022

async function get2022Users() {
  return knexInstance.raw(
    "SELECT * FROM users WHERE created_at LIKE '%2022%';"
  );
}

app.get("/2022-users", async (req, res) => {
  const rows = await get2022Users();
  res.json(rows);
});

//user-count should respond with the number of users

async function getUserCount() {
  return knexInstance.raw("SELECT COUNT(*) as userCount FROM users;");
}

app.get("/user-count", async (req, res) => {
  const rows = await getUserCount();
  res.json(rows);
});

//last-name-count should respond with how many users there are with a given last name, sorted alphabetically

async function getLastNameCount() {
  return knexInstance.raw(
    "SELECT last_name, COUNT(last_name) AS lastNameCount FROM users GROUP BY last_name ORDER BY last_name ASC"
  );
}

app.get("/last-name-count", async (req, res) => {
  const rows = await getLastNameCount();
  res.json(rows);
});

//first-user should respond with the first user. If there are no users in the table, respond with a 404

async function getFirstUser() {
  const rows = await knexInstance.raw(
    "SELECT * FROM users ORDER BY id ASC LIMIT 1;"
  );
}
app.get("/first-user", async (req, res) => {
  const rows = await getFirstUser();

  if (rows.length === 0) {
    res.status(404).json({ error: "User not found" });
  } else {
    res.json(rows);
  }
});

//create a new user

async function createUser({ first_name, last_name, email }) {
  const [id] = await knexInstance("users").insert({
    first_name,
    last_name,
    email,
  });

  return id;
}

app.post("/users", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email.length === 0)
    return response.sendStatus(400);

  const [id] = await createUser({ first_name, last_name, email });
  res.status(201).json({
    id,
    first_name,
    last_name,
    email,
  });
});

//partial update

async function updateUserFirstName(id, first_name) {
  return knexInstance("users").where({ id }).update({ first_name });
}

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name } = req.body;

  const updatedUser = updateUserFirstName(id, first_name);

  res.json(updatedUser);
});

//Delete user

async function deleteUserById(id) {
  return knexInstance("users").where({ id }).del();
}

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const deletedUser = await deleteUserById(id);

  res.status(200).json({
    message: "User deleted",
    id: Number(id),
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
