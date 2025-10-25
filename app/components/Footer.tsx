import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black mt-10 text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Useful Links */}
        <div>
          <h3 className="text-[14px] font-bold uppercase mb-4 tracking-wide">
            Useful Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Nigerian Food List</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Disclaimer</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Wholesale Directory</a></li>
          </ul>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-[14px] font-bold uppercase mb-4 tracking-wide">
            Payment Method
          </h3>
          <p className="text-gray-300 mb-3">
            Payment can be made via Paystack or by Direct bank transfer to this
            account:
          </p>
          <p className="text-gray-200 font-medium">
            FCMB BANK ACCOUNT <br />
            Dportas Nigeria Limited: <br />
            5747537010
          </p>
          <p className="text-gray-300 mt-3">
            For international payments; If payment is made through Paystack
            using an international card, an extra 4% of the total order must be
            included as payment for transaction cost.
          </p>
        </div>

        {/* Retail Orders */}
        <div>
          <h3 className="text-[14px] font-bold uppercase mb-4 tracking-wide">
            Retail Orders
          </h3>
          <ul className="text-gray-300 space-y-2 list-decimal list-inside">
            <li>
              Delivery time is between 1pm–7pm (Mon–Sat). Same-day deliveries
              may not be processed on Saturdays.
            </li>
            <li>
              Same-day delivery available if order is placed before 10am.
            </li>
            <li>
              Items not available on the website list can be included.
            </li>
            <li>
              Delivery cost starts from ₦2000 upwards (depending on location and
              weight).
            </li>
            <li>
              We deliver certain food items to the US, UK and Canada. Delivery
              cost for international orders differs from local rates. Average
              delivery time: 10–14 working days.
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-center md:text-left text-xs">
            © 2025 Online Food Market for Nigerians | The Market Food Shop. All
            rights reserved
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 text-white text-lg">
            <a href="#" className="bg-[#3b5998] p-2 rounded">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-2 rounded">
              <FaInstagram />
            </a>
            <a href="#" className="bg-green-600 p-2 rounded">
              <FaWhatsapp />
            </a>
            <a href="#" className="bg-blue-500 p-2 rounded">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;