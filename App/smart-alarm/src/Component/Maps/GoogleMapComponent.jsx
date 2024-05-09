import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GoogleMapComponent = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Google Map</h5>
              <div style={{ height: '400px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.646661223542!2d-122.08542698591124!3d37.42241817980867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580f4f2d0919b%3A0x4a501367f076adff!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1620659998469!5m2!1sen!2sus"
                  allowFullScreen
                  style={{ width: '100%', height: '100%' }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
