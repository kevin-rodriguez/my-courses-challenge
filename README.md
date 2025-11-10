# Course Catalog

A responsive course catalog app with favorites management and infinite scroll.

## Preview

[Video Preview](https://github.com/user-attachments/assets/218ca724-e7b7-454c-a2de-91021ef47c0b)

## Features

- Browse courses in a grid layout
- Click to favorite/unfavorite courses
- Infinite scroll pagination
- Filter between all courses and favorites
- Fully responsive

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Axios
- Sonner (toasts)

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=your_api_url
NEXT_PUBLIC_API_VERSION=jsonapi/v1
NEXT_PUBLIC_API_AUTH_EMAIL=your_email
```

3. Run dev server:

```bash
pnpm dev
```

4. Open [http://localhost:3000/courses](http://localhost:3000/courses)

## Build

```bash
pnpm build
pnpm start
```
