import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/info.css';
import profilePicture from '../Image/profileImage.png';

function Info() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    phone: false,
    website: false,
    password: false,
  });
  const [updatedFields, setUpdatedFields] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
    password: '',
    currentPassword: '',
    newPassword: '',
    newPasswordVerify: '',
  });

  const handleEdit = (field) => {
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [field]: true,
    }));
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUpdatedFields((prevUpdatedFields) => ({
      ...prevUpdatedFields,
      [field]: value,
    }));
  };

  const handleSave = async (field) => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: updatedFields[field] }),
      });
      const data = await res.json();

      if (res.ok) {
        // Update local storage with the updated field
        const updatedUser = { ...user, [field]: updatedFields[field] };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        setEditableFields((prevEditableFields) => ({
          ...prevEditableFields,
          [field]: false,
        }));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handlePasswordSave = async () => {
    const { currentPassword, newPassword, newPasswordVerify } = updatedFields;
  
    if (newPassword !== newPasswordVerify) {
      alert('New password and password verification do not match');
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3001/api/passwords/${user.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
  
      if (res.ok) {
        // Password updated successfully
        alert("The password has been changed successfully!")
        setEditableFields((prevEditableFields) => ({
          ...prevEditableFields,
          password: false,
        }));
  
        setUpdatedFields((prevUpdatedFields) => ({
          ...prevUpdatedFields,
          currentPassword: '',
          newPassword: '',
          newPasswordVerify: '',
        }));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="profile">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile Picture" />
      </div>
      <div className="profile-info">
        <p>
          <span className="edit-icon-container">
            Name:{' '}
            {editableFields.name ? (
              <>
                <input
                  type="text"
                  value={updatedFields.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                />
                <button className="save-button" onClick={() => handleSave('name')}>
                  Save
                </button>
              </>
            ) : (
              <>
                {user.name}
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="edit-icon"
                  onClick={() => handleEdit('name')}
                />
              </>
            )}
          </span>
        </p>
        <p>Username: {user.username}</p>
        <p>
          <span className="edit-icon-container">
            Email:{' '}
            {editableFields.email ? (
              <>
                <input
                  type="text"
                  value={updatedFields.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                />
                <button className="save-button" onClick={() => handleSave('email')}>
                  Save
                </button>
              </>
            ) : (
              <>
                {user.email}
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="edit-icon"
                  onClick={() => handleEdit('email')}
                />
              </>
            )}
          </span>
        </p>
        <p>
          <span className="edit-icon-container">
            Phone:{' '}
            {editableFields.phone ? (
              <>
                <input
                  type="text"
                  value={updatedFields.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                />
                <button className="save-button" onClick={() => handleSave('phone')}>
                  Save
                </button>
              </>
            ) : (
              <>
                {user.phone}
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="edit-icon"
                  onClick={() => handleEdit('phone')}
                />
              </>
            )}
          </span>
        </p>
        <p>
          <span className="edit-icon-container">
            Website:{' '}
            {editableFields.website ? (
              <>
                <input
                  type="text"
                  value={updatedFields.website}
                  onChange={(e) => handleInputChange(e, 'website')}
                />
                <button className="save-button" onClick={() => handleSave('website')}>
                  Save
                </button>
              </>
            ) : (
              <>
                {user.website}
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="edit-icon"
                  onClick={() => handleEdit('website')}
                />
              </>
            )}
          </span>
        </p>
        <p>
          <span className="edit-icon-container">
            Password:{' '}
            {editableFields.password ? (
              <>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={updatedFields.currentPassword}
                  onChange={(e) => handleInputChange(e, 'currentPassword')}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={updatedFields.newPassword}
                  onChange={(e) => handleInputChange(e, 'newPassword')}
                />
                <input
                  type="password"
                  placeholder="Verify New Password"
                  value={updatedFields.newPasswordVerify}
                  onChange={(e) => handleInputChange(e, 'newPasswordVerify')}
                />
                <button className="save-button" onClick={handlePasswordSave}>
                  Save
                </button>
              </>
            ) : (
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="edit-icon"
                onClick={() => handleEdit('password')}
              />
            )}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Info;
