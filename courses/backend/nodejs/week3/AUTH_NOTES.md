# Auth Notes - Week 3

- **Mechanism:** JWT (JSON Web Tokens): Used for standard user identification on GET and POST routes.
  Database Tokens: Used for DELETE. Tokens are stored in the tokens table.
- **Library:** `jsonwebtoken` for signing/verifying, `bcrypt` for hashing.
- **Middleware:** `authenticateJWT` protects all snippet routes except `GET /public`.
- **Environment:** Secrets are stored in `.env` (not tracked by git).
- **HowtoLogin:** Send POST to /api/users/login with email/password. Returns a JWT.
- **HowtoUse:** Send JWT in Authorization: Bearer <token> header.
- **Permissions:** Regular users: Read public snippets, Create snippets.
  Admin users: Can delete snippets.
- **Invalidation:** JWTs expire after 1 hour. To invalidate manually, client must delete the token.

# 1. Which auth mechanism would you choose for:

- **A SPA web app with many users:** JSON web token works well for large apps because the server does not need to store user sessions. This helps the systems handle many users and scale better.

- **A microservice-to-microservice communication scenario?** Api Keys method is good for service to service communication, where programs talks to each other instead of users logging in.

- **An internal admin tool used by a small team?** Session based authentication works well for small teams because the server controls the session, so access can be revoked immediately if needed.

# 2. Why would you NOT use the other mechanisms?

- **Avoid Sessions for SPAs:** Managing cookies and session storage across multiple servers or domains can become a technical nightmare as the app grows.

- **Avoid JWTs for Internal Tools:** It is very difficult to "force logout" a JWT before it expires, which is a risk you don't want for powerful admin accounts.

- **Avoid User Logins for Microservices:** Machines shouldn't manage passwords; using API keys or certificates is much faster and more secure for automated traffic.
