let map = L.map("map").setView([28.7041, 77.1025], 13); // Default to Delhi

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
  map
);

async function calculateRoute(start, end) {
  start = await snapToNearest(start[1], start[0]);
  end = await snapToNearest(end[1], end[0]);

  const url = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.routes && data.routes.length > 0) {
    const route = data.routes[0];
    const coordinates = route.geometry.coordinates.map((coord) => [
      coord[1],
      coord[0],
    ]);

    // Draw the route on the map
    L.polyline(coordinates, { color: "blue" }).addTo(map);
    map.fitBounds(L.polyline(coordinates).getBounds());
  } else {
    alert("Route not found!");
  }
}

// Base URL for OSRM API
const OSRM_BASE_URL = "https://router.project-osrm.org";

// Function to snap a coordinate to the nearest road
async function snapToNearest(longitude, latitude) {
  try {
    const snapUrl = `${OSRM_BASE_URL}/nearest/v1/driving/${longitude},${latitude}`;
    const response = await fetch(snapUrl);
    if (!response.ok) {
      throw new Error(`Error in snapping: ${response.statusText}`);
    }
    const data = await response.json();

    // Extract the snapped coordinate
    const snappedCoordinate = data.waypoints[0].location; // [longitude, latitude]
    console.log("Snapped Coordinate:", snappedCoordinate);
    return snappedCoordinate;
  } catch (error) {
    console.error("Error snapping to nearest:", error);
    return null;
  }
}

function getCoordinates() {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  // Geocode using an API like Nominatim to convert addresses to coordinates
  Promise.all([
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${start}&limit=2&format=json`
    ).then((res) => res.json()),
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${end}&limit=2&format=json`
    ).then((res) => res.json()),
  ])
    .then((results) => {
      const startCoords = [results[0][0].lat, results[0][0].lon];
      const endCoords = [results[1][0].lat, results[1][0].lon];

      calculateRoute(startCoords, endCoords);
      console.log("Start:", startCoords, "End:", endCoords);
    })
    .catch((err) => {
      console.error("Error fetching coordinates:", err);
    });
}
// Function to call Gemini API for emission calculation
async function calculateEmissions() {
  const distance = document.getElementById("distance").value;
  const fuelType = document.getElementById("fuel-type").value;
  const fuelConsumption = document.getElementById("fuel-consumption").value;
  const resultDiv = document.getElementById("result");

  // Validate input
  if (!distance || !fuelType || !fuelConsumption) {
    resultDiv.style.display = "block";
    resultDiv.style.color = "red";
    resultDiv.textContent = "Please fill all fields!";
    return;
  }

  resultDiv.style.color = "#333"; // Reset to normal color

  // Construct payload
  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Calculate emissions for ${distance} KM using ${fuelType} with fuel consumption of ${fuelConsumption} liters per 100 KM. Give one line result. Also give ways to reduce emissions in brief for this vehicle.`,
          },
        ],
      },
    ],
  };

  // API Key (Replace with your key)
  const API_KEY = "Gemini_api_key";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${API_KEY}`;

  try {
    resultDiv.style.display = "block";
    resultDiv.textContent = "Calculating emissions...";

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error calling Gemini API");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    resultDiv.textContent = ""; // Clear previous content

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        // Decode and parse the SSE response
        const decodedValue = decoder.decode(value, { stream: true });
        let generatedContent = JSON.parse(decodedValue.replace(/^data: /, "")).candidates[0].content.parts[0].text;
        resultDiv.textContent += generatedContent;
    }

    // resultDiv.textContent = `Emission Calculation Result: ${result}`;
  } catch (error) {
    resultDiv.style.color = "red";
    resultDiv.textContent = `Error: ${error.message}`;
  }
}
