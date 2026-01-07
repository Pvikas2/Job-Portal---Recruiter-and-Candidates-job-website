
import "./MaintenanceBanner.css";

const MaintenanceBanner = () => {
  return (
    <div className="maintenance-wrapper">
      <div className="maintenance-marquee">
        <span>
          ⚠️ This website is currently in maintenance mode. Backend services are
          not connected. To access full functionality, please connect the backend
          and run the project locally.  Please click on the link for more information.  ⚠️
        </span>
        <span>
          ⚠️ This website is currently in maintenance mode. Backend services are
          not connected. To access full functionality, please connect the backend
          and run the project locally.  Please click on the link for more information. ⚠️
        </span>
      </div>
      <a
        className="maintenance-btn"
        href="https://github.com/Pvikas2/Job-Portal---Recruiter-and-Candidates-job-website"
        target="_blank"
      >
        View Project on GitHub
      </a>    
    </div>
  );
};

export default MaintenanceBanner;
