import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const Profile = () => {
  const { user } = useContext(StoreContext);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;