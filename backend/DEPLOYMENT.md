# Backend Deployment Guide

## Local Development

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- H2 Database (included)

### Running Locally
```bash
cd backend
mvn spring-boot:run
```

The backend will run on `http://localhost:8080/api` with H2 in-memory database.

## Production Deployment

### Option 1: Docker Deployment

#### Build Docker Image
```bash
cd backend
docker build -t kelas-pekerja-backend .
```

#### Run with Docker Compose
```bash
cd backend
cp .env.example .env
# Edit .env with your production values
docker-compose up -d
```

#### Environment Variables
Required environment variables for production:
- `DATABASE_URL` - PostgreSQL/Supabase connection string
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRATION` - JWT expiration time in milliseconds
- `CORS_ALLOWED_ORIGINS` - Allowed CORS origins
- `SPRING_PROFILES_ACTIVE` - Set to `production`

### Option 2: Railway Deployment

1. Create new project on Railway
2. Connect GitHub repository
3. Add environment variables from `.env.example`
4. Deploy

### Option 3: Render Deployment

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `mvn clean package`
4. Set start command: `java -jar target/kelas-pekerja-backend-1.0.0.jar`
5. Add environment variables from `.env.example`
6. Deploy

### Option 4: AWS EC2

1. Launch EC2 instance
2. Install Java and Maven
3. Clone repository
4. Build with Maven: `mvn clean package`
5. Run: `java -jar target/kelas-pekerja-backend-1.0.0.jar`
6. Set up reverse proxy with Nginx
7. Configure SSL with Let's Encrypt

## Database Setup

### Supabase (Recommended)
1. Create Supabase project
2. Get connection string from Project Settings
3. Set environment variables:
   ```
   DATABASE_URL=jdbc:postgresql://[project-ref].supabase.co:5432/postgres?sslmode=require
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_password
   ```

### PostgreSQL
1. Install PostgreSQL
2. Create database: `createdb kelas_pekerja`
3. Set environment variables with your connection details

## Frontend Configuration

Update Next.js environment variable:
```
NEXT_PUBLIC_JAVA_API_URL=https://your-backend-domain.com/api
```

## Health Check

Backend provides health check endpoint:
```
GET /api/actuator/health
```

## Monitoring

Enable Spring Boot Actuator for monitoring:
```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
```

## Troubleshooting

### Connection Timeout to Supabase
- Ensure SSL is enabled in connection string (`sslmode=require`)
- Check firewall settings
- Verify Supabase project is active
- Test connection from deployment environment

### Database Migration Issues
- Set `spring.jpa.hibernate.ddl-auto=update` for auto-migration
- Or use Flyway for version-controlled migrations

### CORS Issues
- Add your frontend domain to `CORS_ALLOWED_ORIGINS`
- Ensure frontend URL is included in allowed origins
