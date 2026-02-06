run with `pnpm start`

- runs at via GHA `schedule` event @ 08:32am, daily. PDT will run 1 hour earlier.
- awkward runtime is to avoid heavy load times on GHA

## TODO
- [ ] convert to typescript, build with `esbuild` into `index.cjs`
  - [ ] update action to build before run
- [ ] add contract tests, maybe unit tests
- [x] Re-enable Advanced Security once script is stable
- [ ] Properly setup channel restrictions but grant the bot role access
