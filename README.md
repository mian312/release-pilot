# ReleasePilot 🚀

ReleasePilot is a simple and effective tool designed to manage and track software releases. It helps developers keep their release process organized by providing a clear checklist and dynamic status tracking for every version they ship.

### Features
* **Create releases**: Quickly add new release versions to your pipeline.
* **View releases**: See all your planned and completed releases in one clean table.
* **Track checklist steps**: Every release comes with a set of predefined steps to ensure nothing is missed.
* **Automatic status**: The app automatically calculates if a release is **planned**, **ongoing**, or **done** based on your progress.
* **Update additional info**: Add notes or extra context to any release whenever you need.

### Tech Stack
* **Frontend**: React (Vite) + Tailwind CSS
* **Backend**: Node.js + Express
* **Database**: PostgreSQL with Prisma ORM

### Project Structure
* `client`: The React frontend where you manage your releases.
* `server`: The Express backend handling data and database communication.

### Setup Instructions

#### Backend
1. Go to the `server` folder.
2. Run `npm install` to get the dependencies.
3. Create a `.env` file and add your `DATABASE_URL`.
4. Run `npx prisma migrate dev` to set up your database.
5. Start the server with `npm run dev` (or `node src/index.js`).

#### Frontend
1. Go to the `client` folder.
2. Run `npm install`.
3. Start the dev server with `npm run dev`.

### API Endpoints
* `GET /api/releases`: Fetch all releases.
* `POST /api/releases`: Create a new release.
* `PATCH /api/releases/:id`: Update additional info for a release.
* `PATCH /api/releases/:id/steps`: Update the status of checklist steps.

### Database Design
The project uses a simple **Release** model. Instead of complex relational tables for steps, they are stored as a **Json array** directly inside the release record. This keeps things fast and easy to manage. The release status isn't stored in the DB—it's calculated on the fly:
* No steps completed? **Planned**.
* Some steps completed? **Ongoing**.
* All steps completed? **Done**.

### Deployment
* **Frontend**: Optimized for hosting on **Vercel**.
* **Backend + DB**: Can be easily deployed on **Render**.
