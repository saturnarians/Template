'use client';

import { useForm } from 'react-hook-form';

export default function EventForm({ onSubmit, initialData = null }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {}
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Date
                </label>
                <input
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Time
                </label>
                <input
                    type="time"
                    {...register('time', { required: 'Time is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Location
                </label>
                <input
                    type="text"
                    {...register('location', { required: 'Location is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Image URL (Optional)
                </label>
                <input
                    type="text"
                    {...register('imageUrl')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {initialData ? 'Update Event' : 'Create Event'}
                </button>
            </div>
        </form>
    );
}
