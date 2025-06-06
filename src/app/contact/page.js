'use client';

import { useForm } from 'react-hook-form';

export default function Contact() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
            
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-6">
                        We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.
                    </p>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Address</h3>
                            <p className="text-gray-600">123 Church Street</p>
                            <p className="text-gray-600">City, State 12345</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-medium mb-2">Phone</h3>
                            <p className="text-gray-600">(123) 456-7890</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-medium mb-2">Email</h3>
                            <p className="text-gray-600">info@church.com</p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <input
                                type="text"
                                {...register('subject', { required: 'Subject is required' })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.subject && (
                                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                {...register('message', { required: 'Message is required' })}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.message && (
                                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
