import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Events.css"; // new css file for glow effect

export default function Events() {
  const [events, setEvents] = useState([]);
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await axios.get(`${API_URL}/api/events`);
      setEvents(res.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  }

  const today = new Date();

  const upcoming = events.filter((e) => new Date(e.date) >= today);
  const past = events.filter((e) => new Date(e.date) < today);

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  return (
    <div className="container py-5 text-light">
      <h1 className="mb-4">Events</h1>
      <p className="lead">
        Get to know about our upcoming and past events. Stay updated with our latest events, workshops, and webinars. Join us
        to explore the world of AI and technology! 
        Whether you're looking to attend an event or just browse through our past activities, you'll find all the information here.
      </p>
      <hr className="mb-4" />

      {/* Upcoming Events */}
      <section className="mb-5">
        <h2 className="mb-3 text-warning">Upcoming Events</h2>
        <div className="row">
          {upcoming.length === 0 ? (
            <p>No upcoming events.</p>
          ) : (
            upcoming.map((event) => (
              <div key={event._id} className="col-md-4 mb-4">
                <div className="card upcoming-card h-100">
                  {event.coverImage && (
                    <img
                      src={`${API_URL}/uploads/events/${event.coverImage}`}
                      alt={event.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body text-light">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">
                      📅 {formatDate(event.date)} <br />
                      📍 {event.venue}
                    </p>
                    <p className="small text">"{event.description}"</p>
                    <Link
                      to={`/events/${event._id}`}
                      className="btn btn-outline-light"
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <hr className="my-4" />
      
      {/* Past Events */}
      <section>
        <h2 className="mb-3 text-light">Past Events</h2>
        <div className="row">
          {past.length === 0 ? (
            <p>No past events.</p>
          ) : (
            past.map((event) => (
              <div key={event._id} className="col-md-3 mb-3">
                <div className="card bg-dark text-light shadow h-100 border-secondary">
                  {event.coverImage && (
                    <img
                      src={`${API_URL}/uploads/events/${event.coverImage}`}
                      alt={event.title}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h6 className="card-title">{event.title}</h6>
                    <p className="card-text">
                      📅 {formatDate(event.date)} <br />
                      📍 {event.venue}
                    </p>
                    <Link
                      to={`/events/${event._id}`}
                      className="btn btn-sm btn-outline-light"
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
