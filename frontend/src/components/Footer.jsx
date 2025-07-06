import React from 'react';

const Footer = () => (
  <footer className="bg-gray-100 border-t mt-10 py-4">
    <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} WishlistApp. All rights reserved.
    </div>
  </footer>
);

export default Footer;