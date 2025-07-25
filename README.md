# LoopImmo

LoopImmo is a React and TypeScript application that reimagines the property selling process. It focuses on community involvement, transparency and digital tools to reduce agency fees for sellers.

## Installation

```bash
npm install
```

After installing dependencies, copy `.env.example` to `.env` and
`server/.env.example` to `server/.env`. Fill in these files with your own
credentials before running the application.

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The frontend expects the API to be available on the URL specified by
`VITE_API_URL` (default `http://localhost:3000`). When working locally, start the
Express backend in another terminal:

```bash
npm run server
```
Run this command from the project root so that the `cross-env` dependency can be
resolved correctly.

Vite is configured to proxy `/api` requests to this server during development.
The proxy target is read from the `VITE_API_URL` variable.
After building, start the proxy server with:

```bash
npm start
```

The `server.js` script now serves the static files from `dist` and proxies
`/api` requests to the backend specified by the `BACKEND_URL` environment
variable. It listens on IPv6 to support Railway's private networking.

Build for production:

```bash
npm run build
```

Lint the project:

```bash
npm run lint
```

### Mock data service

The project uses a small data service located in `src/services/dataService.ts` to
provide application data. When the `VITE_USE_MOCKS` environment variable is set
to `true` (the default), the service returns arrays from the mock files under
`src/data` and `src/mocks`. Set `VITE_USE_MOCKS=false` to disable these mocks –
the functions will then throw errors until real API calls are implemented.
This design makes it easy to replace the mock logic with actual HTTP requests in
the future.


## License

This project is licensed under the [MIT License](LICENSE).

## Database Setup

SQL scripts to create a PostgreSQL schema and populate it with sample data are provided in the `sql` folder.

1. Create an empty PostgreSQL database (version 17 or above).
2. Execute `schema.sql` to create the tables

```bash
psql "$DATABASE_URL" -f sql/schema.sql
```

3. Load the demo data:

```bash
psql "$DATABASE_URL" -f sql/sample_data.sql
```

Replace `$DATABASE_URL` with your connection string. The scripts can be executed against any PostgreSQL instance, including cloud providers.

## Backend server

A minimal Express server located in the `server` directory exposes REST endpoints backed by PostgreSQL. Ensure you have loaded the schema and sample data, then add your database connection string to `server/.env`:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/loopimmo
```

Start the server with:

```bash
npm run server
```

The script runs `ts-node` and uses the
`server/tsconfig.json` project via the `TS_NODE_PROJECT` environment variable,
set using [`cross-env`](https://www.npmjs.com/package/cross-env), so ensure you
are running Node.js 18 or later.

The API listens on port `3000` by default and currently exposes `/api/users` and `/api/properties` routes.

If your `DATABASE_URL` uses `sslmode=require` with a self-signed certificate,
set `PG_REJECT_UNAUTHORIZED=false` in `server/.env` during development to skip
certificate verification so `pg` can connect without errors.

### Email configuration

The SMTP credentials used to send confirmation emails are stored in `server/.env` on
the backend server. Edit that file (or `server/.env.example`) to match your environment.
If these variables are missing, the newsletter endpoint simply logs a warning and
does not attempt to send email, which avoids a 500 error during local testing.
If you set the variables to dummy values without a real SMTP server (for example
`SMTP_HOST=localhost`), nodemailer will try to connect and the server may output an
`ECONNREFUSED 127.0.0.1:587` error. Either configure valid credentials or remove the
SMTP entries from `.env` so emails are skipped during development.

This port `587` belongs to your email server, not the API. Even if `VITE_API_URL` points
to `http://localhost:3000`, you still need a mail service listening on
`localhost:587`. Without one, simply omit the `SMTP_*` variables so that email
sending is skipped entirely.
