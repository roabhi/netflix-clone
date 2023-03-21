# NetFlix Clone

This is a [Next.js 13](https://nextjs.org/) non-experimental app using [NextAuth](https://next-auth.js.org/) for authentication (using github, google and custom email and password), [Prisma](https://www.prisma.io/) for comunicating with a simple database deployed on [Atlas](https://www.mongodb.com/atlas), using [SWR](https://swr.vercel.app/) for data fetching, [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) for state management ala React useContext and [TailwindCSS](https://tailwindcss.com/) for layout and styling.

## Set Up

If you clone teh repo you will need a few local environment variables

```env
DATABASE_URL='<Mine is on Atlas>'
NEXTAUTH_JWT_SECRET='<NEXT-JWT-SECRET>"
NEXTAUTH_SECRET="<NEXT-SECRET>"

GITHUB_ID="<https://github.com/settings/developers>" <New OAuth App>
GITHUB_SECRET='<Same as above>'

GOOGLE_CLIENT_ID='<Get it on Google Cloud>'
GOOGLE_CLIENT_SECRET='<Same as above>'

```

## Getting Started

To fire up the project just use your package manager of choice

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

By default, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
