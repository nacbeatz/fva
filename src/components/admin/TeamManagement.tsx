import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { uploadToCloudinary } from '../../services/cloudinaryService';

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  country: string;
  image: string;
  bio: string;
  achievements?: string[];
  category: "senior-men" | "senior-women" | "junior-men" | "junior-women";
  instagram?: string;
}

export default function TeamManagement() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember, loading: dataLoading, error: dataError, refreshData } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    country: '',
    image: '',
    bio: '',
    achievements: '',
    category: 'senior-men' as "senior-men" | "senior-women" | "junior-men" | "junior-women",
    instagram: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      country: '',
      image: '',
      bio: '',
      achievements: '',
      category: 'senior-men',
      instagram: ''
    });
    setEditingMember(null);
    setIsFormOpen(false);
    setImageFile(null);
    setImageUploading(false);
    setFormError(null);
  };

  const clearImageSelection = () => {
    setImageFile(null);
    setFormData({ ...formData, image: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      let imageUrl = formData.image;

      // If no image provided at all, use a placeholder
      if (!imageFile && !formData.image) {
        imageUrl = 'https://via.placeholder.com/300x400/0066cc/ffffff?text=Team+Member';
        console.log('No image provided, using placeholder');
      }

      // Upload image if a file was selected
      if (imageFile) {
        console.log('Starting Cloudinary upload for file:', imageFile.name);
        setImageUploading(true);
        try {
          imageUrl = await uploadToCloudinary(imageFile, 'team-members');
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
            imageUrl = 'https://via.placeholder.com/300x400/cc6600/ffffff?text=Upload+Failed';
          }

          setFormError(`Image upload failed, using ${formData.image ? 'provided URL' : 'placeholder'} instead. Error: ${uploadError.message}`);
        }
      }

      const memberData = {
        ...formData,
        image: imageUrl,
        achievements: formData.achievements.split('\n').filter(a => a.trim())
      };

      console.log('Saving member data:', memberData);

      if (editingMember) {
        if (!editingMember.id) {
          throw new Error('Cannot update team member: missing ID');
        }
        await updateTeamMember(editingMember.id, memberData);
      } else {
        await addTeamMember(memberData);
      }
      resetForm();
    } catch (error: any) {
      console.error('Form submission error:', error);
      setFormError(error.message || 'An error occurred while saving the team member');
      setImageUploading(false);
    } finally {
      setIsSubmitting(false);
    }
  }; const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      country: member.country,
      image: member.image,
      bio: member.bio,
      achievements: member.achievements?.join('\n') || '',
      category: member.category,
      instagram: member.instagram || ''
    });
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) {
      setFormError('Invalid team member ID');
      return;
    }

    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        setFormError(null);
        await deleteTeamMember(id);
      } catch (error: any) {
        setFormError(error.message || 'An error occurred while deleting the team member');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium w-full sm:w-auto"
        >
          Add Team Member
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
          <div className="text-red-600 mb-2">Error loading team members</div>
          <p className="text-gray-600">{dataError}</p>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as "senior-men" | "senior-women" | "junior-men" | "junior-women" })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="senior-men">Senior Men</option>
                    <option value="senior-women">Senior Women</option>
                    <option value="junior-men">Junior Men</option>
                    <option value="junior-women">Junior Women</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <div className="space-y-3">
                  {/* File Upload Option */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Upload from PC</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          setFormData({ ...formData, image: '' }); // Clear URL when file is selected
                        }
                      }}
                      className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                    />
                    {imageFile && (
                      <p className="mt-1 text-xs text-green-600">
                        Selected: {imageFile.name}
                      </p>
                    )}
                  </div>

                  {/* OR divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-2 text-gray-500">OR</span>
                    </div>
                  </div>

                  {/* URL Option */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        if (e.target.value) {
                          setImageFile(null); // Clear file when URL is entered
                        }
                      }}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>

                  {/* Image Preview */}
                  {(formData.image || imageFile) && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-medium text-gray-600">Preview</label>
                        <button
                          type="button"
                          onClick={clearImageSelection}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Clear
                        </button>
                      </div>
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram (optional)</label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="@username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Achievements (one per line)</label>
                <textarea
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
                />
              </div>

              {formError && (
                <div className="text-red-600 text-sm my-2">{formError}</div>
              )}

              {imageUploading && (
                <div className="text-blue-600 text-sm my-2 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                  Uploading image...
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting || imageUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || imageUploading}
                  className={`px-4 py-2 rounded-md ${(isSubmitting || imageUploading) ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                >
                  {imageUploading
                    ? 'Uploading Image...'
                    : isSubmitting
                      ? (editingMember ? 'Updating...' : 'Adding...')
                      : (editingMember ? 'Update' : 'Add') + ' Member'
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Members List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full object-cover" src={member.image} alt={member.name} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.category === 'senior-men' ? 'Senior Men' :
                      member.category === 'senior-women' ? 'Senior Women' :
                        member.category === 'junior-men' ? 'Junior Men' : 'Junior Women'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          <div className="divide-y divide-gray-200">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-4">
                <div className="flex items-start space-x-4">
                  <img className="h-12 w-12 rounded-full object-cover flex-shrink-0" src={member.image} alt={member.name} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{member.name}</div>
                    <div className="text-sm text-gray-500 truncate">{member.role}</div>
                    <div className="mt-1 text-xs text-gray-500">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                        {member.category === 'senior-men' ? 'Senior Men' :
                          member.category === 'senior-women' ? 'Senior Women' :
                            member.category === 'junior-men' ? 'Junior Men' : 'Junior Women'}
                      </span>
                      <span>{member.country}</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No team members found. Add your first team member!
          </div>
        )}
      </div>
    </div>
  );
}