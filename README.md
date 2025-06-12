# LoopImmo

LoopImmo is a React and TypeScript application that reimagines the property selling process. It focuses on community involvement, transparency and digital tools to reduce agency fees for sellers.

## Installation

```bash
npm install
```

## Development

Start the development server with hot reload:

```bash
npm run dev
```

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
2. Execute `schema.sql` to create the tables:

```bash
psql "$DATABASE_URL" -f sql/schema.sql
```

3. Load the demo data:

```bash
psql "$DATABASE_URL" -f sql/sample_data.sql
```

Replace `$DATABASE_URL` with your connection string. The scripts can be executed against any PostgreSQL instance, including cloud providers.
