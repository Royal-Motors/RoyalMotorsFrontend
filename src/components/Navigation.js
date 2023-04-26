import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import AppSignIn from '../pages/sign-in'; 

const Navigation = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignUpClick = () => {
    setShowSignUpDialog(true);
  };

  return (
    <div>
      <nav id="nav">
        <img className="Logo" src={process.env.PUBLIC_URL + 'Logos/LOGO.png'} alt="logo" />
        <a href="HomePage" style={{ textDecoration: 'none' }}>
          Home Page
        </a>
        <a href="CompareCars" style={{ textDecoration: 'none' }}>
          Compare Cars
        </a>
        <img className="icon" src="Logos/contact us.png" alt="" />
        <Dropdown show={showDropdown}>
          <div className="dropdown-container">
            <img
              className="icon"
              src={process.env.PUBLIC_URL + 'Logos/user.png'}
              alt="logo"
              onClick={handleProfileClick}
            />
            {showDropdown && <AppSignIn /> &&
              <Dropdown.Menu >
                <div className="dropdown-buttons">
                  <Dropdown.Item href="#" onClick={handleSignUpClick}>
                    Sign up
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    Sign in
                  </Dropdown.Item>
                </div>
              </Dropdown.Menu>
            }
          </div>
        </Dropdown>
      </nav>
    </div>
  );
};

export default Navigation;
