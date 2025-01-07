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

## How It Works

### Route Optimization

1.  **Input Locations**:
    
    -   Users enter the start and destination points in the web interface.
    -   The coordinates are processed to snap to the nearest road location using the OpenStreetMap API.
2.  **Route Calculation**:
    
    -   The API calculates the best route based on the provided coordinates.
    -   Results are displayed in the UI.

### Emission Calculation

1.  **User Input**:
    
    -   Users provide details such as:
        -   Distance traveled (in KM).
        -   Fuel type (e.g., biodiesel, diesel, petrol).
        -   Fuel consumption per 100 KM.
2.  **API Call**:
    
    -   The application sends a request to the Gemini API with the input details.
3.  **Response Handling**:
    
    -   The application parses the API response to extract relevant information.
    -   Displays the emission calculation results in real-time.

----------

## Example Usage

### Input Details:

-   Distance: `120 KM`
-   Fuel Type: `Diesel`
-   Fuel Consumption: `8 L/100 KM`

### Output:

-   "Emission for your trip is approximately 20kg of CO2."

----------

## Screenshots

----------

## Known Issues

-   The application currently supports only specific fuel types listed in the dropdown menu.
-   Requires an active internet connection to fetch results from APIs.

----------

## Future Improvements

-   Add support for additional fuel types.
-   Enhance error handling for API failures.
-   Improve UI/UX with animations and better visual indicators.
-   Integrate a database to store user queries and results for future reference.

----------

## License

This project is licensed under the MIT License.
