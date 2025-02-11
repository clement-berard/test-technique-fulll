# Fulll - Vehicle fleet parking management

https://github.com/fulll/hiring/blob/master/Backend/ddd-and-cqrs-intermediare-senior.md

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

## Reflexions

- utilisation de classes (pourquoi pas)
- entierement typé
- utilisation de cucumberjs pour les tests BDD. Mais a refaire je serai parti sur https://vitest-cucumber.miceli.click/ avec Vitest

## Step 3

**For code quality, you can use some tools : which one and why (in a few words) ?**

- utilisaton de `better-sqlite3` pour la connection à la DB
- pour cet exercice je n'ai pas utiliser d'ORM ou Query Builder, mais l'utilisation serait pertinente (knex ou autre)
- Ajouter un validateur comme Zod serait bien, pour les Model/ValueObject
- ajouter des fichiers de services pour les agregats par exemple pour etre plus lisible
- utilisation de commander pour la CLI
- utilisation de tsx pour lancer les scripts : pas de build dans cette version (meme pour les tests)
- linter biome

**You can consider to setup a ci/cd process : describe the necessary actions in a few words**

- you can find an example [here](../.github/workflows/test.yml)
