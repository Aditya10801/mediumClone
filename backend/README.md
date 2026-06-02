# Backend Service

This backend powers the MediumClone app using Cloudflare Workers, Hono, PostgreSQL, Prisma, and JWT authentication.

## Stack

- Runtime: Cloudflare Workers via `wrangler`
- Web framework: `hono`
- Database: PostgreSQL
- ORM: `Prisma` with `@prisma/adapter-pg`
- Auth: JWT tokens via `hono/jwt`
- Testing: `vitest`
- Environment management: `dotenv`

## Architecture

- `src/index.ts`
  - Creates the Hono application
  - Registers route groups:
    - `/api/v1/user` for sign-up / sign-in
    - `/api/v1/blog` for blog CRUD operations
  - Protects blog endpoints with JWT-based authorization
  - Exposes a reusable Prisma client factory via `getPrisma`

- `src/routes/user.ts`
  - Handles user creation and authentication
  - Returns a JWT on successful sign-up or sign-in

- `src/routes/blog.ts`
  - Handles blog listing, post fetching, creation, and updates
  - Requires valid JWT on every request

- `prisma/schema.prisma`
  - Defines the `User` and `Post` models
  - Uses UUIDs for primary keys
  - Stores `email`, `name`, and `password` for users
  - Stores blog `title`, `content`, `published` status, and author references

## Environment Variables

The backend requires the following secrets:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - secret key used to sign and verify JWT tokens

For Cloudflare Workers, configure both values in your `wrangler` environment or dashboard bindings.

## Local Development

Install dependencies in the backend folder:

```bash
cd backend
npm install
```

Run the local worker dev server:

```bash
npm run dev
```

This uses `wrangler dev` to start the service locally.

## Deployment

Deploy the backend to Cloudflare Workers with:

```bash
npm run deploy
```

## Prisma / Database

The backend uses Prisma with a PostgreSQL adapter.

To inspect or apply migrations, use Prisma CLI from the `backend` folder:

```bash
npx prisma migrate deploy
npx prisma db push
```

The schema models are:

- `User`
  - `id: String` (UUID)
  - `email: String` (unique)
  - `name: String?`
  - `password: String`
  - `posts: Post[]`

- `Post`
  - `id: String` (UUID)
  - `title: String`
  - `content: String`
  - `published: Boolean`
  - `authorId: String`
  - `author: User`

## API Reference

### User Routes

#### `POST /api/v1/user/signup`

Create a new user and receive a JWT.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}
```

Response (201 Created):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Status codes:
- `201 Created` - User created successfully
- `400 Bad Request` - Validation error
- `409 Conflict` - User already exists

#### `POST /api/v1/user/signin`

Authenticate an existing user and receive a JWT.

Request body:

```json
{
  "email": "jane@example.com",
  "password": "securepassword"
}
```

Response (200 OK):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Status codes:
- `200 OK` - Authentication successful
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Invalid credentials

### Blog Routes

> All `/api/v1/blog/*` endpoints require an `Authorization` header with a valid JWT.
>
> Example:
>
> ```
> Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
> ```

#### `GET /api/v1/blog`

Fetch all published blog posts.

Response (200 OK):

```json
[
  {
    "id": "uuid",
    "title": "Post Title",
    "content": "Post content...",
    "published": true,
    "authorId": "user-uuid",
    "author": {
      "id": "user-uuid",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
]
```

#### `GET /api/v1/blog/my-posts`

Fetch all posts created by the authenticated user (both published and draft).

Response (200 OK):

```json
[
  {
    "id": "uuid",
    "title": "My Draft Post",
    "content": "...",
    "published": false,
    "authorId": "user-uuid",
    "author": { ... }
  }
]
```

#### `GET /api/v1/blog/:id`

Fetch a single blog post by ID.

Response (200 OK):

```json
{
  "id": "uuid",
  "title": "Post Title",
  "content": "...",
  "published": true,
  "authorId": "user-uuid",
  "author": { ... }
}
```

Status codes:
- `200 OK` - Post found
- `404 Not Found` - Post doesn't exist
- `403 Forbidden` - Post is draft from another user

#### `POST /api/v1/blog`

Create a new blog post for the authenticated user.

Request body:

```json
{
  "title": "My first post",
  "content": "This is the blog content."
}
```

Response (201 Created):

```json
{
  "id": "uuid",
  "title": "My first post",
  "content": "This is the blog content.",
  "published": false,
  "authorId": "user-uuid",
  "author": {
    "id": "user-uuid",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

Status codes:
- `201 Created` - Post created successfully
- `400 Bad Request` - Validation error

#### `PUT /api/v1/blog/:id`

Update an existing blog post (author only).

Request body (all fields optional):

```json
{
  "title": "Updated title",
  "content": "Updated content...",
  "published": true
}
```

Response (200 OK):

```json
{
  "id": "uuid",
  "title": "Updated title",
  "content": "Updated content...",
  "published": true,
  "authorId": "user-uuid",
  "author": { ... }
}
```

Status codes:
- `200 OK` - Post updated successfully
- `400 Bad Request` - Validation error
- `403 Forbidden` - Not the post author
- `404 Not Found` - Post doesn't exist

#### `DELETE /api/v1/blog/:id`

Delete a blog post (author only).

Response (200 OK):

```json
{
  "message": "Post deleted successfully"
}
```

Status codes:
- `200 OK` - Post deleted successfully
- `403 Forbidden` - Not the post author
- `404 Not Found` - Post doesn't exist

## Notes

- JWT tokens are generated with `hono/jwt` and signed using `HS256`.
- The backend currently stores passwords in plain text, so add hashing before production.
- The blog router performs JWT validation in its own middleware and also through the top-level `/api/v1/blog/*` `app.use` middleware.

## Testing

Run unit tests with:

```bash
npm test
```

If you add tests, they should live under `backend/test/` and use `vitest`.

## Useful Scripts

- `npm run dev` - start local development worker
- `npm run deploy` - deploy to Cloudflare
- `npm run start` - alias for local dev
- `npm run cf-typegen` - generate Cloudflare type bindings
- `npm test` - run test suite
