import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <p>123 Church Street</p>
                            <p>City, State 12345</p>
                            <p>Phone: (123) 456-7890</p>
                            <p>Email: info@church.com</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
                                <li><a href="/events" className="hover:text-gray-300">Events</a></li>
                                <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Service Times</h3>
                            <p>Sunday Service: 10:00 AM</p>
                            <p>Bible Study: Wednesday 7:00 PM</p>
                            <p>Youth Ministry: Friday 6:00 PM</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                        <p>&copy; {new Date().getFullYear()} Church Name. All rights reserved.</p>
                    </div>
                </div>
            </footer>
  )
}

export default Footer