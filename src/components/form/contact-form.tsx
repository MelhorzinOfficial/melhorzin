"use client";

import { CheckCircle, Send } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
			setFormState({ name: "", email: "", message: "" });

			// Reset success message after 5 seconds
			setTimeout(() => {
				setIsSubmitted(false);
			}, 5000);
		}, 1500);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="name" className="text-green-300">
					Name
				</Label>
				<Input
					id="name"
					name="name"
					value={formState.name}
					onChange={handleChange}
					placeholder="Your name"
					required
					className="mt-1 border-green-800/30 bg-black/40 text-white placeholder:text-gray-500 focus:border-green-500"
				/>
			</div>

			<div>
				<Label htmlFor="email" className="text-green-300">
					Email
				</Label>
				<Input
					id="email"
					name="email"
					type="email"
					value={formState.email}
					onChange={handleChange}
					placeholder="your.email@example.com"
					required
					className="mt-1 border-green-800/30 bg-black/40 text-white placeholder:text-gray-500 focus:border-green-500"
				/>
			</div>

			<div>
				<Label htmlFor="message" className="text-green-300">
					Message
				</Label>
				<Textarea
					id="message"
					name="message"
					value={formState.message}
					onChange={handleChange}
					placeholder="Your message..."
					required
					className="mt-1 min-h-[120px] border-green-800/30 bg-black/40 text-white placeholder:text-gray-500 focus:border-green-500"
				/>
			</div>

			<Button
				type="submit"
				disabled={isSubmitting || isSubmitted}
				className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
			>
				{isSubmitting ? (
					<span className="flex items-center">
						<svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <title>Loading...</title>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
								fill="none"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Sending...
					</span>
				) : isSubmitted ? (
					<span className="flex items-center">Message sent!</span>
				) : (
					<span className="flex items-center">
						Send Message <Send className="ml-2 h-4 w-4" />
					</span>
				)}
			</Button>

			{isSubmitted && (
				<div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
					<div className="rounded-lg bg-green-100 p-6 shadow-lg dark:bg-green-900">
						<CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500 dark:text-green-400" />
						<h3 className="mb-2 text-center text-xl font-bold">
							Mensagem Enviada!
						</h3>
						<p className="text-center">
							Obrigado por entrar em contato. Retornarei em breve pelo email
							fornecido.
						</p>
						<p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
							Se preferir, você também pode me contatar diretamente em{" "}
							<a
								href="mailto:gabriel.henrique7@hotmail.com"
								className="font-medium text-green-600 hover:underline dark:text-green-400"
							>
								gabriel.henrique7@hotmail.com
							</a>
						</p>
					</div>
				</div>
			)}
		</form>
	);
}
