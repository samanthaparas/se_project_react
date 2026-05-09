# WTWR (What to Wear?)

WTWR is a weather-based clothing app built with React. It displays the current weather for Houston, shows a weather card that updates by condition/day or night, and helps users manage clothing items for different temperature ranges.

## Functionality

- Fetches live weather data from OpenWeather and converts temperature between Fahrenheit and Celsius
- Uses a temperature unit toggle (`F` / `C`) with React Context
- Supports two routes:
- `/` for the main weather and recommended clothing view
- `/profile` for user profile, sidebar, and all saved items
- Renders clothing items from the Express backend on initial load
- Allows users to add new garments through a form modal
- Allows users to preview items and delete them with a confirmation modal

## Technologies and Techniques

- React + Vite
- React Router (`/` and `/profile` routes)
- Context API for global temperature unit state
- Custom hook: `useForm` for controlled form inputs
- Fetch API for authenticated CRUD requests to the Express backend
- OpenWeather API for current weather conditions
- CSS with BEM naming conventions
- Reusable modal architecture (`ModalWithForm`, `ItemModal`, `DeleteConfirmationModal`)

## Screenshots

![Main page weather and clothing cards](./screenshots/main-page.png)
![Add garment modal](./screenshots/add-garment-modal.png)
![Profile page](./screenshots/profile-page.png)
![Item preview modal](./screenshots/item-preview-modal.png)
![Delete confirmation modal](./screenshots/delete-confirmation-modal.png)

## Project Pitch Video

- Check out [Samantha's WTWR Project Pitch](https://drive.google.com/file/d/161glXp0hZGt71x3bxiY-7zGK9MuHS97b/view?usp=sharing), where I describe my
  project and some challenges I faced while building it.

## GitHub repositories

- [Frontend WTWR Project](https://github.com/samanthaparas/se_project_react)
- [Backend WTWR Project](https://github.com/samanthaparas/se_project_express.git)

## Running the Project Locally

Make sure MongoDB is running before starting the backend.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the backend server from the backend repository:

   ```bash
   npm run dev
   ```

   The backend should run on `http://localhost:3001`.

3. Start the frontend from this repository:

   ```bash
   npm run dev
   ```

   The frontend should run on `http://localhost:3000`.
