# CI workflow (manual install required)

The GitHub App used to bootstrap this repo doesn't have the `workflows: write` scope, so it couldn't push `.github/workflows/ci.yml` directly. Copy the YAML below into `.github/workflows/ci.yml` manually (one click in the GitHub UI), then delete this file.

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build:
    name: lint • build
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run format:check
      - run: npm run typecheck
      - run: npm run build
```
