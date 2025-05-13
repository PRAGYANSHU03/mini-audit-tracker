import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
	return (
		<nav className="w-full bg-white shadow-lg">
			<div className="container mx-auto">
				<div className="flex justify-between h-16">
					<div className="flex">
						<Link to="/" className="flex items-center space-x-2">
							<img src={logo} alt="Logo" className="h-8 w-auto" />
							<span className="text-xl font-bold text-gray-800">
								Mini Audit Tracker
							</span>
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						<Link
							to="/observations"
							className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
						>
							Observations
						</Link>
						<Link
							to="/observations/new"
							className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
						>
							+ New Observation
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
