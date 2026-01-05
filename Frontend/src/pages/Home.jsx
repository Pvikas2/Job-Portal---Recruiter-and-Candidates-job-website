// import { Link } from "react-router-dom";
// import "./Home.css";

// const Home = () => {
//   return (
//     <div className="home-container">
//       <h1>Find Your Dream Job</h1>
//       <p>
//         Apply to jobs, upload resumes, and track your applications with ease.
//       </p>

//       <Link to="/jobs" className="home-btn">
//         Browse Jobs
//       </Link>
//     </div>
//   );
// };

// export default Home;


import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1>Find Your Dream Job with HireFlow</h1>
        <p>
          Apply to top companies, upload resumes, and track applications — all
          in one place.
        </p>

        <div className="hero-actions">
          <Link to="/jobs" className="primary-btn">
            Browse Jobs
          </Link>
          <Link to="/register" className="secondary-btn">
            Get Started
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stat-card">
          <h2>10K+</h2>
          <p>Jobs Posted</p>
        </div>
        <div className="stat-card">
          <h2>5K+</h2>
          <p>Companies</p>
        </div>
        <div className="stat-card">
          <h2>50K+</h2>
          <p>Candidates</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2>Why Choose HireFlow?</h2>
        <div className="features-grid">
          <div className="feature-card">📄 Resume Upload & Tracking</div>
          <div className="feature-card">🧑‍💼 Recruiter Dashboard</div>
          <div className="feature-card">⚡ Fast Job Applications</div>
          <div className="feature-card">🔒 Secure Authentication</div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <h2>Popular Job Categories</h2>
        <div className="category-list">
          <span>IT & Software</span>
          <span>Data Science</span>
          <span>Marketing</span>
          <span>Finance</span>
          <span>HR</span>
          <span>Design</span>
        </div>
      </section>

      {/* MOTIVATION */}
      <section className="quote-section">
        <h2>“Choose a job you love, and you will never have to work a day.”</h2>
        <p>— Confucius</p>
      </section>

      {/* PLANS */}
      <section className="plans-section">
        <h2>Plans for Everyone</h2>

        <div className="plans-grid">
          <div className="plan-card">
            <h3>Free</h3>
            <p>Apply to jobs</p>
            <p>Upload resume</p>
            <p className="price">₹0</p>
          </div>

          <div className="plan-card popular">
            <h3>Pro</h3>
            <p>Priority applications</p>
            <p>Profile visibility</p>
            <p className="price">₹499/month</p>
          </div>

          <div className="plan-card">
            <h3>Recruiter</h3>
            <p>Post jobs</p>
            <p>Manage applicants</p>
            <p className="price">₹999/month</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section">
        <h2>Start Your Career Journey Today</h2>
        <Link to="/register" className="primary-btn">
          Join HireFlow Now
        </Link>
      </section>

    </div>
  );
};

export default Home;
