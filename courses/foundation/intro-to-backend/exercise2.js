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

app.get("/", async (req, res) => {
  //Update the / route to return a HTML page that fetches the count value
  const result = await knexInstance("users").count("id as total_users");
  const count = result[0].total_users;

  res.send(`
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
  `);
});

// Here is an example of the first route, /all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC;");
  res.json(rows);
});

// TODO implement more routes here

//gmail-users should respond with users with an @gmail.com email
app.get("/gmail-users", async (req, res) => {
  const rows = await knexInstance.raw(
    "SELECT * FROM users WHERE email LIKE '%@gmail.com%';"
  );
  res.json(rows);
});

//unconfirmed-users should respond with unconfirmed users
app.get("/unconfirmed-users", async (req, res) => {
  const rows = await knexInstance.raw(
    "SELECT * FROM users WHERE confirmed_at is NULL;"
  );
  res.json(rows);
});

//2022-users should respond with users created in 2022
app.get("/2022-users", async (req, res) => {
  const rows = await knexInstance.raw(
    "SELECT * FROM users WHERE created_at LIKE '%2022%';"
  );
  res.json(rows);
});

//user-count should respond with the number of users
app.get("/user-count", async (req, res) => {
  const rows = await knexInstance.raw(
    "SELECT COUNT(*) as userCount FROM users;"
  );
  res.json(rows);
});

//last-name-count should respond with how many users there are with a given last name, sorted alphabetically
app.get("/last-name-count", async (req, res) => {
  const rows = await knexInstance.raw(
    "SELECT last_name, COUNT(last_name) AS lastNameCount FROM users GROUP BY last_name ORDER BY last_name ASC"
  );
  res.json(rows);
});

//first-user should respond with the first user. If there are no users in the table, respond with a 404
app.get("/first-user", async (req, res) => {
  let rows = await knexInstance.raw(
    "SELECT * FROM users ORDER BY id ASC LIMIT 1;"
  );

  if (rows.length === 0) {
    res.status(404).json({ error: "User not found" });
  } else {
    res.json(rows);
  }
});

//create a new user
app.post("/users", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email.length === 0)
    return response.sendStatus(400);

  const [id] = await knexInstance("users").insert({
    first_name,
    last_name,
    email,
  });

  res.status(200).json({
    id,
    first_name,
    last_name,
    email,
  });
});

//partial update
app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name } = req.body;

  const updatedUser = await knexInstance("users")
    .where({ id })
    .update({ first_name });

  res.json(updatedUser);
});

//Delete user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const deletedUser = await knexInstance("users").where({ id }).del();

  res.status(200).json({
    message: "User deleted",
    id: Number(id),
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
