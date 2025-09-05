import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { EventItem } from '../../contexts/DataContext';
import { uploadToCloudinary } from '../../services/cloudinaryService';

export default function EventManagement() {
  const { events, addEvent, updateEvent, deleteEvent, loading: dataLoading, error: dataError } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    image: '',
    completed: false,
    featured: false,
    isFVAEvent: true, // Default to true since this is FVA admin panel
    status: 'Upcoming' as 'Upcoming' | 'Ongoing' | 'Completed',
    link: '',
    venue: '',
    registrationDeadline: '',
    registrationRegularFee: '',
    registrationLateFee: '',
    awardsNote: '',
    categories: [] as Array<{
      title: string;
      distance?: string;
      ageRange?: string;
      genders?: string;
      prizes?: [string, string, string];
      notes?: string;
    }>
  });

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      location: '',
      description: '',
      image: '',
      completed: false,
      featured: false,
      isFVAEvent: true, // Default to true since this is FVA admin panel
      status: 'Upcoming' as 'Upcoming' | 'Ongoing' | 'Completed',
      link: '',
      venue: '',
      registrationDeadline: '',
      registrationRegularFee: '',
      registrationLateFee: '',
      awardsNote: '',
      categories: []
    });
    setEditingEvent(null);
    setIsFormOpen(false);
    setImageFile(null);
    setImageUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      let imageUrl = formData.image;

      // If no image provided at all, use a placeholder
      if (!imageFile && !formData.image) {
        imageUrl = 'https://via.placeholder.com/400x300/0066cc/ffffff?text=Event+Image';
        console.log('No image provided, using placeholder');
      }

      // Upload image if a file was selected
      if (imageFile) {
        console.log('Starting Cloudinary upload for file:', imageFile.name);
        setImageUploading(true);
        try {
          imageUrl = await uploadToCloudinary(imageFile, 'events');
          console.log('Image uploaded successfully to Cloudinary:', imageUrl);
          setImageUploading(false);
        } catch (uploadError: any) {
          console.error('Cloudinary upload failed:', uploadError);
          setImageUploading(false);

          // Automatically fall back to URL or placeholder
          if (formData.image) {
            console.log('Falling back to provided URL');
            imageUrl = formData.image;
          } else {
            console.log('Using placeholder image due to upload failure');
            imageUrl = 'https://via.placeholder.com/400x300/cc6600/ffffff?text=Upload+Failed';
          }

          setFormError(`Image upload failed, using ${formData.image ? 'provided URL' : 'placeholder'} instead. Error: ${uploadError.message}`);
        }
      }

      const eventData = {
        name: formData.name,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        image: imageUrl,
        completed: formData.completed,
        featured: formData.featured,
        isFVAEvent: formData.isFVAEvent,
        status: formData.status,
        link: formData.link,
        venue: formData.venue,
        registration: {
          deadline: formData.registrationDeadline,
          regularFee: formData.registrationRegularFee,
          lateFee: formData.registrationLateFee,
        },
        awardsNote: formData.awardsNote,
        categories: formData.categories
      };

      console.log('Saving event data:', eventData);

      if (editingEvent) {
        await updateEvent(editingEvent.slug, eventData);
      } else {
        await addEvent(eventData);
      }
      resetForm();
    } catch (error: any) {
      console.error('Form submission error:', error);
      setFormError(error.message || 'An error occurred while saving the event');
      setImageUploading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setFormError('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormError('Image size must be less than 5MB');
        return;
      }

      setImageFile(file);
      setFormData({ ...formData, image: '' }); // Clear URL when file is selected
      setFormError(null);
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleEdit = (event: EventItem) => {
    setFormData({
      name: event.name,
      date: event.date,
      location: event.location,
      description: event.description,
      image: event.image,
      completed: event.completed || false,
      featured: event.featured || false,
      isFVAEvent: event.isFVAEvent ?? true, // Default to true if not set
      status: event.status || 'Upcoming',
      link: event.link || '',
      venue: event.venue || '',
      registrationDeadline: event.registration?.deadline || '',
      registrationRegularFee: event.registration?.regularFee || '',
      registrationLateFee: event.registration?.lateFee || '',
      awardsNote: event.awardsNote || '',
      categories: event.categories || []
    });
    setEditingEvent(event);
    setIsFormOpen(true);
    setImageFile(null);
    setImageUploading(false);
  };

  const addCategory = () => {
    setFormData({
      ...formData,
      categories: [...formData.categories, { title: '', distance: '', genders: '', prizes: ['', '', ''], notes: '' }]
    });
  };

  const removeCategory = (index: number) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((_, i) => i !== index)
    });
  };

  const updateCategory = (index: number, field: string, value: string | [string, string, string]) => {
    const updatedCategories = formData.categories.map((cat, i) =>
      i === index ? { ...cat, [field]: value } : cat
    );
    setFormData({ ...formData, categories: updatedCategories });
  };

  const handleDelete = async (slug: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        setFormError(null);
        await deleteEvent(slug);
      } catch (error: any) {
        setFormError(error.message || 'An error occurred while deleting the event');
      }
    }
  };



  const toggleCompleted = async (event: EventItem) => {
    try {
      setFormError(null);
      await updateEvent(event.slug, { completed: !event.completed });
    } catch (error: any) {
      setFormError(error.message || 'An error occurred while updating event status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Events</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
        >
          Add Event
        </button>
      </div>

      {/* Loading state */}
      {dataLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error state */}
      {dataError && (
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">Error loading events</div>
          <p className="text-gray-600">{dataError}</p>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingEvent ? 'Edit Event' : 'Add Event'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Event Info */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Basic Information</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="text"
                      placeholder="e.g., Friday 17. Oct. 2025"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Upcoming' | 'Ongoing' | 'Completed' })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Venue (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., Arena Geisingen - Indoor Speed Skating Track"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Registration Link (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="flex items-center space-x-4 pt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isFVAEvent}
                        onChange={(e) => setFormData({ ...formData, isFVAEvent: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">FVA Event (Show Register Button)</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured Event</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.completed}
                        onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Completed</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Event Image */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Event Image</h4>

                {/* File Upload Option */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="event-image-upload"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('event-image-upload')?.click()}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md border border-blue-200 transition-colors"
                      >
                        Choose File
                      </button>
                      <span className="ml-3 text-sm text-gray-500">
                        {imageFile ? imageFile.name : 'No file selected'}
                      </span>
                    </span>
                  </label>

                  {imageFile && (
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-sm text-green-600">Selected: {imageFile.name}</span>
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-sm text-gray-500">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* URL Input Option */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      if (e.target.value) {
                        setImageFile(null); // Clear file when URL is entered
                      }
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={!!imageFile}
                  />
                </div>

                {/* Preview */}
                {(imageFile || formData.image) && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                    <div className="w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
                      {imageFile ? (
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Event preview"
                          className="w-full h-full object-cover"
                        />
                      ) : formData.image ? (
                        <img
                          src={formData.image}
                          alt="Event preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Registration (Optional)</h4>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                    <input
                      type="text"
                      placeholder="e.g., October 10, 2025"
                      value={formData.registrationDeadline}
                      onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Regular Fee</label>
                    <input
                      type="text"
                      placeholder="e.g., 15,000 Rwf"
                      value={formData.registrationRegularFee}
                      onChange={(e) => setFormData({ ...formData, registrationRegularFee: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Late Fee</label>
                    <input
                      type="text"
                      placeholder="e.g., 20,000 Rwf"
                      value={formData.registrationLateFee}
                      onChange={(e) => setFormData({ ...formData, registrationLateFee: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Competition Categories */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Competition Categories (Optional)</h4>
                  <button
                    type="button"
                    onClick={addCategory}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Add Category
                  </button>
                </div>

                {formData.categories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-gray-800">Category {index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeCategory(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          placeholder="e.g., Senior men 19+"
                          value={category.title}
                          onChange={(e) => updateCategory(index, 'title', e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Distance</label>
                        <input
                          type="text"
                          placeholder="e.g., 42km full marathon"
                          value={category.distance}
                          onChange={(e) => updateCategory(index, 'distance', e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Genders</label>
                        <input
                          type="text"
                          placeholder="e.g., For both genders"
                          value={category.genders}
                          onChange={(e) => updateCategory(index, 'genders', e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <input
                          type="text"
                          placeholder="e.g., Each category competing separately"
                          value={category.notes}
                          onChange={(e) => updateCategory(index, 'notes', e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prize Money (1st, 2nd, 3rd)</label>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="1st place"
                          value={category.prizes?.[0] || ''}
                          onChange={(e) => {
                            const newPrizes: [string, string, string] = [
                              e.target.value,
                              category.prizes?.[1] || '',
                              category.prizes?.[2] || ''
                            ];
                            updateCategory(index, 'prizes', newPrizes);
                          }}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <input
                          type="text"
                          placeholder="2nd place"
                          value={category.prizes?.[1] || ''}
                          onChange={(e) => {
                            const newPrizes: [string, string, string] = [
                              category.prizes?.[0] || '',
                              e.target.value,
                              category.prizes?.[2] || ''
                            ];
                            updateCategory(index, 'prizes', newPrizes);
                          }}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <input
                          type="text"
                          placeholder="3rd place"
                          value={category.prizes?.[2] || ''}
                          onChange={(e) => {
                            const newPrizes: [string, string, string] = [
                              category.prizes?.[0] || '',
                              category.prizes?.[1] || '',
                              e.target.value
                            ];
                            updateCategory(index, 'prizes', newPrizes);
                          }}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Awards Note */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Additional Information (Optional)</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Awards Note</label>
                  <textarea
                    value={formData.awardsNote}
                    onChange={(e) => setFormData({ ...formData, awardsNote: e.target.value })}
                    placeholder="e.g., The winners will get medals too. Every participant will get a certificate."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={2}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || imageUploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : imageUploading ? 'Uploading Image...' : editingEvent ? 'Update Event' : 'Add Event'}
                </button>
              </div>

              {formError && (
                <div className="text-red-600 text-sm my-2">{formError}</div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.slug}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded object-cover" src={event.image} alt={event.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{event.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {event.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {event.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleCompleted(event)}
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${event.completed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                      }`}
                  >
                    {event.completed ? 'Completed' : 'Upcoming'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.slug)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No events found. Add your first event!
          </div>
        )}
      </div>
    </div>
  );
}