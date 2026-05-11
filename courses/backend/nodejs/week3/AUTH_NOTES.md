# Auth Notes - Week 3

- **Mechanism:** JWT (JSON Web Tokens).
- **Library:** `jsonwebtoken` for signing/verifying, `bcrypt` for hashing.
- **Middleware:** `authenticateJWT` protects all snippet routes except `GET /public`.
- **Environment:** Secrets are stored in `.env` (not tracked by git).
