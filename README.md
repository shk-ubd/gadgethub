# GadgetHub Ecommerce App

GadgetHub is a ReactJS-based ecommerce application that utilizes Sanity.io as a headless CMS and integrates with the Stripe payment gateway for transactions.

## Local Setup Instructions

To run GadgetHub locally, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/shk-ubd/gadgethub
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run frontend (ReactJS):**
   ```
   npm run dev
   ```
   This command will start the frontend of the application.

4. **Start the server:**
   ```
   #In another terminal
   cd server
   node server
   ```
   Navigate to the `server` directory and start the server using `node server`.

5. **Run Sanity Studio (headless CMS):**
   ```
   #In another terminal
   cd sanity-ecommerce
   npm run dev
   ```
   Navigate to the `sanity-ecommerce` directory and run `npm run dev` to start Sanity Studio.

6. **Setup environment variables:**

   Ensure you create two `.env` files with the following configurations:

   - **In the root directory:** Create a `.env` file with the following variables:
     ```
     VITE_PUBLIC_SANITY_TOKEN=<your_sanity_token>
     VITE_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
     ```

   - **In the `server` directory:** Create a `.env` file with the following variable:
     ```
     STRIPE_SECRET_KEY=<your_stripe_secret_key>
     ```

## Technologies Used

- **Frontend Library:** React JS
- **Headless CMS:** Sanity.io
- **Payment Gateway:** Stripe

## Folder Structure

- **`/server`:** Backend server directory.
- **`/sanity-ecommerce`:** Sanity Studio setup and configurations.
- **`/`:** Frontend ReactJS source code.

## Contributing

Contributions to GadgetHub are welcome! If you find any issues or want to enhance the application, please feel free to create issues and pull requests.