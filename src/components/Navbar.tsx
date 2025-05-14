import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { LucideArrowUpRight, PlusIcon } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="fixed top-0 left-0 w-full bg-white rounded-b-lg shadow-lg z-50">
			<div className="container mx-auto">
				<div className="flex justify-between h-16 px-4">
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
							className="flex items-center text-blue-600 px-3 py-2 rounded-md text-sm font-medium border border-blue-600 hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out"
						>
							<LucideArrowUpRight className="w-4 h-4 mr-2" />
							Observations
						</Link>
						<Link
							to="/observations/new"
							className="flex items-center text-blue-600 px-3 py-2 rounded-md text-sm font-medium border border-blue-600 hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out"
						>	
							<PlusIcon className="w-4 h-4 mr-2" />
							New Observation
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
