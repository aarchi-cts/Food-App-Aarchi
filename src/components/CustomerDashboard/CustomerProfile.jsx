// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../context/StoreContext";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const { user, token } = useContext(StoreContext); // Access user and token from context
//   const [customerDetails, setCustomerDetails] = useState(null); // Store customer details
//   const [editMode, setEditMode] = useState(false); // Toggle edit mode
//   const [formData, setFormData] = useState({ name: "", phone: "", address: "" }); // Form data for updates
//   const [errors, setErrors] = useState({}); // Store validation errors

//   // Fetch customer details on component mount
//   useEffect(() => {
//     const fetchCustomerDetails = async () => {
//       if (user?.email && user.role === "customer") {
//         try {
//           const response = await fetch(
//             `https://localhost:7274/api/Customer/${user.email}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           if (response.ok) {
//             const data = await response.json();
//             console.log("Fetched Customer Details:", data); // Debugging
//             setCustomerDetails(data);
//             setFormData({
//               name: data.name || "",
//               phone: data.phone || "",
//               address: data.address || "",
//             }); // Pre-fill form data
//           } else {
//             toast.error("Failed to fetch customer details.");
//           }
//         } catch (error) {
//           console.error("Error fetching customer details:", error);
//           toast.error("An error occurred while fetching customer details.");
//         }
//       }
//     };

//     fetchCustomerDetails();
//   }, [user, token]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     // Clear errors when the user starts typing
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   // Validate form data
//   const validateForm = () => {
//     const newErrors = {};

//     // Validate name
//     if (!formData.name.trim()) {
//       newErrors.name = "Name cannot be empty.";
//     }

//     // Validate phone number
//     if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits.";
//     }

//     // Validate address
//     if (!formData.address.trim()) {
//       newErrors.address = "Address cannot be empty.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   // Handle update submission
//   const handleUpdate = async () => {
//     if (!validateForm()) {
//       return; // Stop submission if validation fails
//     }

//     try {
//       const response = await fetch(
//         `https://localhost:7274/api/Customer/${user.email}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json-patch+json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             name: formData.name,
//             phone: formData.phone,
//             address: formData.address,
//           }),
//         }
//       );

//       if (response.ok) {
//         toast.success("Details updated successfully!");
//         setEditMode(false); // Exit edit mode
//         setCustomerDetails((prevDetails) => ({
//           ...prevDetails,
//           name: formData.name,
//           phone: formData.phone,
//           address: formData.address,
//         }));
//       } else {
//         toast.error("Failed to update details.");
//       }
//     } catch (error) {
//       console.error("Error updating details:", error);
//       toast.error("An error occurred while updating details.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">Profile</h2>
//       {customerDetails ? (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <p className="mb-4">
//             <strong>Email:</strong> {customerDetails.email}
//           </p>
//           {!editMode ? (
//             <>
//               <p className="mb-4">
//                 <strong>Name:</strong> {customerDetails.name || "Not provided"}
//               </p>
//               <p className="mb-4">
//                 <strong>Phone:</strong> {customerDetails.phone || "Not provided"}
//               </p>
//               <p className="mb-4">
//                 <strong>Address:</strong> {customerDetails.address || "Not provided"}
//               </p>
//               <button
//                 onClick={() => setEditMode(true)}
//                 className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
//               >
//                 Edit Details
//               </button>
//             </>
//           ) : (
//             <div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                     errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
//                   }`}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Phone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                     errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
//                   }`}
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                     errors.address ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
//                   }`}
//                 />
//                 {errors.address && (
//                   <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//                 )}
//               </div>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-2"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditMode(false)}
//                 className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const CustomerProfile = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [customerDetails, setCustomerDetails] = useState(null); // Store customer details
  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({ phone: "", address: "" }); // Form data for updates
  const [errors, setErrors] = useState({}); // Store validation errors

  // Fetch customer details on component mount
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (user?.email && user.role === "customer") {
        try {
          const response = await fetch(
            `https://localhost:7274/api/Customer/${user.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Customer Details:", data); // Debugging
            setCustomerDetails(data);
            setFormData({
              phone: data.phone || "",
              address: data.address || "",
            }); // Pre-fill form data
          } else {
            toast.error("Failed to fetch customer details.");
          }
        } catch (error) {
          console.error("Error fetching customer details:", error);
          toast.error("An error occurred while fetching customer details.");
        }
      }
    };

    fetchCustomerDetails();
  }, [user, token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear errors when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits and consist only of numbers.";
    } else if (/(\d)\1{5}/.test(formData.phone)) {
      newErrors.phone = "Phone number cannot have a digit repeated more than 5 times consecutively.";
    }

    // Validate address
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits and consist only of numbers.";
    } else if (/(\d)\1{5}/.test(formData.phone)) {
      newErrors.phone = "Phone number cannot have a digit repeated more than 5 times consecutively.";
    }
  
    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = "Address cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle update submission
  const handleUpdate = async () => {
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await fetch(
        `https://localhost:7274/api/Customer/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone: formData.phone,
            address: formData.address,
          }),
        }
      );

      if (response.ok) {
        toast.success("Details updated successfully!");
        setEditMode(false); // Exit edit mode
        setCustomerDetails((prevDetails) => ({
          ...prevDetails,
          phone: formData.phone,
          address: formData.address,
        }));
      } else {
        toast.error("Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating details:", error);
      toast.error("An error occurred while updating details.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      {customerDetails ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">
            <strong>Email:</strong> {customerDetails.email}
          </p>
          <p className="mb-4">
            <strong>Name:</strong> {customerDetails.name || "Not provided"}
          </p>
          {!editMode ? (
            <>
              <p className="mb-4">
                <strong>Phone:</strong> {customerDetails.phone || "Not provided"}
              </p>
              <p className="mb-4">
                <strong>Address:</strong> {customerDetails.address || "Not provided"}
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
              >
                Edit Details
              </button>
            </>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                    }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.address ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                    }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default CustomerProfile;