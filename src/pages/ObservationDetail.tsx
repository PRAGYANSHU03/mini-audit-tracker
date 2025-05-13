import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Observation, Status, Severity } from "../types";
import { getObservationById, saveObservation } from "../utils/storage";
import { useForm } from "react-hook-form";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

const ObservationDetail = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [observation, setObservation] = useState<Observation | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [preview, setPreview] = useState<string | null>(null);

	const form = useForm<Partial<Observation>>({
		defaultValues: {
			title: "",
			description: "",
			severity: "Medium",
			status: "Open",
			assignedTo: "",
		},
	});

	useEffect(() => {
		if (id) {
			const obs = getObservationById(id);
			if (obs) {
				setObservation(obs);
				form.reset(obs);
				setPreview(obs.evidence || null);
			} else {
				navigate("/observations");
			}
		}
	}, [id, navigate, form]);

	const handleStatusChange = (newStatus: Status) => {
		if (observation) {
			const updatedObservation = {
				...observation,
				status: newStatus,
				updatedAt: new Date().toISOString(),
			};
			saveObservation(updatedObservation);
			setObservation(updatedObservation);
			form.reset(updatedObservation);
		}
	};

	const onSubmit = (data: Partial<Observation>) => {
		if (observation) {
			const updatedObservation = {
				...observation,
				...data,
				updatedAt: new Date().toISOString(),
			};
			saveObservation(updatedObservation);
			setObservation(updatedObservation);
			setIsEditing(false);
		}
	};

	if (!observation) {
		return <div>Loading...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">
					Observation Details
				</h1>
				<div className="space-x-4">
					<Button variant="outline" onClick={() => navigate("/observations")}>
						Back to List
					</Button>
					{!isEditing ? (
						<Button onClick={() => setIsEditing(true)}>Edit</Button>
					) : (
						<Button variant="default" onClick={form.handleSubmit(onSubmit)}>
							Save Changes
						</Button>
					)}
				</div>
			</div>

			<div className="bg-white shadow rounded-lg overflow-hidden">
				<div className="p-6 space-y-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											{isEditing ? (
												<Input {...field} />
											) : (
												<p className="mt-1 text-lg">{observation.title}</p>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											{isEditing ? (
												<Textarea {...field} />
											) : (
												<p className="mt-1 whitespace-pre-wrap">
													{observation.description}
												</p>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="severity"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Severity</FormLabel>
											<FormControl>
												{isEditing ? (
													<Select
														onValueChange={field.onChange}
														value={field.value}
													>
														<SelectTrigger>
															<SelectValue placeholder="Select severity" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="High">High</SelectItem>
															<SelectItem value="Medium">Medium</SelectItem>
															<SelectItem value="Low">Low</SelectItem>
														</SelectContent>
													</Select>
												) : (
													<div className="mt-1 space-x-2">
														<span
															className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${
																observation.severity === "High"
																	? "bg-red-100 text-red-800"
																	: observation.severity === "Medium"
																		? "bg-yellow-100 text-yellow-800"
																		: "bg-green-100 text-green-800"
															}`}
														>
															{observation.severity}
														</span>
													</div>
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<FormControl>
												{isEditing ? (
													<Select
														onValueChange={field.onChange}
														value={field.value}
													>
														<SelectTrigger>
															<SelectValue placeholder="Select status" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="Open">Open</SelectItem>
															<SelectItem value="In Progress">
																In Progress
															</SelectItem>
															<SelectItem value="Closed">Closed</SelectItem>
														</SelectContent>
													</Select>
												) : (
													<div className="mt-1 space-x-2">
														<span
															className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${
																observation.status === "Closed"
																	? "bg-green-100 text-green-800"
																	: observation.status === "In Progress"
																		? "bg-blue-100 text-blue-800"
																		: "bg-gray-100 text-gray-800"
															}`}
														>
															{observation.status}
														</span>
													</div>
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="assignedTo"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Assigned To</FormLabel>
											<FormControl>
												{isEditing ? (
													<Input {...field} />
												) : (
													<p className="mt-1">{observation.assignedTo}</p>
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div>
									<FormLabel>Created</FormLabel>
									<p className="mt-1">
										{new Date(observation.createdAt).toLocaleString()}
									</p>
								</div>
							</div>

							{observation.evidence && (
								<div>
									<FormLabel>Supporting Evidence</FormLabel>
									<div className="mt-2">
										<img
											src={observation.evidence}
											alt="Evidence"
											className="max-w-lg rounded-lg shadow"
										/>
										<p className="mt-1 text-sm text-gray-500">
											{observation.evidenceName}
										</p>
									</div>
								</div>
							)}

							{!isEditing && (
								<div className="pt-4 border-t">
									<div className="grid grid-cols-2 gap-6">
										<div>
											<FormLabel>Change Status</FormLabel>
											<div className="mt-2">
												<Select
													value={observation.status}
													onValueChange={(value: Status) =>
														handleStatusChange(value)
													}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select status" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="Open">Open</SelectItem>
														<SelectItem value="In Progress">
															In Progress
														</SelectItem>
														<SelectItem value="Closed">Closed</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>

										<div>
											<FormLabel>Change Severity</FormLabel>
											<div className="mt-2">
												<Select
													value={observation.severity}
													onValueChange={(value: Severity) => {
														const updatedObservation = {
															...observation,
															severity: value,
															updatedAt: new Date().toISOString(),
														};
														saveObservation(updatedObservation);
														setObservation(updatedObservation);
														form.reset(updatedObservation);
													}}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select severity" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="High">High</SelectItem>
														<SelectItem value="Medium">Medium</SelectItem>
														<SelectItem value="Low">Low</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
									</div>
								</div>
							)}
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default ObservationDetail;
