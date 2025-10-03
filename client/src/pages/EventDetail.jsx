import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchEvent();
  }, []);

  async function fetchEvent() {
    try {
      const res = await axios.get(`${API_URL}/api/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error("Error fetching event:", err);
    }
  }

  if (!event) return <p className="text-light">Loading event...</p>;

  return (
    <div className="container py-5 text-light">
      <h1 className="mb-3">{event.title}</h1>
      {event.coverImage && (
        <img
          src={`${API_URL}/uploads/events/${event.coverImage}`}
          alt={event.title}
          className="img-fluid mb-3 rounded shadow"
        />
      )}

      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Venue:</strong> {event.venue}
      </p>
      <p>{event.details}</p>

      <h3 className="mt-4">Gallery</h3>
      <div className="row">
        {event.images && event.images.length > 0 ? (
          event.images.map((img, i) => (
            <div key={i} className="col-md-3 mb-3">
              <a href={`/gallery`} >
                <img
                  src={`${API_URL}/uploads/events/${img}`}
                  alt="gallery"
                  className="img-fluid rounded shadow"
                />
              </a>
            </div>
          ))
        ) : (
          <p>No gallery images yet.</p>
        )}
      </div>
    </div>
  );
}
