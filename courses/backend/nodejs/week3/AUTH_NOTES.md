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
