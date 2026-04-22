# Kelas Pekerja Backend

Spring Boot backend API for Kelas Pekerja website.

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.5**
- **Spring Data JPA** - Database operations
- **Spring Security** - Authentication & Authorization
- **PostgreSQL** - Database (Supabase)
- **OAuth2** - Google Authentication
- **Lombok** - Reduce boilerplate
- **Maven** - Build tool
- **Docker** - Containerization

## Features

- REST API for Books, Quotes, Stories
- Book view tracking
- Newsletter subscription
- Google OAuth authentication
- CORS configuration for Next.js frontend
- Docker support for deployment

## API Endpoints

### Books
- `GET /api/books` - Get all books (supports filtering by category, search, featured)
- `GET /api/books/{slug}` - Get book by slug

### Quotes
- `GET /api/quotes` - Get approved quotes (supports category filter)
- `POST /api/quotes` - Submit new quote (requires admin approval)

### Stories
- `GET /api/stories` - Get published stories (supports category filter)
- `GET /api/stories/{slug}` - Get story by slug
- `POST /api/stories` - Submit new story (requires admin approval)

### Book Views
- `GET /api/book-views/{slug}` - Get view count for a book
- `POST /api/book-views/increment` - Increment view count
- `GET /api/book-views` - Get all book view counts

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter

## Setup

### Prerequisites
- Java 17+
- Maven 3.6+
- PostgreSQL 15+ (or Supabase)

### Local Development

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Update `.env` with your actual values

3. Run the application:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api`

### Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up -d
```

2. Or build and run with Docker:
```bash
docker build -t kelas-pekerja-backend .
docker run -p 8080:8080 --env-file .env kelas-pekerja-backend
```

## Database Schema

The application uses the following tables:
- `books` - Book information
- `quotes` - User-submitted quotes
- `stories` - User-submitted stories
- `book_views` - Book view tracking

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection URL
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `JWT_SECRET` - JWT secret key
- `CORS_ALLOWED_ORIGINS` - Comma-separated list of allowed frontend origins
- `PORT` - Server port (default: 8080)

## Security

- CSRF protection disabled for API endpoints
- Public access to books, quotes, stories endpoints
- OAuth2 Google authentication configured
- CORS configured for Next.js frontend

## Deployment

The backend can be deployed to:
- Vercel (with Docker support)
- Railway
- Render
- AWS ECS
- Any platform supporting Docker containers
