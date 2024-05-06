import React from 'react';
import "../assets/css/footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-footer-2">
                        <h5>About Us</h5>
                        <p>We are a passionate team dedicated to providing the best music experience for our users. Our mission is to curate the finest playlists that cater to all tastes and moods. Join us on our musical journey and discover the perfect soundtrack for every moment.</p>
                    </div>
                    <div className="col-footer-2">
                        <h5>Contact Us</h5>
                        <ul>
                            <li>Address: 123 Shebchenka, Lviv, Ukrain</li>
                            <li>Phone: +1 234 567890</li>
                            <li>Email: playst@playst.corp.com</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-footer">
                        <hr />
                        <p className="text-center">© 2024 company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;