# sdley-e-shop

sdley-e-shop is an online electronic e-shop.

## Technologies used
- **Next.js 15**: React framework for server-side rendering and static site generation.
- **TypeScript**: Enhances JavaScript with static typing for better code reliability.
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive UI design.
- **MongoDB**: NoSQL database for scalable and flexible data storage.
- **Stripe**: Secure payment processing integration.
- **Prisma**: ORM for efficient database management and queries.
- **moment.js**: Library for date formatting and manipulation.
- **React Hot Toast**: Lightweight notifications for better user feedback.
- **v6.exchangerate-api.com**: API for real-time currency exchange rates.

🚀 **Goal**: Performance, scalability, and a seamless user experience.

---

## 🚀 Steps to Configure and Run the Application

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo.git
cd your-repo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables  
Create a `.env.local` file at the root of the project and configure the following variables:

```env
# MongoDB Atlas
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<your-secret-key>"

# Google OAuth 2.0
GOOGLE_CLIENT_ID="<your-google-client-id>"
GOOGLE_CLIENT_SECRET="<your-google-client-secret>"

# Stripe API Keys
STRIPE_PUBLIC_KEY="<your-stripe-public-key>"
STRIPE_SECRET_KEY="<your-stripe-secret-key>"
```

### 4. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create an account.
2. Create a new cluster and database.
3. Navigate to **Database Access** and create a user with read and write permissions.
4. Under **Network Access**, allow your IP address (`0.0.0.0/0` for testing).
5. Copy the connection string and update `DATABASE_URL` in `.env.local`.

### 5. Setup Google OAuth 2.0

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth Client ID**.
5. Configure the OAuth consent screen:
   - Add your app name and authorized domains.
   - Set **Application Type** to "Web application."
   - Add **Authorized redirect URIs**:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
6. Copy the **Client ID** and **Client Secret** and update them in `.env.local`.

### 6. Initialize Prisma and Database
```bash
npx prisma generate
npx prisma db push
```

### 7. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

🚀 **Your application is now ready to use!**

---
## Copyright
- Copyright [sdley](https://sdley.github.io/) 2024
- https://sdley.github.io/