import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  Navigate
} from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import socket from "./socket";

const API = "http://localhost:5000";

const busIcon = new L.DivIcon({
  className: "",
  html: "🚌",
  iconSize: [35, 35],
  iconAnchor: [17, 17]
});

const stopIcon = new L.DivIcon({
  className: "",
  html: "📍",
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

const busId = "6aa68f05f05fab0fbad189bb";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        TransitFlow
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/live">Live</Link>
        <Link to="/buses">Buses</Link>
        <Link to="/routes">Routes</Link>
        <Link to="/stops">Stops</Link>

        {token && user?.role === "passenger" && (
          <Link to="/dashboard">Dashboard</Link>
        )}

        {token && user?.role === "driver" && (
          <Link to="/driver">Driver</Link>
        )}

        {token && user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        <Link to="/about">About</Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="btn"
            style={{
              border: "1px solid #dcabab",
              background: "#f7f5f5",
              color: "#d64646",
              cursor: "pointer",
              padding: "9px 14px"
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="home-page">

      <section className="home-hero">

        <div className="home-hero-content">

          <div className="home-eyebrow">
            <span></span>
            REAL-TIME TRANSPORT NETWORK
          </div>

          <h1>
            Your bus.
            <br />
            <span>Your time.</span>
          </h1>

          <p>
            Track buses in real time, explore routes and stops,
            and know when your journey begins and ends.
          </p>

          <div className="home-actions">

            <Link
              to="/live"
              className="home-primary-btn"
            >
              Track live buses
              <span>↗</span>
            </Link>

            <Link
              to="/routes"
              className="home-secondary-btn"
            >
              Explore routes
            </Link>

          </div>

          <div className="home-metrics">

            <div>
              <strong>4+</strong>
              <span>Active buses</span>
            </div>

            <div>
              <strong>3</strong>
              <span>Routes</span>
            </div>

            <div>
              <strong>5+</strong>
              <span>Bus stops</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Live tracking</span>
            </div>

          </div>

        </div>


        <div className="home-map-card">

          <div className="home-map-top">

            <div>
              <span>LIVE NETWORK</span>
              <h3>Greater Noida</h3>
            </div>

            <div className="home-live">
              <span></span>
              LIVE
            </div>

          </div>


          <div className="home-map">

            <MapContainer
              center={[28.4200, 77.5150]}
              zoom={12}
              scrollWheelZoom={true}
              style={{
                width: "100%",
                height: "100%"
              }}
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                position={[28.4750, 77.5050]}
                icon={busIcon}
              >

                <Popup>
                  <strong>BUS101</strong>
                  <br />
                  Live tracking
                  <br />
                  Route A
                </Popup>

              </Marker>

            </MapContainer>

            <div className="home-map-label">
              <span></span>
              BUS101
              <small>Live location</small>
            </div>

          </div>


          <div className="home-map-footer">

            <div>

              <span>CURRENT BUS</span>

              <strong>BUS101</strong>

              <p>
                Route A · Greater Noida
              </p>

            </div>

            <Link to="/live">
              View live
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      <section className="home-features">

        <div className="home-section-heading">

          <div>
            <span>WHY TRANSITFLOW</span>

            <h2>
              Everything you need
              <br />
              to move smarter.
            </h2>
          </div>

          <p>
            One simple platform connecting passengers,
            drivers and transport operations.
          </p>

        </div>


        <div className="home-feature-grid">

          <div className="home-feature featured">

            <div className="feature-number">
              01
            </div>

            <div className="feature-arrow">
              ↗
            </div>

            <div className="feature-content">

              <div className="feature-icon">
                +
              </div>

              <h3>Live Tracking</h3>

              <p>
                Follow buses as they move through the city
                with real-time location updates.
              </p>

            </div>

          </div>


          <div className="home-feature">

            <div className="feature-number">
              02
            </div>

            <div className="feature-arrow">
              ↗
            </div>

            <div className="feature-content">

              <div className="feature-icon">
                #
              </div>

              <h3>Bus Information</h3>

              <p>
                View bus status, assigned drivers,
                routes and live operating information.
              </p>

            </div>

          </div>


          <div className="home-feature">

            <div className="feature-number">
              03
            </div>

            <div className="feature-arrow">
              ↗
            </div>

            <div className="feature-content">

              <div className="feature-icon">
                /
              </div>

              <h3>Routes & Stops</h3>

              <p>
                Discover routes and quickly find the stops
                that matter to your journey.
              </p>

            </div>

          </div>

        </div>

      </section>


      <section className="home-bottom">

        <div>

          <span>TRANSITFLOW</span>

          <h2>
            Know where your bus is.
            <br />
            Know when you'll arrive.
          </h2>

        </div>

        <Link
          to="/live"
          className="home-bottom-btn"
        >
          Start tracking
          <span>→</span>
        </Link>

      </section>

    </div>
  );
}
function LiveMap() {
  

  const [bus, setBus] = useState(null);
const [stops, setStops] = useState([]);
const [routeLine, setRouteLine] = useState([]);
const [eta, setEta] = useState("--");
const [error, setError] = useState("");

 useEffect(() => {
  const loadData = async () => {
    try {
      const [busRes, stopsRes] = await Promise.all([
        fetch(`${API}/api/buses/${busId}`),
        fetch(`${API}/api/stops`)
      ]);

      const busData = await busRes.json();
      const stopsData = await stopsRes.json();

      console.log("Bus data:", busData);
      console.log("Bus route ID:", busData.route?._id);
      console.log("Stops data:", stopsData);
      console.log(
  "Stop route IDs:",
  stopsData.map(stop =>
    stop.routes?.map(route => route._id || route)
  )
);

      if (!busRes.ok) {
        throw new Error(
          busData.message || "Failed to load bus"
        );
      }

      if (!Array.isArray(stopsData)) {
        throw new Error("Stops data is not an array");
      }

      setBus(busData);

      const routeId = busData.route?._id;

      const filteredStops = stopsData
        .filter(stop =>
          stop.routes?.some(route =>
            route._id === routeId ||
            route === routeId
          )
        )
        .sort((a, b) =>
          a.stopCode.localeCompare(b.stopCode)
        );

      console.log("Filtered stops:", filteredStops);

      setStops(filteredStops);
    } catch (err) {
      console.log("LiveMap load error:", err);
      setError(err.message);
    }
  };

  loadData();
}, []);

  useEffect(() => {
    if (!bus?._id) return;

    socket.emit("joinBus", bus._id);

    const updateLocation = data => {
      setBus(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          latitude: data.latitude,
          longitude: data.longitude,
          status: "active"
        };
      });
    };

    socket.on("busLocationUpdate", updateLocation);

    return () => {
      socket.off("busLocation", updateLocation);
    };
  }, [bus?._id]);

  useEffect(() => {
    if (!bus?.latitude || !bus?.longitude) return;

    const target = [28.45700, 77.50030];

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${bus.longitude},${bus.latitude};` +
      `${target[1]},${target[0]}?overview=false`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.routes?.length) {
          const minutes = Math.ceil(
            data.routes[0].duration / 60
          );

          setEta(`${minutes} min`);
        }
      })
      .catch(() => {
        setEta("--");
      });
  }, [bus?.latitude, bus?.longitude]);
 useEffect(() => {
  

  if (stops.length < 2) {
    return;
  }

  const coordinates = stops
    .map(stop => `${stop.longitude},${stop.latitude}`)
    .join(";");

  

  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${coordinates}?overview=full&geometries=geojson`;

  

  fetch(url)
    .then(res => res.json())
    .then(data => {
      

      if (data.routes && data.routes.length > 0) {
        const points = data.routes[0].geometry.coordinates.map(
          point => [point[1], point[0]]
        );

        

        setRouteLine(points);
      } else {
        
      }
    })
    .catch(err => {
      
    });
}, [stops]);  

  if (error) {
    return (
      <div className="page">
        <div className="error">
          {error}
        </div>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="page">
        <div className="loading">
          Loading live bus data...
        </div>
      </div>
    );
  }

  const currentPosition = [
    bus.latitude || 28.4750,
    bus.longitude || 77.5050
  ];

  // const routePoints = stops.map(stop => [
  //   stop.latitude,
  //   stop.longitude
  // ]);

  return (
    <div className="page">
      <div className="page-header">
        <p
          style={{
            color: "#2563eb",
            fontWeight: "800",
            fontSize: "12px",
            letterSpacing: "1px"
          }}
        >
          LIVE TRANSPORT
        </p>

        <h1>Track your bus</h1>

        <p>
          Follow BUS101 in real time and see its current
          position, route and estimated arrival.
        </p>
      </div>

      <div className="map-page">
        <div className="map-container">
          <MapContainer
            center={currentPosition}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

           {routeLine.length > 1 && (
  <Polyline
    positions={routeLine}
    pathOptions={{
      color: "#2563eb",
      weight: 5
    }}
  />
)}

            <Marker
              position={currentPosition}
              icon={busIcon}
            >
              <Popup>
                <strong>{bus.busNumber}</strong>
                <br />
                🟢 Live
              </Popup>
            </Marker>

            {stops.map(stop => (
              <Marker
                key={stop._id}
                position={[
                  stop.latitude,
                  stop.longitude
                ]}
                icon={stopIcon}
              >
                <Popup>
                  <strong>{stop.name}</strong>
                  <br />
                  {stop.stopCode}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="map-sidebar">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  fontWeight: "800",
                  marginBottom: "4px"
                }}
              >
                BUS
              </p>

              <h2
                style={{
                  margin: 0,
                  color: "#0f172a"
                }}
              >
                {bus.busNumber}
              </h2>
            </div>

            <span className="status active">
              ● LIVE
            </span>
          </div>

          <div
            className="detail-item"
            style={{
              marginBottom: "18px",
              textAlign: "center"
            }}
          >
            <small>Estimated Arrival</small>

            <strong
              style={{
                display: "block",
                fontSize: "32px",
                color: "#2563eb",
                marginTop: "5px"
              }}
            >
              {eta}
            </strong>
          </div>

          <div className="info-row">
            <span>Route</span>

            <span>
              {bus.route?.routeNumber || "R001"}
            </span>
          </div>

          <div className="info-row">
            <span>Route Name</span>

            <span>
              {bus.route?.name || "Route A"}
            </span>
          </div>

          <div className="info-row">
            <span>From</span>

            <span>
              {bus.route?.startPoint || "Greater Noida"}
            </span>
          </div>

          <div className="info-row">
            <span>To</span>

            <span>
              {bus.route?.endPoint || "Knowledge Park"}
            </span>
          </div>

          <div className="info-row">
            <span>Latitude</span>

            <span>
              {bus.latitude
                ? bus.latitude.toFixed(5)
                : "--"}
            </span>
          </div>

          <div className="info-row">
            <span>Longitude</span>

            <span>
              {bus.longitude
                ? bus.longitude.toFixed(5)
                : "--"}
            </span>
          </div>

          <div
            style={{
              marginTop: "22px",
              padding: "15px",
              background: "#ecfdf5",
              borderRadius: "13px",
              color: "#047857",
              fontSize: "13px",
              fontWeight: "700",
              lineHeight: "1.5"
            }}
          >
            🟢 Bus location is being updated
            in real time.
          </div>
        </div>
      </div>

      <div style={{ marginTop: "25px" }}>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px"
            }}
          >
            <div>
              <h2 style={{ marginBottom: "4px" }}>
                Route stops
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: "13px"
                }}
              >
                Stops along the current route
              </p>
            </div>

            <span
              style={{
                background: "#eff6ff",
                color: "#2563eb",
                padding: "7px 11px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "800"
              }}
            >
              {stops.length} Stops
            </span>
          </div>

          <div className="timeline">
            {stops.map((stop, index) => (
              <div
                className="timeline-item"
                key={stop._id}
              >
                <div className="timeline-dot"></div>

                <div>
                  <strong
                    style={{
                      color: "#0f172a"
                    }}
                  >
                    {stop.name}
                  </strong>

                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: "12px",
                      color: "#64748b"
                    }}
                  >
                    {stop.stopCode}
                  </p>
                </div>

                {index === stops.length - 1 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      color: "#64748b"
                    }}
                  >
                    Destination
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Live() {
  return (
    <div className="live-page">

      <div className="live-header">

        <div>
          <div className="live-eyebrow">
            <span></span>
            REAL-TIME NETWORK
          </div>

          <h1>Live bus tracking</h1>

          <p>
            Follow buses in real time and see their current route,
            location and estimated arrival.
          </p>
        </div>

        <div className="live-status">
          <span></span>
          LIVE
        </div>

      </div>


      <div className="live-map-card">

        <div className="live-map-heading">

          <div>
            <span>LIVE NETWORK</span>
            <h2>Greater Noida</h2>
          </div>

          <div className="live-map-info">
            Real-time location updates
          </div>

        </div>


        <div className="live-map-wrapper">
          <LiveMap />
        </div>

      </div>


      <div className="live-info-grid">

        <div className="live-info-card">

          <span className="live-card-label">
            TRACKING
          </span>

          <h3>Live locations</h3>

          <p>
            Bus positions are updated automatically as drivers
            move through their assigned routes.
          </p>

        </div>


        <div className="live-info-card">

          <span className="live-card-label">
            ROUTES
          </span>

          <h3>Follow the journey</h3>

          <p>
            View the active route and stops to understand
            where your bus is heading next.
          </p>

        </div>


        <div className="live-info-card live-info-highlight">

          <span className="live-card-label">
            ARRIVAL
          </span>

          <h3>Estimated arrival</h3>

          <p>
            Get an estimated arrival time based on the
            bus's current position.
          </p>

        </div>

      </div>

    </div>
  );
}

function Buses() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/buses`)
      .then(res => res.json())
      .then(data => setBuses(data))
      .catch(err => console.log(err));
  }, []);

  const activeBuses = buses.filter(
    bus => bus.status === "active"
  ).length;

  return (
    <div className="buses-page">

      <div className="buses-header">

        <div>
          <div className="buses-eyebrow">
            <span></span>
            TRANSPORT NETWORK
          </div>

          <h1>Available buses</h1>

          <p>
            Explore buses, routes and current operating
            information across the TransitFlow network.
          </p>
        </div>

        <div className="buses-summary">

          <div>
            <strong>{buses.length}</strong>
            <span>Total buses</span>
          </div>

          <div>
            <strong>{activeBuses}</strong>
            <span>Live now</span>
          </div>

        </div>

      </div>


      <div className="buses-section-head">

        <div>
          <span>NETWORK FLEET</span>
          <h2>All buses</h2>
        </div>

        <p>
          Live status and assigned route information
        </p>

      </div>


      {buses.length > 0 ? (

        <div className="buses-grid">

          {buses.map(bus => (

            <div
              className="bus-premium-card"
              key={bus._id}
            >

              <div className="bus-card-top">

                <div className="bus-number-block">

                  <span>BUS</span>

                  <h2>{bus.busNumber}</h2>

                </div>

                <div
                  className={`bus-live-status ${
                    bus.status === "active"
                      ? "is-active"
                      : ""
                  }`}
                >
                  <span></span>

                  {bus.status === "active"
                    ? "LIVE"
                    : "INACTIVE"}
                </div>

              </div>


              <div className="bus-route-box">

                <div className="bus-route-label">
                  ASSIGNED ROUTE
                </div>

                <div className="bus-route-number">

                  {bus.route
                    ? bus.route.routeNumber
                    : "—"}

                </div>

                <div className="bus-route-path">

                  <span>
                    {bus.route
                      ? bus.route.startPoint
                      : "Not assigned"}
                  </span>

                  <div className="route-line">
                    <i></i>
                    <span></span>
                  </div>

                  <span>
                    {bus.route
                      ? bus.route.endPoint
                      : "Not assigned"}
                  </span>

                </div>

              </div>


              <div className="bus-details-list">

                <div>

                  <span>Driver</span>

                  <strong>
                    {bus.driver
                      ? bus.driver.name
                      : "Not assigned"}
                  </strong>

                </div>

                <div>

                  <span>Location</span>

                  <strong>
                    {bus.latitude !== null &&
                    bus.longitude !== null
                      ? `${bus.latitude.toFixed(4)}, ${bus.longitude.toFixed(4)}`
                      : "Unavailable"}
                  </strong>

                </div>

              </div>


              <Link
                to={`/buses/${bus._id}`}
                className="bus-details-btn"
              >
                View bus details
                <span>→</span>
              </Link>

            </div>

          ))}

        </div>

      ) : (

        <div className="buses-empty">

          <div className="buses-empty-mark">
            —
          </div>

          <h3>No buses available</h3>

          <p>
            No buses have been registered in TransitFlow yet.
          </p>

        </div>

      )}

    </div>
  );
}



function BusMapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  return null;
}

function BusDetails() {
  const { id } = useParams();

  const [bus, setBus] = useState(null);
  const [stops, setStops] = useState([]);
  const [eta, setEta] = useState("--");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadBus = async () => {
      try {
        const res = await fetch(`${API}/api/buses/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Unable to load bus");
        }

        if (mounted) {
          setBus(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      }
    };

    const loadStops = async () => {
      try {
        const res = await fetch(`${API}/api/stops`);
        const data = await res.json();

        if (!Array.isArray(data)) return;

        if (mounted) {
          setStops(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadBus();
    loadStops();

    socket.emit("joinBus", id);

    const updateLocation = data => {
      const updatedBusId = data.busId?._id || data.busId;

      if (String(updatedBusId) === String(id)) {
        setBus(prev => {
          if (!prev) return prev;

          return {
            ...prev,
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            status: "active"
          };
        });
      }
    };

    socket.on("busLocationUpdate", updateLocation);

    const interval = setInterval(() => {
      loadBus();
    }, 2000);

    return () => {
      mounted = false;
      clearInterval(interval);
      socket.off("busLocationUpdate", updateLocation);
    };
  }, [id]);

  useEffect(() => {
    if (!bus?.route?._id) return;

    const routeId = bus.route._id;

    const filteredStops = stops
      .filter(stop =>
        stop.routes?.some(route =>
          String(route?._id || route) === String(routeId)
        )
      )
      .sort((a, b) =>
        a.stopCode.localeCompare(b.stopCode)
      );

    if (filteredStops.length > 0) {
      setStops(filteredStops);
    }
  }, [bus?.route?._id]);

  useEffect(() => {
    if (
      !bus ||
      typeof bus.latitude !== "number" ||
      typeof bus.longitude !== "number" ||
      stops.length === 0
    ) {
      return;
    }

    const target = stops[stops.length - 1];

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${bus.longitude},${bus.latitude};` +
      `${target.longitude},${target.latitude}` +
      `?overview=false`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.routes?.length) {
          const minutes = Math.ceil(
            data.routes[0].duration / 60
          );

          setEta(`${minutes} min`);
        } else {
          setEta("--");
        }
      })
      .catch(() => {
        setEta("--");
      });
  }, [
    bus?.latitude,
    bus?.longitude,
    stops
  ]);

  if (error) {
    return (
      <div className="tf-page">
        <div className="tf-container">
          <div className="tf-error">
            <span>ERROR</span>
            <h2>Unable to load bus</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="tf-page">
        <div className="tf-loading">
          <div className="tf-loader"></div>
          <p>Loading bus details...</p>
        </div>
      </div>
    );
  }

  const hasLocation =
    typeof bus.latitude === "number" &&
    typeof bus.longitude === "number";

  const mapPosition = hasLocation
    ? [bus.latitude, bus.longitude]
    : [28.45700, 77.50030];

  return (
    <div className="tf-page">

      <div className="tf-container">

        {/* TOP HEADER */}

        <div className="tf-top">

          <div>
            <div className="tf-breadcrumb">
              LIVE BUSES
              <span>/</span>
              BUS DETAILS
            </div>

            <div className="tf-title-row">

              <div className="tf-bus-symbol">
                <div className="tf-bus-shape">
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div>
                <h1>BUS {bus.busNumber}</h1>

                <p>
                  Track this bus and view its current journey.
                </p>
              </div>

            </div>
          </div>

          <div
            className={
              bus.status === "active"
                ? "tf-status active"
                : "tf-status"
            }
          >
            <span></span>
            {bus.status === "active" ? "LIVE NOW" : "OFFLINE"}
          </div>

        </div>


        {/* QUICK INFO */}

        <div className="tf-overview">

          <div className="tf-overview-item">

            <div className="tf-mini-icon blue">
              #
            </div>

            <div>
              <span>BUS NUMBER</span>
              <strong>{bus.busNumber}</strong>
            </div>

          </div>


          <div className="tf-overview-item">

            <div className="tf-mini-icon green">
              ●
            </div>

            <div>
              <span>STATUS</span>

              <strong className={
                bus.status === "active"
                  ? "green-text"
                  : ""
              }>
                {bus.status === "active"
                  ? "Active"
                  : "Inactive"}
              </strong>
            </div>

          </div>


          <div className="tf-overview-item">

            <div className="tf-mini-icon purple">
              ↗
            </div>

            <div>
              <span>ETA</span>
              <strong>{eta}</strong>
            </div>

          </div>


          <div className="tf-overview-item">

            <div className="tf-mini-icon orange">
              R
            </div>

            <div>
              <span>ROUTE</span>

              <strong>
                {bus.route?.routeNumber || "--"}
              </strong>
            </div>

          </div>

        </div>


        {/* MAIN CONTENT */}

        <div className="tf-content-grid">

          {/* LEFT */}

          <div className="tf-left-column">

            <div className="tf-panel route-panel">

              <div className="tf-panel-header">

                <div>
                  <span className="tf-overline">
                    JOURNEY
                  </span>

                  <h2>Route Information</h2>
                </div>

                {bus.route && (
                  <span className="tf-route-tag">
                    {bus.route.routeNumber}
                  </span>
                )}

              </div>


              {bus.route ? (

                <>

                  <div className="tf-route-name">
                    {bus.route.name}
                  </div>

                  <div className="tf-route-box">

                    <div className="tf-route-location">

                      <div className="tf-location-dot start"></div>

                      <div>
                        <span>START</span>
                        <strong>
                          {bus.route.startPoint}
                        </strong>
                      </div>

                    </div>


                    <div className="tf-route-line">
                      <div></div>
                    </div>


                    <div className="tf-route-location">

                      <div className="tf-location-dot end"></div>

                      <div>
                        <span>DESTINATION</span>
                        <strong>
                          {bus.route.endPoint}
                        </strong>
                      </div>

                    </div>

                  </div>

                </>

              ) : (

                <div className="tf-empty">
                  No route assigned to this bus.
                </div>

              )}

            </div>


            {/* LOCATION */}

            <div className="tf-panel location-panel">

              <div className="tf-panel-header">

                <div>
                  <span className="tf-overline">
                    GPS
                  </span>

                  <h2>Current Location</h2>
                </div>

                {hasLocation && (
                  <div className="tf-gps">
                    <span></span>
                    ACTIVE
                  </div>
                )}

              </div>


              {hasLocation ? (

                <div className="tf-coordinates">

                  <div>
                    <span>LATITUDE</span>
                    <strong>
                      {bus.latitude.toFixed(6)}
                    </strong>
                  </div>

                  <div>
                    <span>LONGITUDE</span>
                    <strong>
                      {bus.longitude.toFixed(6)}
                    </strong>
                  </div>

                </div>

              ) : (

                <div className="tf-waiting">
                  Waiting for live GPS location...
                </div>

              )}

            </div>

          </div>


          {/* RIGHT MAP */}

          <div className="tf-panel tf-map-panel">

            <div className="tf-map-header">

              <div>
                <span className="tf-overline">
                  REAL-TIME TRACKING
                </span>

                <h2>Live Location</h2>

                <p>
                  Follow the bus as it moves along the route.
                </p>
              </div>

              <div className="tf-map-legend">

                <div>
                  <span className="legend-bus"></span>
                  Bus
                </div>

                <div>
                  <span className="legend-stop"></span>
                  Stops
                </div>

              </div>

            </div>


            <div className="tf-map">

              <MapContainer
                center={mapPosition}
                zoom={15}
                className="tf-leaflet-map"
              >

                <BusMapUpdater
                  position={
                    hasLocation
                      ? [bus.latitude, bus.longitude]
                      : null
                  }
                />

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {hasLocation && (

                  <Marker
                    position={[
                      bus.latitude,
                      bus.longitude
                    ]}
                    icon={busIcon}
                  >

                    <Popup>

                      <strong>
                        Bus {bus.busNumber}
                      </strong>

                      <br />

                      Live tracking active

                    </Popup>

                  </Marker>

                )}


                {stops.map(stop => (

                  <Marker
                    key={stop._id}
                    position={[
                      stop.latitude,
                      stop.longitude
                    ]}
                    icon={stopIcon}
                  >

                    <Popup>

                      <strong>
                        {stop.name}
                      </strong>

                      <br />

                      {stop.stopCode}

                    </Popup>

                  </Marker>

                ))}

              </MapContainer>

              <div className="tf-map-live">
                <span></span>
                Real-time tracking
              </div>

            </div>

          </div>

        </div>


        {/* STOPS */}

        <div className="tf-panel stops-panel">

          <div className="tf-stops-header">

            <div>
              <span className="tf-overline">
                JOURNEY
              </span>

              <h2>Route Stops</h2>
            </div>

            <div className="tf-stop-count">
              {stops.length} STOPS
            </div>

          </div>


          {stops.length > 0 ? (

            <div className="tf-stop-timeline">

              {stops.map((stop, index) => (

                <div
                  key={stop._id}
                  className="tf-stop"
                >

                  <div className="tf-stop-marker">

                    <span>
                      {index + 1}
                    </span>

                  </div>

                  {index !== stops.length - 1 && (
                    <div className="tf-stop-connector"></div>
                  )}

                  <div className="tf-stop-info">

                    <span className="tf-stop-code">
                      {stop.stopCode}
                    </span>

                    <strong>
                      {stop.name}
                    </strong>

                    {index === 0 && (
                      <small className="start-label">
                        START
                      </small>
                    )}

                    {index === stops.length - 1 && (
                      <small className="end-label">
                        DESTINATION
                      </small>
                    )}

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="tf-empty">
              No stops available for this route.
            </div>

          )}

        </div>

      </div>

    </div>
  );
}

function RoutesPage() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/routes`)
      .then(res => res.json())
      .then(data => setRoutes(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="routes-page">

      <div className="routes-header">

        <div>
          <div className="routes-eyebrow">
            <span></span>
            TRANSIT NETWORK
          </div>

          <h1>Routes</h1>

          <p>
            Explore the routes connecting key locations
            across the TransitFlow network.
          </p>
        </div>

        <div className="routes-count">
          <strong>{routes.length}</strong>
          <span>Available routes</span>
        </div>

      </div>


      <div className="routes-section-head">

        <div>
          <span>NETWORK MAP</span>
          <h2>Active routes</h2>
        </div>

        <p>
          Select a route to view its complete journey.
        </p>

      </div>


      {routes.length > 0 ? (

        <div className="routes-grid">

          {routes.map((route, index) => (

            <div
              className="route-premium-card"
              key={route._id}
            >

              <div className="route-card-top">

                <div className="route-number">
                  {route.routeNumber}
                </div>

                <span className="route-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

              </div>


              <h2>{route.name}</h2>


              <div className="route-journey">

                <div className="route-point">

                  <div className="route-point-marker start">
                    <span></span>
                  </div>

                  <div>
                    <small>STARTING POINT</small>

                    <strong>
                      {route.startPoint}
                    </strong>
                  </div>

                </div>


                <div className="route-connector">
                  <span></span>
                </div>


                <div className="route-point">

                  <div className="route-point-marker end">
                    <span></span>
                  </div>

                  <div>
                    <small>DESTINATION</small>

                    <strong>
                      {route.endPoint}
                    </strong>
                  </div>

                </div>

              </div>


              <div className="route-card-footer">

                <span>
                  {route.startPoint}
                  <b> → </b>
                  {route.endPoint}
                </span>

                <Link
                  to={`/routes/${route._id}`}
                >
                  View route
                  <span>↗</span>
                </Link>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="routes-empty">

          <div className="routes-empty-mark">
            —
          </div>

          <h3>No routes available</h3>

          <p>
            No routes have been added to TransitFlow yet.
          </p>

        </div>

      )}

    </div>
  );
}

function RouteDetails() {
  const { id } = useParams();

  const [route, setRoute] = useState(null);
  const [stops, setStops] = useState([]);
  const [routeLine, setRouteLine] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/routes/${id}`).then(res => res.json()),
      fetch(`${API}/api/stops`).then(res => res.json())
    ])
      .then(([routeData, stopData]) => {
        setRoute(routeData);

        const routeStops = stopData.filter(stop =>
          stop.routes?.some(
            routeId => String(routeId?._id || routeId) === String(id)
          )
        );

        setStops(routeStops);
      })
      .catch(err => {
        console.log("Route details error:", err);
      });
  }, [id]);

  useEffect(() => {
    if (stops.length < 2) {
      setRouteLine([]);
      return;
    }

    const coordinates = stops
      .map(stop => `${stop.longitude},${stop.latitude}`)
      .join(";");

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${coordinates}?overview=full&geometries=geojson`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.routes && data.routes.length > 0) {
          const points = data.routes[0].geometry.coordinates.map(point => [
            point[1],
            point[0]
          ]);

          setRouteLine(points);
        } else {
          setRouteLine([]);
        }
      })
      .catch(err => {
        console.log("OSRM error:", err);
        setRouteLine([]);
      });
  }, [stops]);

  if (!route) {
    return (
      <div className="page">
        <div className="empty">
          <h3>Loading route...</h3>
        </div>
      </div>
    );
  }

  const center =
    stops.length > 0
      ? [stops[0].latitude, stops[0].longitude]
      : [28.36715, 77.54208];

  return (
    <div className="page">
      <div className="page-header">
        <Link
          to="/routes"
          style={{
            color: "#2563eb",
            fontWeight: "700",
            textDecoration: "none"
          }}
        >
          ← Back to Routes
        </Link>

        <p
          style={{
            color: "#2563eb",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "1px",
            marginTop: "20px"
          }}
        >
          ROUTE DETAILS
        </p>

        <h1>{route.name}</h1>

        <p>
          {route.routeNumber} · {route.startPoint} →{" "}
          {route.endPoint}
        </p>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <div style={{ fontSize: "28px" }}>🛣️</div>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px"
            }}
          >
            Route Number
          </p>

          <h2>{route.routeNumber}</h2>
        </div>

        <div className="card">
          <div style={{ fontSize: "28px" }}>📍</div>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px"
            }}
          >
            Total Stops
          </p>

          <h2>{stops.length}</h2>
        </div>

        <div className="card">
          <div style={{ fontSize: "28px" }}>🎯</div>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px"
            }}
          >
            Destination
          </p>

          <h2>{route.endPoint}</h2>
        </div>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns:
            "minmax(280px, 0.8fr) minmax(400px, 1.7fr)",
          marginTop: "25px",
          alignItems: "start"
        }}
      >
        <div className="card">
          <h2>Route Stops</h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "5px",
              marginBottom: "25px"
            }}
          >
            Stops covered by this route.
          </p>

          <div>
            {stops.map((stop, index) => (
              <div
                key={stop._id}
                style={{
                  display: "flex",
                  gap: "15px",
                  position: "relative",
                  paddingBottom:
                    index === stops.length - 1 ? "0" : "25px"
                }}
              >
                {index !== stops.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "11px",
                      top: "25px",
                      width: "2px",
                      height: "calc(100% - 10px)",
                      background: "#dbeafe"
                    }}
                  />
                )}

                <div
                  style={{
                    minWidth: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background:
                      index === 0 ||
                      index === stops.length - 1
                        ? "#2563eb"
                        : "#dbeafe",
                    color:
                      index === 0 ||
                      index === stops.length - 1
                        ? "white"
                        : "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "800",
                    zIndex: 1
                  }}
                >
                  {index + 1}
                </div>

                <div>
                  <h3
                    style={{
                      margin: "0 0 4px"
                    }}
                  >
                    {stop.name}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "#64748b"
                    }}
                  >
                    {stop.stopCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: "0",
            overflow: "hidden"
          }}
        >
          <div style={{ padding: "20px" }}>
            <h2>Route Map</h2>

            <p
              style={{
                color: "#64748b",
                marginTop: "5px"
              }}
            >
              Complete route between all registered stops.
            </p>
          </div>

          <MapContainer
            center={center}
            zoom={13}
            style={{
              height: "520px",
              width: "100%"
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {stops.map((stop, index) => (
              <Marker
                key={stop._id}
                position={[
                  stop.latitude,
                  stop.longitude
                ]}
                icon={stopIcon}
              >
                <Popup>
                  <b>
                    {index + 1}. {stop.name}
                  </b>
                  <br />
                  {stop.stopCode}
                </Popup>
              </Marker>
            ))}

            {routeLine.length > 1 && (
              <Polyline
                positions={routeLine}
                pathOptions={{
                  color: "#2563eb",
                  weight: 6,
                  opacity: 0.9
                }}
              />
            )}
          </MapContainer>
        </div>
      </div>

      {stops.length === 0 && (
        <div
          className="empty"
          style={{ marginTop: "25px" }}
        >
          <h3>No stops assigned</h3>

          <p>
            This route currently has no registered stops.
          </p>
        </div>
      )}
    </div>
  );
}
function Stops() {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/stops`)
      .then(res => res.json())
      .then(data => setStops(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="stops-page">

      <div className="stops-container">

        <div className="stops-header">

          <div>
            <div className="stops-eyebrow">
              <span></span>
              TRANSIT NETWORK
            </div>

            <h1>Bus stops</h1>

            <p>
              Explore stops and locations available across
              the TransitFlow network.
            </p>
          </div>

          <div className="stops-summary">
            <strong>{stops.length}</strong>
            <span>Network stops</span>
          </div>

        </div>

        <div className="stops-section-head">

          <div>
            <span>NETWORK LOCATIONS</span>
            <h2>Available stops</h2>
          </div>

          <p>
            Select a stop to view its location and route information.
          </p>

        </div>

        {stops.length > 0 ? (

          <div className="stops-grid">

            {stops.map((stop, index) => (

              <div
                className="stop-premium-card"
                key={stop._id}
              >

                <div className="stop-card-top">

                  <div className="stop-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span className="stop-code">
                    {stop.stopCode}
                  </span>

                </div>

                <div className="stop-main">

                  <div className="stop-location-mark">
                    <span></span>
                  </div>

                  <div>
                    <h2>{stop.name}</h2>

                    <p>
                      Transit stop
                    </p>
                  </div>

                </div>

                <div className="stop-coordinates">

                  <div>
                    <span>LATITUDE</span>
                    <strong>
                      {Number(stop.latitude).toFixed(5)}
                    </strong>
                  </div>

                  <div>
                    <span>LONGITUDE</span>
                    <strong>
                      {Number(stop.longitude).toFixed(5)}
                    </strong>
                  </div>

                </div>

                <div className="stop-routes">

                  <span className="stop-routes-label">
                    CONNECTED ROUTES
                  </span>

                  <div className="stop-route-list">

                    {stop.routes?.length > 0 ? (

                      stop.routes.map(route => (

                        <span
                          className="stop-route-tag"
                          key={route._id}
                        >
                          {route.routeNumber}
                        </span>

                      ))

                    ) : (

                      <span className="stop-no-route">
                        No route assigned
                      </span>

                    )}

                  </div>

                </div>

                <Link
                  to={`/stops/${stop._id}`}
                  className="stop-details-btn"
                >
                  <span>View stop</span>
                  <strong>→</strong>
                </Link>

              </div>

            ))}

          </div>

        ) : (

          <div className="stops-empty">

            <div className="stops-empty-mark">
              —
            </div>

            <h3>No stops available</h3>

            <p>
              No transit stops have been added to the network yet.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

function StopDetails() {
  const { id } = useParams();
  const [stop, setStop] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/stops/${id}`)
      .then(res => res.json())
      .then(data => setStop(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!stop) {
    return (
      <div className="stop-details-page">
        <div className="stop-loading">
          <div className="stop-loading-line"></div>
          <p>Loading stop details...</p>
        </div>
      </div>
    );
  }

  const position = [
    Number(stop.latitude),
    Number(stop.longitude)
  ];

  return (
    <div className="stop-details-page">

      <div className="stop-details-container">

        <Link
          to="/stops"
          className="stop-back"
        >
          <span>←</span>
          Back to stops
        </Link>

        <section className="stop-details-hero">

          <div className="stop-hero-content">

            <div className="stop-details-eyebrow">
              <span></span>
              TRANSIT LOCATION
            </div>

            <div className="stop-title-row">

              <div className="stop-title-mark">
                <span></span>
              </div>

              <div>
                <h1>{stop.name}</h1>

                <p>
                  {stop.stopCode}
                  <span> · </span>
                  TransitFlow Network
                </p>
              </div>

            </div>

          </div>

          <div className="stop-available">
            <span></span>
            ACTIVE STOP
          </div>

        </section>

        <section className="stop-overview">

          <div className="stop-overview-card">

            <span>STOP CODE</span>

            <strong>
              {stop.stopCode}
            </strong>

            <p>
              Network identifier
            </p>

          </div>

          <div className="stop-overview-card">

            <span>CONNECTED ROUTES</span>

            <strong>
              {stop.routes?.length || 0}
            </strong>

            <p>
              Routes serving this stop
            </p>

          </div>

          <div className="stop-overview-card">

            <span>LATITUDE</span>

            <strong>
              {position[0].toFixed(5)}
            </strong>

            <p>
              Registered position
            </p>

          </div>

          <div className="stop-overview-card">

            <span>LONGITUDE</span>

            <strong>
              {position[1].toFixed(5)}
            </strong>

            <p>
              Registered position
            </p>

          </div>

        </section>

        <section className="stop-details-grid">

          <div className="stop-info-panel">

            <div className="stop-panel-header">

              <div>
                <span>LOCATION DATA</span>
                <h2>Stop information</h2>
              </div>

            </div>

            <p className="stop-panel-description">
              Registered information for this TransitFlow stop.
            </p>

            <div className="stop-info-list">

              <div className="stop-info-row">
                <div>
                  <span>STOP NAME</span>
                  <strong>{stop.name}</strong>
                </div>
              </div>

              <div className="stop-info-row">
                <div>
                  <span>STOP CODE</span>
                  <strong>{stop.stopCode}</strong>
                </div>
              </div>

              <div className="stop-info-row">
                <div>
                  <span>LATITUDE</span>
                  <strong>{position[0].toFixed(6)}</strong>
                </div>
              </div>

              <div className="stop-info-row">
                <div>
                  <span>LONGITUDE</span>
                  <strong>{position[1].toFixed(6)}</strong>
                </div>
              </div>

            </div>

            <div className="connected-routes">

              <div className="connected-routes-header">
                <span>ROUTES</span>
                <strong>
                  {stop.routes?.length || 0}
                </strong>
              </div>

              {stop.routes?.length > 0 ? (

                <div className="connected-route-list">

                  {stop.routes.map(route => (

                    <Link
                      key={route._id}
                      to={`/routes/${route._id}`}
                      className="connected-route"
                    >

                      <div className="connected-route-code">
                        {route.routeNumber}
                      </div>

                      <div className="connected-route-info">
                        <strong>
                          {route.name}
                        </strong>

                        <span>
                          {route.startPoint}
                          {" → "}
                          {route.endPoint}
                        </span>
                      </div>

                      <span className="connected-route-arrow">
                        →
                      </span>

                    </Link>

                  ))}

                </div>

              ) : (

                <div className="no-connected-routes">
                  No routes assigned to this stop.
                </div>

              )}

            </div>

          </div>

          <div className="stop-map-panel">

            <div className="stop-map-header">

              <div>
                <span>MAP VIEW</span>
                <h2>Stop location</h2>
              </div>

              <div className="stop-map-status">
                <span></span>
                REGISTERED
              </div>

            </div>

            <div className="stop-map-wrapper">

              <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={true}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  position={position}
                  icon={stopIcon}
                >
                  <Popup>
                    <b>{stop.name}</b>
                    <br />
                    {stop.stopCode}
                  </Popup>
                </Marker>

              </MapContainer>

            </div>

            <div className="stop-map-footer">

              <div className="stop-map-coordinate">

                <span>LAT</span>

                <strong>
                  {position[0].toFixed(6)}
                </strong>

              </div>

              <div className="stop-coordinate-divider"></div>

              <div className="stop-map-coordinate">

                <span>LNG</span>

                <strong>
                  {position[1].toFixed(6)}
                </strong>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async e => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${API}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      localStorage.setItem(
        "token",
        data.token
      );

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      if (data.user?.role === "driver") {
        navigate("/driver");
      } else if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          <div
            style={{
              width: "58px",
              height: "58px",
              margin: "0 auto 15px",
              borderRadius: "18px",
              background: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px"
            }}
          >
            🚌
          </div>

          <p
            style={{
              color: "#2563eb",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1px",
              marginBottom: "7px"
            }}
          >
            TRANSITFLOW
          </p>

          <h1>Welcome back</h1>

          <p>
            Sign in to access your TransitFlow account.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 14px",
              marginBottom: "18px",
              background: "#fef2f2",
              color: "#dc2626",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "600"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              marginTop: "10px",
              border: "none",
              cursor: "pointer"
            }}
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In →"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            paddingTop: "20px",
            borderTop:
              "1px solid #e2e8f0"
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#64748b"
            }}
          >
            Don't have an account?
          </p>

          <Link
  to="/register"
  style={{
    color: "#2563eb",
    fontWeight: "700",
    textDecoration: "none"
  }}
>
  Create account
</Link>

          <Link
            to="/"
            style={{
              color: "#2563eb",
              fontWeight: "700",
              textDecoration: "none"
            }}
          >
            Explore TransitFlow
          </Link>
        </div>
      </div>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async e => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${API}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          <p
            style={{
              color: "#2563eb",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1px",
              marginBottom: "7px"
            }}
          >
            TRANSITFLOW
          </p>

          <h1>Create account</h1>

          <p>
            Create your passenger account.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 14px",
              marginBottom: "18px",
              background: "#fef2f2",
              color: "#dc2626",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "600"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e =>
              setName(e.target.value)
            }
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={e =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              marginTop: "10px",
              border: "none",
              cursor: "pointer"
            }}
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account →"}
          </button>

        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            paddingTop: "20px",
            borderTop:
              "1px solid #e2e8f0"
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#64748b"
            }}
          >
            Already have an account?
          </p>

          <Link
            to="/login"
            style={{
              color: "#2563eb",
              fontWeight: "700",
              textDecoration: "none"
            }}
          >
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}

function Dashboard() {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedBus, setSelectedBus] = useState(null);
  const [eta, setEta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/buses`).then(res => res.json()),
      fetch(`${API}/api/routes`).then(res => res.json()),
      fetch(`${API}/api/stops`).then(res => res.json())
    ])
      .then(([busData, routeData, stopData]) => {
        setBuses(busData);
        setRoutes(routeData);
        setStops(stopData);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));

    const handleLocationUpdate = data => {
      setBuses(prev =>
        prev.map(bus =>
          String(bus._id) === String(data.busId)
            ? {
                ...bus,
                latitude: data.latitude,
                longitude: data.longitude,
                status: "active"
              }
            : bus
        )
      );

      setSelectedBus(prev =>
        prev && String(prev._id) === String(data.busId)
          ? {
              ...prev,
              latitude: data.latitude,
              longitude: data.longitude,
              status: "active"
            }
          : prev
      );
    };

    socket.on("busLocationUpdate", handleLocationUpdate);

    return () => {
      socket.off("busLocationUpdate", handleLocationUpdate);
    };
  }, []);
  useEffect(() => {
  if (!selectedBus) {
    setEta(null);
    return;
  }

  if (
    typeof selectedBus.latitude !== "number" ||
    typeof selectedBus.longitude !== "number"
  ) {
    setEta(null);
    return;
  }

  const routeId = selectedBus.route?._id;

  if (!routeId) {
    setEta(null);
    return;
  }

  const routeStops = stops.filter(stop =>
    stop.routes?.some(
      routeIdValue =>
        String(routeIdValue?._id || routeIdValue) ===
        String(routeId)
    )
  );

  if (routeStops.length === 0) {
    setEta(null);
    return;
  }

  const finalStop = routeStops[routeStops.length - 1];

  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${selectedBus.longitude},${selectedBus.latitude};` +
    `${finalStop.longitude},${finalStop.latitude}` +
    `?overview=false`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (
        data.routes &&
        data.routes.length > 0
      ) {
        const minutes = Math.max(
          1,
          Math.round(
            data.routes[0].duration / 60
          )
        );

        setEta(minutes);
      } else {
        setEta(null);
      }
    })
    .catch(() => {
      setEta(null);
    });
}, [selectedBus, stops]);

  const activeBuses = buses.filter(
    bus => bus.status === "active"
  );

  const filteredBuses = buses.filter(bus => {
  const value = search.toLowerCase();

  const matchesSearch =
    bus.busNumber?.toLowerCase().includes(value) ||
    bus.route?.routeNumber?.toLowerCase().includes(value) ||
    bus.route?.name?.toLowerCase().includes(value);

  const matchesFilter =
    filter === "all" ||
    (filter === "live" && bus.status === "active") ||
    (filter === "offline" && bus.status !== "active");

  return matchesSearch && matchesFilter;
});

  const getBusPosition = bus => {
    if (
      typeof bus.latitude === "number" &&
      typeof bus.longitude === "number"
    ) {
      return [bus.latitude, bus.longitude];
    }

    return [28.4200, 77.5150];
  };

  return (
    <div className="passenger-dashboard">

      <div className="passenger-container">

        <section className="passenger-hero">

          <div>
            <div className="passenger-eyebrow">
              <span></span>
              PASSENGER DASHBOARD
            </div>

            <h1>
              Your city, <br />
              <strong>in motion.</strong>
            </h1>

            <p>
              Track buses, explore routes and see live
              transport information across TransitFlow.
            </p>
          </div>

          <div className="passenger-hero-status">
            <span></span>
            NETWORK LIVE
          </div>

        </section>

        <section className="passenger-stats">

          <div className="passenger-stat">
            <span>LIVE BUSES</span>
            <strong>{activeBuses.length}</strong>
            <p>Currently active</p>
          </div>

          <div className="passenger-stat">
            <span>TOTAL BUSES</span>
            <strong>{buses.length}</strong>
            <p>Network fleet</p>
          </div>

          <div className="passenger-stat">
            <span>ROUTES</span>
            <strong>{routes.length}</strong>
            <p>Available routes</p>
          </div>

          <div className="passenger-stat">
            <span>STOPS</span>
            <strong>{stops.length}</strong>
            <p>Network locations</p>
          </div>

        </section>

        <section className="passenger-live-section">

          <div className="passenger-section-heading">

            <div>
              <span>REAL-TIME NETWORK</span>
              <h2>Find your bus</h2>
            </div>

            <div className="passenger-live-indicator">
              <span></span>
              LIVE UPDATES
            </div>

          </div>

          <div className="passenger-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search bus number or route..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            {search && (
              <button
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}

          </div>
          <div className="passenger-filters">
  <button
    className={filter === "all" ? "active" : ""}
    onClick={() => setFilter("all")}
  >
    All buses
    <span>{buses.length}</span>
  </button>

  <button
    className={filter === "live" ? "active" : ""}
    onClick={() => setFilter("live")}
  >
    Live
    <span>{activeBuses.length}</span>
  </button>

  <button
    className={filter === "offline" ? "active" : ""}
    onClick={() => setFilter("offline")}
  >
    Offline
    <span>{buses.length - activeBuses.length}</span>
  </button>
</div>

<div className="passenger-result-count">
  Showing {filteredBuses.length} of {buses.length} buses
</div>

          {loading ? (

            <div className="passenger-loading">
              <div></div>
              <p>Loading transport network...</p>
            </div>

          ) : filteredBuses.length > 0 ? (

            <div className="passenger-bus-grid">

              {filteredBuses.map(bus => {

                const isActive =
                  bus.status === "active";

                const isSelected =
                  selectedBus?._id === bus._id;

                return (
                  <div
                    key={bus._id}
                    className={`passenger-bus-card ${
                      isSelected ? "selected" : ""
                    }`}
                  >

                    <div className="passenger-bus-top">

                      <div>
                        <span>BUS</span>

                        <h3>
                          {bus.busNumber}
                        </h3>
                      </div>

                      <div
                        className={`passenger-bus-status ${
                          isActive ? "active" : ""
                        }`}
                      >
                        <span></span>
                        {isActive ? "LIVE" : "OFFLINE"}
                      </div>

                    </div>

                    <div className="passenger-route-info">

                      <span>ROUTE</span>

                      <strong>
                        {bus.route?.routeNumber || "—"}
                      </strong>

                      <p>
                        {bus.route?.name ||
                          "No route assigned"}
                      </p>

                    </div>

                    <div className="passenger-journey">

                      <div>
                        <small>FROM</small>

                        <strong>
                          {bus.route?.startPoint || "—"}
                        </strong>
                      </div>

                      <span>→</span>

                      <div>
                        <small>TO</small>

                        <strong>
                          {bus.route?.endPoint || "—"}
                        </strong>
                      </div>

                    </div>

                    <div className="passenger-card-footer">

                      <div>

                        <span>LOCATION</span>

                        <strong>
                          {typeof bus.latitude === "number"
                            ? `${bus.latitude.toFixed(4)}, ${bus.longitude.toFixed(4)}`
                            : "Waiting for GPS"}
                        </strong>

                      </div>

                      <button
                        onClick={() =>
                          setSelectedBus(
                            isSelected ? null : bus
                          )
                        }
                      >
                        {isSelected
                          ? "Hide"
                          : "Track"}
                        <span>→</span>
                      </button>

                    </div>
                    {isSelected && (
  <div className="passenger-eta">
    <div>
      <span>ESTIMATED ARRIVAL</span>
      <strong>
        {eta ? `${eta} min` : "Calculating..."}
      </strong>
    </div>

    <div className="passenger-eta-route">
      <span></span>
      <p>
        {bus.route?.endPoint || "Final stop"}
      </p>
    </div>
  </div>
)}

                    {isSelected && (
                      <div className="passenger-mini-map">

                        <MapContainer
                          center={getBusPosition(bus)}
                          zoom={14}
                          scrollWheelZoom={true}
                          style={{
                            width: "100%",
                            height: "260px"
                          }}
                        >

                          <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />

                          {typeof bus.latitude === "number" && (
                            <Marker
                              position={[
                                bus.latitude,
                                bus.longitude
                              ]}
                              icon={busIcon}
                            >
                              <Popup>
                                <b>
                                  {bus.busNumber}
                                </b>
                                <br />
                                Live bus location
                              </Popup>
                            </Marker>
                          )}

                        </MapContainer>

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          ) : (

            <div className="passenger-empty">

              <div>—</div>

              <h3>
                No buses found
              </h3>

              <p>
                Try searching for another bus number
                or route.
              </p>

            </div>

          )}

        </section>

        <section className="passenger-bottom-grid">

          <div className="passenger-info-card">

            <span>QUICK ACCESS</span>

            <h2>
              Explore the network
            </h2>

            <p>
              Discover routes and stops available
              across TransitFlow.
            </p>

            <div className="passenger-info-links">

              <Link to="/routes">
                <span>Routes</span>
                <strong>→</strong>
              </Link>

              <Link to="/stops">
                <span>Bus stops</span>
                <strong>→</strong>
              </Link>

              <Link to="/live">
                <span>Live map</span>
                <strong>→</strong>
              </Link>

            </div>

          </div>

          <div className="passenger-network-card">

            <div className="passenger-network-label">
              TRANSITFLOW
            </div>

            <h2>
              Move smarter.
            </h2>

            <p>
              Real-time information designed to make
              everyday journeys easier.
            </p>

            <div className="passenger-network-line">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

function Driver() {
  const [bus, setBus] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [watchId, setWatchId] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const getDriverId = () => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (user?._id) return user._id;
    if (user?.id) return user.id;

    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      return (
        payload.userId ||
        payload.id ||
        payload._id ||
        null
      );
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const driverId = getDriverId();

    if (!driverId) {
      setError("Driver ID not found. Please login again.");
      return;
    }

    fetch(`${API}/api/buses/driver/${driverId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(async res => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Unable to find assigned bus"
          );
        }

        return data;
      })
      .then(data => {
        const assignedBus = data[0] || null;

        if (!assignedBus) {
          setError("No bus is assigned to you.");
          return;
        }

        setBus(assignedBus);

        if (
          typeof assignedBus.latitude === "number" &&
          typeof assignedBus.longitude === "number"
        ) {
          setLocation({
            latitude: assignedBus.latitude,
            longitude: assignedBus.longitude
          });
        }
      })
      .catch(err => setError(err.message));
  }, []);

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const startTracking = () => {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by this browser."
      );
      return;
    }

    if (!bus?._id) {
      setError("Bus information not available.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude
        });

        try {
          const res = await fetch(
            `${API}/api/buses/${bus._id}/location`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                latitude,
                longitude
              })
            }
          );

          const data = await res.json();

          if (!res.ok) {
            setError(
              data.message || "Location update failed"
            );
            return;
          }

          setBus(prev => ({
            ...prev,
            latitude,
            longitude,
            status: "active"
          }));

          setLastUpdate(new Date());
          setError("");

        } catch (err) {
          console.log(err);
          setError(
            "Unable to send GPS location to server."
          );
        }
      },
      err => {
        setError(err.message);
        setTracking(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000
      }
    );

    setWatchId(id);
    setTracking(true);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    setWatchId(null);
    setTracking(false);
  };

  if (error && !bus) {
    return (
      <div className="driver-page">
        <div className="driver-error">
          <span>DRIVER ACCESS</span>
          <h3>Unable to load dashboard</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="driver-page">
        <div className="driver-loading">
          <div className="driver-loading-line"></div>
          <p>Loading driver dashboard...</p>
        </div>
      </div>
    );
  }

  const hasBusLocation =
    typeof bus.latitude === "number" &&
    typeof bus.longitude === "number";

  const mapPosition = location
    ? [location.latitude, location.longitude]
    : hasBusLocation
    ? [bus.latitude, bus.longitude]
    : [28.36715, 77.54208];

  return (
    <div className="driver-page">

      <div className="driver-container">

        <section className="driver-hero">

          <div>
            <div className="driver-eyebrow">
              <span></span>
              DRIVER CONTROL
            </div>

            <h1>
              Welcome, {bus.driver?.name || "Driver"}
            </h1>

            <p>
              Manage your assigned bus and share its
              live location with passengers.
            </p>
          </div>

          <div
            className={`driver-status ${
              tracking ? "tracking" : ""
            }`}
          >
            <span></span>
            {tracking ? "GPS LIVE" : "GPS OFF"}
          </div>

        </section>

        <section className="driver-stats">

          <div className="driver-stat-card">

            <div className="driver-stat-label">
              ASSIGNED BUS
            </div>

            <strong>
              {bus.busNumber}
            </strong>

            <p>
              Your current fleet assignment
            </p>

          </div>

          <div className="driver-stat-card">

            <div className="driver-stat-label">
              ROUTE
            </div>

            <strong>
              {bus.route?.routeNumber || "—"}
            </strong>

            <p>
              {bus.route?.name || "No route assigned"}
            </p>

          </div>

          <div className="driver-stat-card">

            <div className="driver-stat-label">
              TRACKING
            </div>

            <strong>
              {tracking ? "LIVE" : "OFF"}
            </strong>

            <p>
              {tracking
                ? "Location sharing active"
                : "Location sharing stopped"}
            </p>

          </div>

          <div className="driver-stat-card">

            <div className="driver-stat-label">
              BUS STATUS
            </div>

            <strong>
              {bus.status === "active"
                ? "ACTIVE"
                : "INACTIVE"}
            </strong>

            <p>
              Current system status
            </p>

          </div>

        </section>

        {error && (
          <div className="driver-message">
            <span></span>
            {error}
          </div>
        )}

        <section className="driver-main-grid">

          <div className="driver-control-panel">

            <div className="driver-panel-heading">

              <div>
                <span>LOCATION SERVICE</span>
                <h2>GPS tracking</h2>
              </div>

              <div
                className={`driver-gps-indicator ${
                  tracking ? "active" : ""
                }`}
              >
                <span></span>
                {tracking ? "ACTIVE" : "READY"}
              </div>

            </div>

            <p className="driver-panel-description">
              Share your phone's GPS position with
              TransitFlow while driving your assigned bus.
            </p>

            <div
              className={`driver-sharing ${
                tracking ? "active" : ""
              }`}
            >

              <div className="driver-sharing-mark">
                <span></span>
              </div>

              <div>

                <span>
                  CURRENT STATUS
                </span>

                <strong>
                  {tracking
                    ? "Location sharing is active"
                    : "Location sharing is stopped"}
                </strong>

                <p>
                  {tracking
                    ? "Your position is being sent to the TransitFlow server."
                    : "Start tracking when you are ready to begin your route."}
                </p>

              </div>

            </div>

            {!tracking ? (

              <button
                className="driver-start-btn"
                onClick={startTracking}
              >
                Start GPS tracking
                <span>→</span>
              </button>

            ) : (

              <button
                className="driver-stop-btn"
                onClick={stopTracking}
              >
                Stop GPS tracking
                <span>■</span>
              </button>

            )}

            <div className="driver-location">

              <div className="driver-location-header">
                <div>
                  <span>LAST POSITION</span>
                  <h3>Current GPS position</h3>
                </div>
              </div>

              <div className="driver-last-update">
                Last update
                <strong>
                  {lastUpdate
                    ? lastUpdate.toLocaleTimeString()
                    : "Waiting for GPS"}
                </strong>
              </div>

              <div className="driver-coordinates">

                <div>
                  <span>LATITUDE</span>

                  <strong>
                    {location &&
                    typeof location.latitude === "number"
                      ? location.latitude.toFixed(6)
                      : typeof bus.latitude === "number"
                      ? bus.latitude.toFixed(6)
                      : "Waiting"}
                  </strong>
                </div>

                <div>
                  <span>LONGITUDE</span>

                  <strong>
                    {location &&
                    typeof location.longitude === "number"
                      ? location.longitude.toFixed(6)
                      : typeof bus.longitude === "number"
                      ? bus.longitude.toFixed(6)
                      : "Waiting"}
                  </strong>
                </div>

              </div>

            </div>

          </div>

          <div className="driver-map-panel">

            <div className="driver-map-header">

              <div>
                <span>LIVE MAP</span>
                <h2>Bus location</h2>
              </div>

              <div className="driver-map-status">
                <span></span>
                {tracking ? "LIVE POSITION" : "LAST POSITION"}
              </div>

            </div>

            <div className="driver-map-wrapper">

              <MapContainer
                center={mapPosition}
                zoom={15}
                scrollWheelZoom={true}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {(location || hasBusLocation) && (
                  <Marker
                    position={mapPosition}
                    icon={busIcon}
                  >
                    <Popup>
                      <b>{bus.busNumber}</b>
                      <br />
                      {tracking
                        ? "Live GPS tracking"
                        : "Last known location"}
                    </Popup>
                  </Marker>
                )}

              </MapContainer>

            </div>

            <div className="driver-map-footer">

              <div>
                <span>BUS</span>
                <strong>{bus.busNumber}</strong>
              </div>

              <div className="driver-map-divider"></div>

              <div>
                <span>ROUTE</span>
                <strong>
                  {bus.route?.routeNumber || "—"}
                </strong>
              </div>

              <div className="driver-map-divider"></div>

              <div>
                <span>STATUS</span>
                <strong>
                  {tracking ? "LIVE" : "STANDBY"}
                </strong>
              </div>

            </div>

          </div>

        </section>

        <section className="driver-route-panel">

          <div className="driver-route-heading">

            <div>
              <span>ASSIGNMENT</span>
              <h2>Assigned route</h2>
            </div>

            {bus.route && (
              <div className="driver-route-code">
                {bus.route.routeNumber}
              </div>
            )}

          </div>

          {bus.route ? (

            <div className="driver-route-details">

              <div>
                <span>ROUTE NAME</span>
                <strong>{bus.route.name}</strong>
              </div>

              <div>
                <span>STARTING POINT</span>
                <strong>{bus.route.startPoint}</strong>
              </div>

              <div>
                <span>DESTINATION</span>
                <strong>{bus.route.endPoint}</strong>
              </div>

            </div>

          ) : (

            <div className="driver-no-route">
              No route has been assigned to this bus yet.
            </div>

          )}

        </section>

      </div>

    </div>
  );
}
function Admin() {
  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [busNumber, setBusNumber] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [saving, setSaving] = useState(false);

  const [busDrivers, setBusDrivers] = useState({});
  const [busRoutes, setBusRoutes] = useState({});

 const loadData = async () => {
  try {
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please login again.");
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const [busRes, driverRes, routeRes, stopRes] =
      await Promise.all([
        fetch(`${API}/api/buses`, { headers }),
        fetch(`${API}/api/auth/drivers`, { headers }),
        fetch(`${API}/api/routes`, { headers }),
        fetch(`${API}/api/stops`, { headers })
      ]);

    const busData = await busRes.json();
    const driverData = await driverRes.json();
    const routeData = await routeRes.json();
    const stopData = await stopRes.json();

    if (!busRes.ok) {
      throw new Error(
        busData.message || "Failed to load buses"
      );
    }

    if (!driverRes.ok) {
      throw new Error(
        driverData.message || "Failed to load drivers"
      );
    }

    if (!routeRes.ok) {
      throw new Error(
        routeData.message || "Failed to load routes"
      );
    }

    if (!stopRes.ok) {
      throw new Error(
        stopData.message || "Failed to load stops"
      );
    }

    setBuses(busData);
    setDrivers(driverData);
    setRoutes(routeData);
    setStops(stopData);

    const driverValues = {};
    const routeValues = {};

    busData.forEach(bus => {
      driverValues[bus._id] =
        bus.driver?._id || "";

      routeValues[bus._id] =
        bus.route?._id || "";
    });

    setBusDrivers(driverValues);
    setBusRoutes(routeValues);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadData();
  }, []);

  const addBus = async e => {
    e.preventDefault();

    if (!busNumber.trim()) {
      setMessage("Please enter bus number");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${API}/api/buses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          busNumber: busNumber.trim(),
          driver: selectedDriver || null,
          route: selectedRoute || null,
          status: "inactive"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to add bus"
        );
      }

      setMessage("Bus added successfully");

      setBusNumber("");
      setSelectedDriver("");
      setSelectedRoute("");

      await loadData();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateBus = async busId => {
    try {
      setMessage("");
      setError("");

      const driver = busDrivers[busId] || null;
      const route = busRoutes[busId] || null;

      const res = await fetch(
        `${API}/api/buses/${busId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            driver,
            route
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update bus"
        );
      }

      setMessage(
        "Bus assignment updated successfully"
      );

      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading">
          Loading admin dashboard...
        </div>
      </div>
    );
  }

  if (error && buses.length === 0) {
    return (
      <div className="page">
        <div className="error">
          <h3>
            Unable to load admin dashboard
          </h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const activeBuses = buses.filter(
    bus => bus.status === "active"
  ).length;

  const assignedBuses = buses.filter(
    bus => bus.driver
  ).length;

  return (
    <div className="page">

      <div className="page-header">
        <p
          style={{
            color: "#2563eb",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "1px"
          }}
        >
          ADMIN DASHBOARD
        </p>

        <h1>
          TransitFlow Control Center
        </h1>

        <p>
          Manage buses, drivers, routes and
          stops from one place.
        </p>
      </div>

      {message && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "20px",
            borderRadius: "12px",
            background: "#ecfdf5",
            color: "#047857",
            fontWeight: "700"
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "20px",
            borderRadius: "12px",
            background: "#fef2f2",
            color: "#dc2626",
            fontWeight: "700"
          }}
        >
          {error}
        </div>
      )}

      <div className="grid grid-3">

        <div className="card">
          <div style={{ fontSize: "28px" }}>
            🚌
          </div>

          <p style={{ color: "#64748b" }}>
            Total Buses
          </p>

          <h2>{buses.length}</h2>

          <p style={{ color: "#10b981" }}>
            {activeBuses} active
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: "28px" }}>
            👨‍✈️
          </div>

          <p style={{ color: "#64748b" }}>
            Drivers
          </p>

          <h2>{drivers.length}</h2>

          <p style={{ color: "#64748b" }}>
            {assignedBuses} assigned
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: "28px" }}>
            🛣️
          </div>

          <p style={{ color: "#64748b" }}>
            Routes
          </p>

          <h2>{routes.length}</h2>

          <p style={{ color: "#64748b" }}>
            {stops.length} stops
          </p>
        </div>

      </div>

      <div
        className="card"
        style={{ marginTop: "25px" }}
      >

        <h2>Add New Bus</h2>

        <p
          style={{
            color: "#64748b",
            marginTop: "5px"
          }}
        >
          Add a new bus and assign a driver
          and route.
        </p>

        <form
          onSubmit={addBus}
          style={{
            display: "grid",
            gap: "15px",
            marginTop: "20px"
          }}
        >

          <input
            type="text"
            placeholder="Enter Bus Number"
            value={busNumber}
            onChange={e =>
              setBusNumber(e.target.value)
            }
          />

          <select
            value={selectedDriver}
            onChange={e =>
              setSelectedDriver(e.target.value)
            }
          >
            <option value="">
              Select Driver
            </option>

            {drivers.map(driver => (
              <option
                key={driver._id}
                value={driver._id}
              >
                {driver.name}
              </option>
            ))}
          </select>

          <select
            value={selectedRoute}
            onChange={e =>
              setSelectedRoute(e.target.value)
            }
          >
            <option value="">
              Select Route
            </option>

            {routes.map(route => (
              <option
                key={route._id}
                value={route._id}
              >
                {route.routeNumber} - {route.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
            style={{
              border: "none",
              cursor: "pointer"
            }}
          >
            {saving
              ? "Adding Bus..."
              : "Add Bus"}
          </button>

        </form>

      </div>

      <div
        className="card"
        style={{ marginTop: "25px" }}
      >

        <h2>Bus Management</h2>

        <p
          style={{
            color: "#64748b",
            marginTop: "5px"
          }}
        >
          Manage driver and route assignments.
        </p>

        <div
          style={{
            display: "grid",
            gap: "18px",
            marginTop: "20px"
          }}
        >

          {buses.length === 0 ? (
            <p>No buses available.</p>
          ) : (
            buses.map(bus => (
              <div
                key={bus._id}
                style={{
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  background: "#ffffff"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    flexWrap: "wrap"
                  }}
                >

                  <div>
                    <h3>
                      {bus.busNumber}
                    </h3>

                    <p
                      style={{
                        color: "#64748b",
                        marginTop: "5px"
                      }}
                    >
                      Current Driver:{" "}
                      {bus.driver
                        ? bus.driver.name
                        : "Not assigned"}
                    </p>

                    <p
                      style={{
                        color: "#64748b"
                      }}
                    >
                      Current Route:{" "}
                      {bus.route
                        ? `${bus.route.routeNumber} - ${bus.route.name}`
                        : "Not assigned"}
                    </p>
                  </div>

                  <span
                    className={`status ${
                      bus.status === "active"
                        ? "live"
                        : ""
                    }`}
                  >
                    {bus.status}
                  </span>

                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr 1fr auto",
                    gap: "12px",
                    marginTop: "18px"
                  }}
                >

                  <select
                    value={
                      busDrivers[bus._id] || ""
                    }
                    onChange={e =>
                      setBusDrivers(prev => ({
                        ...prev,
                        [bus._id]:
                          e.target.value
                      }))
                    }
                  >
                    <option value="">
                      No Driver
                    </option>

                    {drivers.map(driver => (
                      <option
                        key={driver._id}
                        value={driver._id}
                      >
                        {driver.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={
                      busRoutes[bus._id] || ""
                    }
                    onChange={e =>
                      setBusRoutes(prev => ({
                        ...prev,
                        [bus._id]:
                          e.target.value
                      }))
                    }
                  >
                    <option value="">
                      No Route
                    </option>

                    {routes.map(route => (
                      <option
                        key={route._id}
                        value={route._id}
                      >
                        {route.routeNumber} -{" "}
                        {route.name}
                      </option>
                    ))}
                  </select>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      updateBus(bus._id)
                    }
                  >
                    Save Changes
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

      <div
        className="grid grid-2"
        style={{ marginTop: "25px" }}
      >

        <div className="card">

          <h2>Drivers</h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "5px"
            }}
          >
            Registered drivers
          </p>

          <div style={{ marginTop: "20px" }}>

            {drivers.length === 0 ? (
              <p>No drivers available.</p>
            ) : (
              drivers.map(driver => {

                const assignedBus =
                  buses.find(
                    bus =>
                      bus.driver?._id ===
                      driver._id
                  );

                return (
                  <div
                    key={driver._id}
                    style={{
                      padding: "14px 0",
                      borderBottom:
                        "1px solid #e2e8f0"
                    }}
                  >

                    <strong>
                      {driver.name}
                    </strong>

                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "13px"
                      }}
                    >
                      {driver.email}
                    </p>

                    <p
                      style={{
                        color: assignedBus
                          ? "#10b981"
                          : "#f59e0b",
                        fontSize: "13px",
                        fontWeight: "700"
                      }}
                    >
                      {assignedBus
                        ? `Assigned to ${assignedBus.busNumber}`
                        : "No bus assigned"}
                    </p>

                  </div>
                );
              })
            )}

          </div>

        </div>

        <div className="card">

          <h2>Routes</h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "5px"
            }}
          >
            Available routes
          </p>

          <div style={{ marginTop: "20px" }}>

            {routes.length === 0 ? (
              <p>No routes available.</p>
            ) : (
              routes.map(route => (
                <div
                  key={route._id}
                  style={{
                    padding: "14px 0",
                    borderBottom:
                      "1px solid #e2e8f0"
                  }}
                >

                  <strong>
                    {route.routeNumber}
                  </strong>

                  <p style={{ marginTop: "5px" }}>
                    {route.name}
                  </p>

                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "13px"
                    }}
                  >
                    {route.startPoint} →{" "}
                    {route.endPoint}
                  </p>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

      <div
        className="card"
        style={{ marginTop: "25px" }}
      >

        <h2>Network Stops</h2>

        <p
          style={{
            color: "#64748b",
            marginTop: "5px"
          }}
        >
          Registered TransitFlow stops
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginTop: "20px"
          }}
        >

          {stops.length === 0 ? (
            <p>No stops available.</p>
          ) : (
            stops.map(stop => (
              <div
                key={stop._id}
                style={{
                  padding: "15px",
                  background: "#f8fafc",
                  borderRadius: "12px"
                }}
              >

                <strong>
                  {stop.name}
                </strong>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "12px",
                    marginTop: "5px"
                  }}
                >
                  {stop.stopCode}
                </p>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}
function About() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>
          About TransitFlow
        </h1>

        <p>
          TransitFlow is a real-time
          public transport tracking
          system for small cities.
        </p>
      </div>

      <div className="detail-card">
        <h2>
          Technology Stack
        </h2>

        <p>
          React, Vite, Node.js,
          Express.js, MongoDB,
          Socket.IO, Leaflet,
          OpenStreetMap and GPS.
        </p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/live"
          element={<Live />}
        />

        <Route
          path="/buses"
          element={<Buses />}
        />

        <Route
          path="/buses/:id"
          element={<BusDetails />}
        />

        <Route
          path="/routes"
          element={<RoutesPage />}
        />

        <Route
          path="/routes/:id"
          element={<RouteDetails />}
        />

        <Route
          path="/stops"
          element={<Stops />}
        />

        <Route
          path="/stops/:id"
          element={<StopDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
  path="/register"
  element={<Register />}
/>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/driver"
          element={
            <ProtectedRoute role="driver">
              <Driver />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
    </>
  );
}

export default App;