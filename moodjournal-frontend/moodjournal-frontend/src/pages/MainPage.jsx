import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.css"; // Import the CSS file here

const MainPage = () => {
  return (
    <div className="mainpage-container">
      <header className="mainpage-header">
        <img
          src="/public/MoodMirror_Logo-removebg-preview.png"
          alt="MoodMirror Logo"
          className="mainpage-logo"
        />
        <h1 className="mainpage-title">MoodMirror</h1>
      </header>


      <div className="button-group">
        <Link to="/register" className="btn btn-signup">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-login">
          Login
        </Link>
      </div>

      <section className="hero-section">
        <div className="hero-text">
          <h2>
            Track Your <span className="highlight-pink">Emotions</span>, Improve
            Your <span className="highlight-purple">Wellbeing</span>
          </h2>
          <p>
            A beautiful, intuitive way to record your daily moods, understand
            your patterns, and reflect on your emotional journey.
          </p>
          <Link to="/register" className="btn btn-start">
            Capture Today’s Feelings
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://illustrations.popsy.co/pink/digital-nomad.svg"
            alt="Journal illustration"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>
          Why Choose <span className="highlight-pink">Mood Mirror</span>?
        </h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Daily Entries</h3>
            <p>
              Quick and intuitive mood tracking with customizable tags and
              notes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>
              Beautiful charts and insights to visualize your emotional
              patterns.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Bank-Level Security</h3>
            <p>
              End-to-end encryption ensures your private thoughts stay private.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="additional-features">
        <div className="features-content">
          <img
            src="https://illustrations.popsy.co/pink/designer.svg"
            alt="Mood tracking"
          />
          <div>
            <h2>
              <span className="highlight-pink">Advanced</span> Mood Tracking
            </h2>
            <ul>
              <li>Custom mood scales and emotional descriptors</li>
              <li>Mood Prompts & Daily Reflections</li>
              <li>Daily mood reports with actionable insights</li>
              <li>Export your data anytime</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>
          Loved by <span className="highlight-pink">Thousands</span> Worldwide
        </h2>

        <div className="testimonials-grid">
          {[
            {
              quote:
                "Mood Journal helped me understand my emotional patterns better than any therapist ever could!",
              author: "Sarah, 28",
              role: "Graphic Designer",
            },
            {
              quote:
                "I've been using this for 3 months and it's completely changed how I approach my mental health.",
              author: "James, 34",
              role: "Software Engineer",
            },
            {
              quote:
                "As a therapist, I recommend Mood Journal to all my clients. The insights are incredibly valuable.",
              author: "Dr. Rodriguez, 42",
              role: "Clinical Psychologist",
            },
          ].map((testimonial, i) => (
            <div className="testimonial-card" key={i}>
              <div className="quote-mark">“</div>
              <p className="quote">{testimonial.quote}</p>
              <p className="author">{testimonial.author}</p>
              <p className="role">{testimonial.role}</p>
            </div>
          ))}
          <footer className="footer-copy">
            <div className="footer-content">
              © 2025 Mood Journal. All rights reserved.
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
