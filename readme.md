# Tan Stack Bed Allocation

## Overview
The Tan Stack Bed Allocation project is a comprehensive system designed to manage hospital bed allocation efficiently. It provides functionalities for admitting patients, managing doctors, and tracking room availability. The system is built with a modern tech stack, including a backend powered by Node.js and Express, and a frontend developed using React and Vite. Tailwind CSS is used for styling, ensuring a responsive and visually appealing user interface.

## Project Structure

### Backend
The backend is responsible for handling the core logic and database interactions. It includes the following key components:
- **Controllers**: Handle the business logic for beds, doctors, and patients.
- **Models**: Define the database schema for doctors, patients, and rooms.
- **Routes**: Define API endpoints for interacting with the system.
- **Middlewares**: Include utilities like file upload handling (e.g., Multer).
- **Config**: Configuration files, such as Cloudinary for image uploads.

### Frontend
The frontend provides a user-friendly interface for interacting with the system. It includes:
- **Pages**: Different views like Dashboard, Admit Patient, and Patient Lists.
- **Components**: Reusable UI components like Navbar and Horizontal Cards.
- **Hooks**: Custom hooks for API interactions.
- **API**: Centralized API handling for the frontend.

### Doc_Raw
This folder contains raw document images used in the system.

## Workflow

1. **Doctor Management**:
   - Doctors can be added and managed through the backend API.
   - The `Doctor.js` model defines the schema for doctor data.

2. **Patient Admission**:
   - Patients are admitted using the `AdmitPatient.jsx` page on the frontend.
   - The backend processes the admission request and allocates a bed if available.

3. **Bed Allocation**:
   - The `bedController.js` handles the logic for assigning beds to patients.
   - Room availability is tracked using the `Room.js` model.

4. **Patient Tracking**:
   - Admitted patients can be viewed on the `AdmittedPatientList.jsx` page.
   - Discharged patients are listed on the `DischargedPatients.jsx` page.

5. **Document Management**:
   - Documents are uploaded and managed using the `docController.js` and `multer.js` middleware.
   - Raw document images are stored in the `Doc_Raw` folder.

6. **Dashboard**:
   - The `Dashboard.jsx` page provides an overview of the system, including statistics on patients and bed availability.

## Tech Stack
- **Backend**: Node.js, Express
- **Frontend**: React, Vite, Tailwind CSS
- **Database**: MongoDB (assumed based on models)
- **Other Tools**: Cloudinary for image uploads, Multer for file handling

## How to Run

### Backend
1. Navigate to the `backend` folder.
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Frontend
1. Navigate to the `frontend` folder.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Future Enhancements
- Add authentication and authorization.
- Implement advanced analytics and reporting.
- Enhance the UI/UX for better usability.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.