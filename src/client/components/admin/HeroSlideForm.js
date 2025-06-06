import React from 'react';
import { useForm } from 'react-hook-form';

export default function HeroSlideForm({ onSubmit, initialData = null }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {}
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    Image URL
                </label>
                <input
                    type="text"
                    {...register('imageUrl', { required: 'Image URL is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.imageUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Link (Optional)
                </label>
                <input
                    type="text"
                    {...register('link')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Order
                </label>
                <input
                    type="number"
                    {...register('order', { required: 'Order is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.order && (
                    <p className="mt-1 text-sm text-red-600">{errors.order.message}</p>
                )}
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    {...register('active')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-900">
                    Active
                </label>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {initialData ? 'Update Slide' : 'Create Slide'}
                </button>
            </div>
        </form>
    );
}
