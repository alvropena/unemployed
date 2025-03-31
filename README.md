# Unemployed

A professional resume builder application for software engineers.

## Local Database Setup

### Prerequisites
- PostgreSQL installed on your machine
- Node.js and npm/yarn installed
- Prisma CLI (`npm install -g prisma`)

### Steps

1. **Create a Local Database**
   ```bash
   # Connect to PostgreSQL
   psql postgres
   
   # Create a new database
   CREATE DATABASE unemployed_db;
   
   # Exit psql
   \q
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in your project root:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/unemployed_db"
   ```

3. **Install Project Dependencies**
   ```bash
   npm install @prisma/client prisma
   # or using yarn
   yarn add @prisma/client prisma
   ```

4. **Initialize and Apply Database Schema**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations to create tables
   npx prisma migrate dev --name init
   ```

5. **Verify Setup**
   ```bash
   # Open Prisma Studio to view/edit data
   npx prisma studio
   ```
### Database Schema

The application uses the following main models:
- Resume (stores personal information and links to other models)
- Education (educational background)
- Experience (work experience)
- Project (personal or professional projects)
- Skill (technical skills with categories)
- Subscription (user subscription status)

For detailed schema information, see `prisma/schema.prisma`.

