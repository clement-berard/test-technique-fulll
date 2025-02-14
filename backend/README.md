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

## Reflections (part of Step 3)
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

## CI/CD (part of Step 3)

- you can find an example [here](../.github/workflows/test.yml)
- In this case, DB is an local sqlite DB, but in more complex archi, we need to setup a Docker or another system to mount DB in GH action

## Improvement Points

- **Create Interfaces for Domain Constructors**: Even though current constructors have few parameters, using interfaces can enhance maintainability and readability for more complex cases.
- **Use Custom Exceptions**: Replace generic Error instances with meaningful domain-specific exceptions to improve clarity and maintainability of business logic.
- **Refactor Step Definitions in Tests**: Split step definitions into separate files based on functionality and mutualize reusable steps to improve test maintainability and reduce redundancy.
- `cli.ts` at the root of project -> nope
