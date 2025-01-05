import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState(''); // Added userEmail state
  const [userRole, setUserRole] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    setUserEmail('');
    setIsModalVisible(false); // Close modal after logout
    window.location.href = '/login';
  };


  const handleUserClick = () => {
    setIsModalVisible(true); // Open the modal on user click
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('authToken');
    if (isLoggedIn) {
      setIsLoggedIn(true);
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUserName(userData?.name);
      setUserEmail(userData?.email); // Set user email
      setUserRole(userData?.role);
    }
  }, [isLoggedIn]);

  return (
    <nav className="bg-black text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">My Shop</a>

        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-blue-300">Home</a>
          {
            !isLoggedIn ? (
              <a href="/login" className="hover:text-blue-300">Login</a>
            ) : (
              <>
                {userRole === 'admin' && (
                  <>
                    <a href="/createProduct" className="hover:text-blue-300">Create Product</a>
                    <a href="/createSeller" className="hover:text-blue-300">Create Seller</a>
                    <a href="/sellerListing" className="hover:text-blue-300">View Seller Listings</a>
                    <a href="/buyerListing" className="hover:text-blue-300">Buyer Listings</a>
                  </>
                )}
                {userRole === 'seller' && (
                  <a href="/createProduct" className="hover:text-blue-300">Add Product</a>
                )}
                <span
                  onClick={handleUserClick}
                  className="hover:text-blue-300 rounded cursor-pointer"
                >
                  {userName.charAt(0).toUpperCase()+userName.slice(1)}
                </span>
              </>
            )
          }
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 bg-blue-500 text-white rounded-lg ${isMenuOpen ? '' : 'hidden'}`}
      >
        <a href="#" className="block px-4 py-2 hover:bg-blue-700">Home</a>
        
        {userRole === 'admin' && (
          <>
            <a href="/createProduct" className="block px-4 py-2 hover:bg-blue-700">Create Product</a>
            <a href="/sellerListing" className="block px-4 py-2 hover:bg-blue-700">View Seller Listings</a>
          </>
        )}
        {userRole === 'seller' && (
          <a href="/createProduct" className="block px-4 py-2 hover:bg-blue-700">Add Product</a>
        )}
      </div>

      {/* Modal for User Info */}
      <Modal
        title="User Information"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="logout" onClick={handleLogout} danger>
            Logout
          </Button>,
        ]}
      >
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {userEmail}</p>
        <p><strong>Role:</strong> {userRole}</p>
      </Modal>
    </nav>
  );
};

export default Navbar;