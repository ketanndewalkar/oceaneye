import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../Components/ReportCard";
import { AuthContext } from "../Context/AuthContext";
import { ClipLoader } from "react-spinners";

const ReportIncident = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [enableLocation, setEnableLocation] = useState(false);
  const [userEnteredLocation, setUserEnteredLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [geolocationError, setGeolocationError] = useState("");
  const [responseData, setResponseData] = useState(null);
  const { loading, setLoading } = useContext(AuthContext);

  const handle_file_input = (e) => {
    if (e.target.files) setSelectedFile(e.target.files[0]);
  };

  const handleEnableLocationChange = (checked) => {
    setEnableLocation(checked);
    setGeolocationError("");
    if (checked) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude.toFixed(6));
            setLongitude(position.coords.longitude.toFixed(6));
          },
          (error) => {
            setGeolocationError(error.message);
            setEnableLocation(false);
          }
        );
      } else {
        setGeolocationError("Geolocation is not supported by your browser.");
        setEnableLocation(false);
      }
    } else {
      setLatitude("");
      setLongitude("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    if (enableLocation && (!latitude || !longitude)) {
      alert("Location is enabled but latitude or longitude is missing.");
      return;
    }
    if (!enableLocation && !userEnteredLocation.trim() && !latitude && !longitude) {
      alert("Please provide a manual location or enable device location.");
      return;
    }
    if (!selectedFile) {
      alert("Please select an image/video/audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("enableLocation", enableLocation);
    formData.append("userEnteredLocation", userEnteredLocation);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/reports/upload-report`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      setLoading(false);
      toast.success(response.data.message, {
        className: "bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg",
      });
      setResponseData(response.data.data);

      // Reset form
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setEnableLocation(false);
      setUserEnteredLocation("");
      setLatitude("");
      setLongitude("");
      setGeolocationError("");
    } catch (error) {
      setLoading(false);
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="w-full pt-[15vh] px-4 md:px-[10vh] flex flex-col md:flex-row gap-6 pb-[2vw]">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="bg-[#00aaff18] p-4 rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-xl md:text-2xl font-bold text-[#1a365d]">Report an issue in your area</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium mt-1">
            Help the city by submitting real-time ocean hazard reports and help save lives.
          </p>
        </div>
        <p className="text-center text-lg md:text-xl font-semibold text-[#1a365d]">
          Powered by You, Verified by Us
        </p>
        <div className="bg-[#00aaff18] p-4 rounded-lg border border-gray-300 flex justify-center items-center shadow-xl">
          <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-md">
            <img
              src={
                responseData?.images?.[0]?.url
                  ? responseData.images[0].url
                  : selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : "/assets/placeholder.jpeg"
              }
              alt="Hazard Report"
              className="w-full h-64 md:h-80 object-contain object-center border-gray-200"
            />
            {responseData && (
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-xs md:text-sm p-2 flex flex-col">
                <span>Lat: {responseData?.images?.[0].latitude}</span>
                <span>Lng: {responseData?.images?.[0].longitude}</span>
                <span>Location: {responseData?.images?.[0].location.city}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 bg-[#00aaff18] rounded-lg border border-gray-300 p-4 flex flex-col gap-4">
        <h1 className="text-center text-xl md:text-2xl font-bold text-[#1a365d]">Report Hazard</h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-full space-y-4"
        >
          {/* Hazard Type */}
          <div>
            <label htmlFor="hazardType" className="block text-sm md:text-base font-medium text-[#1a365d] mb-1">
              Hazard Type :
            </label>
            <select
              id="hazardType"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 rounded-md bg-[#ffffff86] focus:outline-none focus:ring-2 focus:ring-[#389bcd] text-sm md:text-base"
            >
              <option value="">Select hazard type</option>
              <option value="fire">Fire</option>
              <option value="flood">Flood</option>
              <option value="chemical">Chemical spill</option>
              <option value="landslide">Landslide</option>
              <option value="structural">Structural damage</option>
              <option value="medical">Medical emergency</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm md:text-base font-medium text-[#1a365d] mb-1">
              Description :
            </label>
            <textarea
              id="description"
              placeholder="Describe the hazard..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 rounded-md bg-[#ffffff86] focus:outline-none focus:ring-2 focus:ring-[#389bcd] text-sm md:text-base"
              rows={5}
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="media" className="block text-sm md:text-base font-medium text-[#1a365d] mb-2">
              Upload media (image/video/audio) :
            </label>
            <input
              id="media"
              type="file"
              accept="image/*,video/*,audio/*"
              onChange={handle_file_input}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#72cefcb3] file:text-[#2995ca] hover:file:bg-blue-100"
            />
            {selectedFile && <p className="mt-2 text-sm text-gray-500">{selectedFile.name}</p>}
          </div>

          {/* Enable Location */}
          <div className="flex items-center space-x-2">
            <input
              id="enableLocation"
              type="checkbox"
              checked={enableLocation}
              onChange={(e) => handleEnableLocationChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="enableLocation" className="text-sm md:text-base font-bold text-gray-600">
              Enable device location
            </label>
          </div>
          {geolocationError && <p className="text-red-600 text-sm">{geolocationError}</p>}

          {/* Manual Location */}
          <fieldset className="border border-gray-300 rounded-md p-3">
            <legend className="text-sm md:text-base font-semibold text-[#1a365d] px-1">
              Manual location (optional)
            </legend>
            <div className="mb-2">
              <label htmlFor="address" className="block text-sm md:text-base font-medium text-[#1a365d] mb-1">
                Address / Place Name :
              </label>
              <input
                id="address"
                type="text"
                placeholder="e.g. 123 Main St, Springfield"
                value={userEnteredLocation}
                onChange={(e) => setUserEnteredLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-500 rounded-md bg-[#ffffff86] focus:outline-none focus:ring-2 focus:ring-[#389bcd] text-sm md:text-base"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label htmlFor="latitude" className="block text-sm md:text-base font-medium text-[#1a365d] mb-1">
                  Latitude :
                </label>
                <input
                  id="latitude"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 18.5204"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  disabled={enableLocation}
                  className={`w-full px-3 py-2 border border-gray-500 rounded-md bg-[#ffffff86] focus:outline-none focus:ring-2 focus:ring-[#389bcd] ${
                    enableLocation ? "bg-gray-100" : ""
                  } text-sm md:text-base`}
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm md:text-base font-medium text-[#1a365d] mb-1">
                  Longitude :
                </label>
                <input
                  id="longitude"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 73.8567"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  disabled={enableLocation}
                  className={`w-full px-3 py-2 border border-gray-500 rounded-md bg-[#ffffff86] focus:outline-none focus:ring-2 focus:ring-[#389bcd] ${
                    enableLocation ? "bg-gray-100" : ""
                  } text-sm md:text-base`}
                />
              </div>
            </div>
          </fieldset>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type={loading ? "button" : "submit"}
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-[#389bcd] text-white font-semibold rounded-md shadow-sm hover:bg-[#12648d] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <><ClipLoader color="white" size={20} /> Submitting...</> : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
