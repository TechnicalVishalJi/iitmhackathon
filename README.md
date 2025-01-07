# Emission Calculation and Route Optimization Application

This project is a web-based application designed for calculating emissions and optimizing routes for logistics. It integrates APIs and provides an interactive user interface for users to input travel details and get emission estimates. The application was developed as part of the **IITM Hackathon**.

## Demo Link
[Live Demo](https://vishal.rf.gd/iitmhackathon/)

---

## Features

1. **Route Optimization**:
   - Allows users to input start and destination points.
   - Integrates with the OpenStreetMap API for route calculation.
   - Snaps coordinates to the nearest location for accuracy.

2. **Emission Calculation**:
   - Provides a form where users can input the distance traveled, fuel type, and fuel consumption.
   - Calls the Gemini API to calculate emissions based on the input details.
   - Displays the results in real-time in a user-friendly manner.

3. **Interactive UI**:
   - Developed using HTML, CSS, and JavaScript.
   - Responsive and intuitive design to enhance user experience.

---

## Technologies Used

### Frontend:
- **HTML**: For structuring the web pages.
- **CSS**: For styling and making the UI appealing.
- **JavaScript**: For dynamic interactions and API integration.

### APIs:
1. **OpenStreetMap API**:
   - Used for route generation and snapping coordinates to the nearest locations.

2. **Gemini API**:
   - Utilized for calculating emissions based on fuel type, distance, and fuel consumption.

---

## Installation and Setup

### Prerequisites
- A web server to host the HTML, CSS, and JavaScript files (e.g., Apache, Nginx, or a static hosting service like GitHub Pages).
- API keys for the OpenStreetMap API and Gemini API.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git
