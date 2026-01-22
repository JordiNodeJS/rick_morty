# Package Manager Rules

ALWAYS use `pnpm` as the package manager for all Node.js projects.

## When installing packages globally:
- Use: `pnpm install -g <package>`
- NEVER use: `npm install -g <package>`, `npm i -g`, `bun install -g`, or `yarn global add`

## When installing project dependencies:
- Use: `pnpm install <package>` or `pnpm add <package>`
- NEVER use: `npm install`, `npm i`, `bun install`, or `yarn add`

## When running packages without installation:
- Use: `pnpm dlx <package>` (e.g., `pnpm dlx create-next-app`)
- NEVER use: `npx`, `bunx`, or `npx <package>`

## When running scripts:
- Use: `pnpm run <script>` or `pnpm <script>`
- NEVER use: `npm run`, `npm test`, or `yarn run`

## When installing dev dependencies:
- Use: `pnpm add -D <package>`
- NEVER use: `npm install -D` or `yarn add -D`

## Port Conflict Resolution
- If a port is already in use when running dev servers, use `pnpm dlx kill-port <port>` to terminate the process using that port
- Then retry running the dev server command
