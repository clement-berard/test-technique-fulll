# Fulll - Vehicle fleet parking management

[Link](https://github.com/fulll/hiring/blob/master/Backend/ddd-and-cqrs-intermediare-senior.md)

## Install

```shell
#using pnpm and node > 20
pnpm install

#but you can using npm as well
```

## CLI

```shell
pnpm tsx cli.ts create user123
pnpm tsx cli.ts register-vehicle ef862691-d015-4bfc-9811-18ab580440c1 ABC-123
pnpm tsx cli.ts localize-vehicle ef862691-d015-4bfc-9811-18ab580440c1 ABC-123 48.8566 2.3523
```

## Tests

```shell
pnpm test:bdd
```

## Reflections
- **Package Manager**: Using pnpm (my preference).
- **Code Structure**: Considering the use of classes (why not).
- **Type Safety**: Fully typed with TypeScript.
- **Testing Framework**: Currently using cucumberjs for BDD tests. If starting over, I would consider vitest-cucumber with Vitest.
- **Database**: Using better-sqlite3 for database connection (database.sqlite).
- **ORM/Query Builder**: Did not use an ORM or query builder for this exercise, but it would be relevant (e.g., Knex or similar).
- **Validation**: Adding a validator like Zod would be beneficial for Models/ValueObjects.
- **Service Files**: Adding service files for aggregates would improve readability.
- **CLI**: Using commander for the CLI.
- **Script Execution**: Using `tsx` to run scripts without building (even for tests).
- **Linting**: Using biome as the linter.

## CI/CD

- you can find an example [here](../.github/workflows/test.yml)
