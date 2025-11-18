import React, { useEffect, useState } from 'react';
import styles from '../Address/Address.module.css';
import ProfileCard from '../ProfileCard';
import { toast } from 'react-toastify';
import api from '../../../Utils/api';

const Address = () => {
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [addressBoxes, setAddressBoxes] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [formData, setFormData] = useState({
    zipCode: '',
    houseNumber: '',
    street: '',
    alternatePhone: '',
    city: '',
    state: '',
    landmark: '',
    saveAs: 'Home',
    addedOn: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing address
        const response = await api.put(
          `/sell-module/user/update-address/680248846f15af3e95132c80/${editingAddressId}`,
          formData
        );
        // console.log(response.data);

        toast.success('Address updated successfully')
      } else {
        // Add new address
        const response = await api.post(
          '/sell-module/user/address/680373ce230e17862c4ba104',
          formData
        );
        // console.log(response.data);

        toast.success('Address submitted successfully')
      }
      
      // Reset form and fetch updated addresses
      resetForm();
      getSavedAddresses();
      setIsAddressOpen(false);
      setIsEditing(false);
      setEditingAddressId(null);
    } catch (error) {
      console.error('Error submitting address:', error);
      alert(`Failed to ${isEditing ? 'update' : 'submit'} address`);
    }
  };

  const resetForm = () => {
    setFormData({
      zipCode: '',
      houseNumber: '',
      street: '',
      alternatePhone: '',
      city: '',
      state: '',
      landmark: '',
      saveAs: 'Home',
      addedOn: new Date().toISOString().split('T')[0],
    });
  };

  const toggleAddress = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditingAddressId(null);
      resetForm();
    }
    setIsAddressOpen(!isAddressOpen);
  };

  const handleEdit = (index) => {
    const addressToEdit = addressBoxes[index];
    // console.log("Owais : ", addressToEdit);  
    setFormData({
      zipCode: addressToEdit.zipCode || '',
      houseNumber: addressToEdit.houseNumber || '',
      street: addressToEdit.street || '',
      alternatePhone: addressToEdit.alternatePhone || '',
      city: addressToEdit.city || '',
      state: addressToEdit.state || '',
      landmark: addressToEdit.landmark || '',
      saveAs: addressToEdit.saveAs || 'Home',
      addedOn: addressToEdit.addedOn || new Date().toISOString().split('T')[0],
    });
    setEditingAddressId(addressToEdit._id);
    setIsEditing(true);
    setIsAddressOpen(true);
  };

  const handleDelete = async (addressId) => {
   // console.log(addressId)
    try {
      const response = await api.delete(
        `/sell-module/user/address/680248846f15af3e95132c80/${addressId}`
      );
      // console.log(response.data);

      toast.success('Address deleted successfully')
      getSavedAddresses();
      setSelectedAddressIndex(null);
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address')
    }
  };

  const getSavedAddresses = async () => {

    try {
      const resp = await api.get('/sell-module/user/address');
      // console.log(resp.data);

      setAddressBoxes(resp.data?.addresses || []);
    } catch (error) {
      console.error('Error fetching saved addresses:', error);
    }
  };

  useEffect(() => {
    getSavedAddresses();
  }, []);

  // console.log('Address Boxes:', addressBoxes);


  return (
    <div className={`${styles.addressContainer} scrollbar-hidden`}>
      <div className={styles.left}>
        <form className={`${styles.addressWrapper} scrollbar-hidden`} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Address Details</h2>

          {/* Address Cards */}
          <div className={styles.fixcontainer}>
            {addressBoxes?.map((address, index) => (
              <div
                key={index}
                className="relative flex flex-row justify-center items-center p-5 gap-20 bg-gray-100 rounded-lg w-[165px] h-[149px]"
              >
                <input
                  type="radio"
                  name="address"
                  className="absolute left-4 top-4 w-4 h-4"
                  value={index}
                  checked={selectedAddressIndex === index}
                  onChange={() => setSelectedAddressIndex(index)}
                />
                <div className="absolute left-4 top-[45px] flex flex-col items-start p-0 gap-1 text-left">
                  <p className="text-[14px] text-black">
                    {address.houseNumber || ''} {address.street || ''}
                  </p>
                  <p className="text-[14px] text-black">
                    {(address.city || 'N/A')}, {(address.state || 'N/A')}
                  </p>
                  <p className="text-[14px] text-black">
                    Zip: {address.zipCode || 'N/A'}
                  </p>
                </div>
                <button className="absolute left-16 transform -translate-x-1/2 top-3 bg-black text-white text-xs font-medium px-2 py-1  rounded-md">
                  {address.saveAs === 'Other' && address.customLabel
                    ? address.customLabel
                    : address.saveAs}
                </button>

                {/* Conditionally show buttons */}
                {selectedAddressIndex === index && (
                  <div className="mt-4 absolute bottom-2 left-4 flex gap-2">
                    <button 
                      type="button" 
                      className={styles.editbutton}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button 
                      type="button" 
                      className={styles.deletebutton}
                      onClick={() => handleDelete(address._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add New Address Card */}
            <div>
              <div
                onClick={toggleAddress}
                className="relative flex flex-col justify-center items-center p-5 gap-2 bg-gray-100 rounded-lg w-[165px] h-[149px] cursor-pointer"
              >
                <span className="text-[50px] text-gray-500">+</span>
                <span className="text-[16px] text-gray-500">
                  {isAddressOpen ? 'Discard' : 'Add New Address'}
                </span>
              </div>
            </div>
          </div>

          {/* Address Form - shown when adding new or editing */}
          {(isAddressOpen || isEditing) && (
            <div className={styles.AddressBox}>
              <h3>{isEditing ? 'Edit Address' : 'Add New Address'}</h3>
              <div className={styles.FormBox}>
                {/* House Number */}
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    placeholder="Flat no/House no"
                    className={styles.input}
                    required
                  />
                </div>

                {/* Street */}
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Area/Street/Locality"
                    className={styles.input}
                    required
                  />
                </div>

                {/* Landmark */}
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Landmark"
                    className={styles.input}
                  />
                </div>

                {/* City & Zip Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={styles.inputContainer}>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>

                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Zip Code"
                      className={styles.input}
                      required
                    />
                  </div>

                  {/* State */}
                  <div className={styles.inputContainer}>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </select>
                  </div>

                  {/* Alternate Phone */}
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleChange}
                      placeholder="Alternate Phone Number"
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Save As */}
                <div className={styles.inputContainer2}>
                  <span className={styles.label}>Save as:</span>
                  <label>
                    <input
                      type="radio"
                      name="saveAs"
                      value="Home"
                      checked={formData.saveAs === 'Home'}
                      onChange={handleChange}
                    />{' '}
                    Home
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="saveAs"
                      value="Office"
                      checked={formData.saveAs === 'Office'}
                      onChange={handleChange}
                    />{' '}
                    Office
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="saveAs"
                      value="Other"
                      checked={formData.saveAs === 'Other'}
                      onChange={handleChange}
                    />{' '}
                    Other
                  </label>
                </div>

                {/* Added On Date */}
                <div className={styles.inputContainer}>
                  <input
                    type="date"
                    name="addedOn"
                    value={formData.addedOn}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                {/* Agreement */}
                <div className={styles.inputContainer}>
                  <label className="flex">
                    <input type="checkbox" required />
                    <span className={styles.agreement}>
                      I agree to sell my item in conformity with the{' '}
                      <a href="#">Trade-in Terms and Conditions</a>.
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.submitButton}>
                    {isEditing ? 'Update Address' : 'Submit'}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => {
                        setIsEditing(false);
                        setIsAddressOpen(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className={styles.right}>
        <ProfileCard />
      </div>
    </div>
  );
};

export default Address;