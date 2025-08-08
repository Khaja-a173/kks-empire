
# Restaurant QR Ordering — Fullstack Next.js Project (End-to-End)

[![CI](https://github.com/Khaja-a173/KKsEmpire/actions/workflows/ci.yml/badge.svg)](https://github.com/Khaja-a173/KKsEmpire/actions/workflows/ci.yml)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Khaja-a173/KKsEmpire)

# Restaurant QR Ordering — Fullstack Next.js Project (End‑to‑End)

A production‑grade, QR‑driven dine‑in ordering app. This repository is generated from your canvas.
It includes landing → QR session → booking → menu → checkout → realtime → admin/manager → notifications → merge bill.

## Quick Start

```bash
pnpm create next-app restaurant-qr --ts --eslint --tailwind --app --src-dir --no-import-alias
# OR just use this repo directly:
pnpm i
pnpm prisma migrate dev --name init
pnpm prisma db seed
pnpm dev
```

See `prisma/schema.prisma`, `src/app/*`, and `src/lib/*` for implementation details.
