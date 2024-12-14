# Robot Fleet Monitoring Dashboard Frontend

This project is the frontend for the **Robot Fleet Monitoring Dashboard**. It provides real-time tracking and management for a fleet of robots, displaying key metrics such as battery level, CPU usage, RAM consumption, and their location on an interactive map.

## Features

- **Real-time Data**: Display the status of each robot in real-time, including battery percentage, CPU usage, RAM consumption, and last update time.
- **Interactive Map**: Visualize the robot locations on a map using Leaflet.js, with color-coded markers for their status (online/offline).
- **Search Functionality**: Filter robots by their ID to quickly find specific robots.
- **Pagination**: Navigate through large fleets of robots by paginating the robot list.
- **Status Filter**: Easily filter robots based on their status (Online, Offline, Low Battery).

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **Material UI**: A popular React UI framework for stylish and responsive designs.
- **Leaflet.js**: JavaScript library for embedding interactive maps.
- **Axios**: HTTP client for making API requests to the backend.
- **CSS**: Custom styling for application components.

## Setup

### Prerequisites

Before getting started, ensure you have the following installed on your system:

- **Node.js** (v14 or later)
- **npm** (v6 or later)

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/robot-fleet-dashboard-frontend.git

## Floder Stucture

robot-fleet-dashboard-frontend/
├── public/               # Public assets like index.html
├── src/                  # Source code for the application
│   ├── components/       # React components (Table, Map, etc.)
│   ├── services/         # API services (Axios configuration)
│   ├── App.js            # Main app component
│   └── index.js          # Entry point for React
├── .gitignore            # Git ignore rules
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation