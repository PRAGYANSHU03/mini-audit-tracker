import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Observation, Severity, Status } from "../types";
import { getObservations } from "../utils/storage";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
	Legend,
} from "recharts";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Add suffix for the day (e.g., 1st, 2nd, 3rd, etc.)
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';

  return `${day}${daySuffix} ${month} ${year}`;
};

const ObservationList = () => {
	const [observations, setObservations] = useState<Observation[]>([]);
	const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
	const [filterSeverity, setFilterSeverity] = useState<Severity | "All">("All");
	const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

	useEffect(() => {
		const loadObservations = () => {
			const data = getObservations();
			setObservations(data);
		};
		loadObservations();
	}, []);

	const filteredObservations = observations
		.filter((obs) => filterStatus === "All" || obs.status === filterStatus)
		.filter(
			(obs) => filterSeverity === "All" || obs.severity === filterSeverity
		)
		.sort((a, b) => {
			if (sortBy === "newest") {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			}
			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		});

	const statusCounts = observations.reduce(
		(acc, obs) => {
			acc[obs.status] = (acc[obs.status] || 0) + 1;
			return acc;
		},
		{} as Record<Status, number>
	);

	const chartData = Object.entries(statusCounts).map(([status, count]) => ({
		status,
		count,
	}));

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">Observations</h1>
			</div>

			{/* Filters Container */}
			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-lg font-semibold mb-4">Filters</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<h3 className="text-sm font-medium text-gray-700 mb-2">
							Filter by Status
						</h3>
						<select
							value={filterStatus}
							onChange={(e) =>
								setFilterStatus(e.target.value as Status | "All")
							}
							className="border bg-white rounded-md p-2 w-full"
						>
							<option value="All">All</option>
							<option value="Open">Open</option>
							<option value="In Progress">In Progress</option>
							<option value="Closed">Closed</option>
						</select>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-700 mb-2">
							Filter by Severity
						</h3>
						<select
							value={filterSeverity}
							onChange={(e) =>
								setFilterSeverity(e.target.value as Severity | "All")
							}
							className="border bg-white rounded-md p-2 w-full"
						>
							<option value="All">All</option>
							<option value="High">High</option>
							<option value="Medium">Medium</option>
							<option value="Low">Low</option>
						</select>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-700 mb-2">Sort by</h3>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
							className="border bg-white rounded-md p-2 w-full"
						>
							<option value="newest">Newest First</option>
							<option value="oldest">Oldest First</option>
						</select>
					</div>
				</div>
			</div>

			{/* Observations Table */}
			<div className="bg-white p-4 rounded-lg shadow">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-white">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Title
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Severity
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Assigned To
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Created
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredObservations.map((observation) => (
								<tr key={observation.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap">
										<Link
											to={`/observations/${observation.id}`}
											className="text-blue-600 hover:underline-offset-auto hover:underline"
										>
											{observation.title}
										</Link>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-4 inline-flex text-xs leading-6 font-semibold rounded-full ${
												observation.severity === "High"
													? "bg-red-100 text-red-800"
													: observation.severity === "Medium"
														? "bg-yellow-100 text-yellow-800"
														: "bg-green-100 text-green-800"
											}`}
										>
											{observation.severity}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-4 inline-flex text-xs leading-6 font-semibold rounded-full ${
												observation.status === "Closed"
													? "bg-green-100 text-green-800"
													: observation.status === "In Progress"
														? "bg-blue-100 text-blue-800"
														: "bg-gray-100 text-gray-800"
											}`}
										>
											{observation.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{observation.assignedTo}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(observation.createdAt)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Status Distribution Chart */}
			<div className="bg-white p-4 rounded-lg shadow">
				<h2 className="text-lg font-semibold mb-4">Status Distribution</h2>
				<div className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="status" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar
								dataKey="count"
								name="Observations"
								label={{ position: "top" }}
								isAnimationActive={false} // Disable hover animation
							>
								{chartData.map((entry, index) => {
									let fillColor;
									switch (entry.status) {
										case "Open":
											fillColor = "#9CA3AF"; // gray
											break;
										case "In Progress":
											fillColor = "#60A5FA"; // blue
											break;
										case "Closed":
											fillColor = "#34D399"; // green
											break;
										default:
											fillColor = "#E5E7EB"; // default gray
									}
									return <Cell key={`cell-${index}`} fill={fillColor} />;
								})}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default ObservationList;
