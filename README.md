# TransitFlow Frontend

Professional React frontend for a real-time public transport tracking project.

## Run

```bash
npm install
npm run dev
```

Open the Vite URL in your browser.

## Included

- Passenger home and dashboard
- Live bus map with Leaflet/OpenStreetMap
- Bus and route details
- Stops
- Login UI
- Driver portal
- Admin dashboard
- Axios service layer ready for backend APIs
- Responsive layouts

## Next backend integration

Replace the mock data in `src/data.js` with API calls from `src/services/`, then add Socket.IO listeners for live location updates.