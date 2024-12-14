import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const createCustomIcon = (color) =>
    new L.Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`<?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="32" height="32">
            <path fill="${color}" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
        </svg>`)}`,
        iconSize: [26, 26],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

const RobotMap = ({ robots }) => (
    <>
        <div className="header">
            <h2>Robots Activity Status Monitor Map</h2>
            <div className="legend">
                <span style={{ backgroundColor: "green", padding: "0 10px" }}></span> Online<br />
                <span style={{ backgroundColor: "red", padding: "0 10px" }}></span> Offline<br />
                <span style={{ backgroundColor: "lightcoral", padding: "0 10px" }}></span> Low Battery<br />
                <span style={{ backgroundColor: "lightgreen", padding: "0 10px" }}></span> Full Battery<br />
            </div>
        </div>

        <MapContainer center={[0, 0]} zoom={2.5} style={{ height: "60rem", width: "90%", borderRadius: "1rem", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {robots.map((robot) => {
                const color = robot["Online/Offline"] ? "green" : "red";
                const popColor = robot["Battery Percentage"] < 20 ? "lightcoral" : "lightgreen";

                return (
                    <Marker
                        key={robot["Robot ID"]}
                        position={robot["Location Coordinates"]}
                        icon={createCustomIcon(color)}
                    >
                        <Popup>
                            <div
                                style={{
                                    backgroundColor: popColor,
                                    padding: "1rem",
                                    borderRadius: "10px"
                                }}
                            >
                                <b>Robot ID:</b> {robot["Robot ID"]} <br />
                                <b>Status:</b> {robot["Online/Offline"] ? "Online" : "Offline"} <br />
                                <b>Battery:</b> {robot["Battery Percentage"]}% <br />
                                <b>Last Updated:</b> {robot["Last Updated"]} <br />
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    </>
);

export default RobotMap;
