# Event Website

This project is a single-page website for a one-day technical event. It displays a schedule of talks with details for each talk.

## Features

*   Single-page layout
*   Dynamic schedule with talk details
*   Lunch and transition breaks
*   Node.js backend serving schedule data
*   React frontend for the user interface

## Technology Stack

*   **Frontend:** React, Bootstrap, Axios
*   **Backend:** Node.js, Express, Cors

## Getting Started

### Prerequisites

*   Node.js and npm installed

### Installation and Running the application

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/sandeep10rana/sandeep10rana-event-website.git
    cd sandeep10rana-event-website
    ```

2.  **Backend Setup:**
    ```sh
    cd backend
    npm install
    npm start
    ```

3.  **Frontend Setup (in a new terminal):**
    ```sh
    cd frontend
    npm install
    npm start
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
/event-website
|-- /backend
|   |-- schedule.json
|   |-- server.js
|   `-- package.json
|-- /frontend
|   |-- /src
|   |   |-- App.js
|   |   `-- index.js
|   `-- package.json
`-- .gitignore
`-- README.md
```
