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

  // ✅ handle single file input
  const handle_file_input = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // ✅ enable/disable geolocation
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

    if (!title.trim()) {
      alert("Please select a hazard type.");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }
    if (enableLocation) {
      if (!latitude || !longitude) {
        alert("Location is enabled but latitude or longitude is missing.");
        return;
      }
    } else {
      if (
        !userEnteredLocation.trim() &&
        !latitude.trim() &&
        !longitude.trim()
      ) {
        alert("Please provide a manual location or enable device location.");
        return;
      }
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
        "http://localhost:4000/api/v1/reports/upload-report",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(response.data);
      toast.success(response.data.message, {
        className:
          "bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg",
      });
      setResponseData(response.data.data);

      // reset
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
    <>
      <div className="w-screen h-fit pt-[15vh] px-[5vw] py-[1vw] flex">
        <div className="w-full h-full flex justify-between gap-[1vw]">
          {/* Left Panel */}
          <div className="w-1/2 h-[calc(100dvh-15vh)] flex flex-col gap-[0.5vw]">
            <div className="bg-[#00aaff18] h-fit shadow-lg shadow-gray-400/30 border border-gray-300 rounded-lg p-[1vw]">
              <h1 className="text-[1.5vw] font-bold text-[#1a365d]">
                Report an issue in your area
              </h1>
              <p className="text-[1.2vw] text-gray-500 font-medium">
                Help city making better by submitting real time ocean hazard
                report and help save lives
              </p>
            </div>
            <p className="w-full text-center text-[1.5vw] font-semibold text-[#1a365d]">
              Powered by You, Verified by Us
            </p>
            <div className="bg-[#00aaff18] h-full border p-[1vw] border-gray-300 rounded-lg flex flex-col gap-[0.5vw] shadow-xl shadow-black/10">
              <h1 className="text-[1.5vw] text-[#1a365d] font-bold">
                Preview Image :
              </h1>
              <div className="w-full border rounded-lg overflow-hidden p-[1vw] flex justify-center items-center max-h-[80%] border-gray-300">
                <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-md">
                  {/* Hazard Report Image */}
                  <img
                    src={
                      responseData?.images?.[0]?.url
                        ? responseData.images[0].url
                        : selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : "/assets/placeholder.jpeg"
                    }
                    alt="Hazard Report"
                    className="size-full object-contain object-center border-gray-200"
                  />

                  {/* Overlay for Lat & Lng */}
                  {responseData ? (
                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm px-3 py-2 flex flex-col">
                      <span>Lat: {responseData?.images?.[0].latitude}</span>
                      <span>Lng: {responseData?.images?.[0].longitude}</span>
                      <span>Location: {responseData?.images?.[0].location.city}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-[#00aaff18] rounded-lg w-1/2 h-full border border-gray-300 pt-[1vw] flex flex-col gap-[1vw]">
            <h1 className="text-center text-[1.5vw] font-bold text-[#1a365d]">
              Report Hazard
            </h1>
            <div className="w-full h-full">
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="max-w-3xl mx-auto p-6 shadow-md rounded-lg space-y-6"
              >
                {/* Hazard Type */}
                <div>
                  <label
                    htmlFor="hazardType"
                    className="block text-[1.2vw] font-medium text-[#1a365d] mb-1"
                  >
                    Hazard Type :
                  </label>
                  <select
                    id="hazardType"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-500 bg-[#ffffff86] rounded-md focus:outline-none focus:ring-2 focus:ring-[#389bcd] text-[1.2vw] font-semibold text-gray-800"
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
                  <label
                    htmlFor="description"
                    className="block text-[1.2vw] font-medium text-[#1a365d] mb-1"
                  >
                    Description :
                  </label>
                  <textarea
                    id="description"
                    placeholder="Describe the hazard..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-[1.2vw] px-4 py-2 border border-gray-500 bg-[#ffffff86] rounded-md focus:outline-none focus:ring-2 focus:ring-[#389bcd]"
                    rows={6}
                  ></textarea>
                </div>

                {/* File Upload */}
                <div>
                  <label
                    htmlFor="media"
                    className="block text-[1.2vw] font-medium text-[#1a365d] mb-2"
                  >
                    Upload media (image/video/audio) :
                  </label>
                  <input
                    id="media"
                    type="file"
                    accept="image/*,video/*,audio/*"
                    onChange={handle_file_input}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#72cefcb3] file:text-[#2995ca] hover:file:bg-blue-100"
                  />
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-500">
                      {selectedFile.name}
                    </p>
                  )}
                </div>

                {/* Enable Location */}
                <div className="flex items-center space-x-2">
                  <input
                    id="enableLocation"
                    type="checkbox"
                    checked={enableLocation}
                    onChange={(e) =>
                      handleEnableLocationChange(e.target.checked)
                    }
                    className="mt-1 h-full w-4 text-blue-600 focus:ring-[#389bcd] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="enableLocation"
                    className="text-gray-600 text-sm text-[1vw] font-bold"
                  >
                    Enable device location (use browser geolocation)
                  </label>
                </div>
                {geolocationError && (
                  <p className="text-red-600 text-sm">{geolocationError}</p>
                )}

                {/* Manual Location */}
                <fieldset className="border border-gray-300 rounded-md p-4">
                  <legend className="text-[1.2vw] font-semibold text-[#1a365d] mb-2 px-[0.2vw]">
                    Manual location (optional)
                  </legend>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-[1.2vw] font-medium text-[#1a365d] mb-1"
                    >
                      Address / Place Name :
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder="e.g. 123 Main St, Springfield"
                      value={userEnteredLocation}
                      onChange={(e) => setUserEnteredLocation(e.target.value)}
                      className="w-full text-[1.2vw] px-4 py-2 border border-gray-500 bg-[#ffffff86] rounded-md focus:outline-none focus:ring-2 focus:ring-[#389bcd]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="latitude"
                        className="block text-[1.2vw] font-medium text-[#1a365d] mb-1"
                      >
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
                        className={`w-full text-[1.2vw] px-4 py-2 border border-gray-500 bg-[#ffffff86] rounded-md focus:outline-none focus:ring-2 focus:ring-[#389bcd] ${
                          enableLocation ? "bg-gray-100" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="longitude"
                        className="block text-[1.2vw] font-medium text-[#1a365d] mb-1"
                      >
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
                        className={`w-full text-[1.2vw] px-4 py-2 border border-gray-500 bg-[#ffffff86] rounded-md focus:outline-none focus:ring-2 focus:ring-[#389bcd] ${
                          enableLocation ? "bg-gray-100" : ""
                        }`}
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type={loading ? "button" : "submit"}
                    className="text-[1.2vw] px-[1vw] py-[0.5vw] bg-[#389bcd] text-white font-semibold rounded-md shadow-sm hover:bg-[#12648d] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#389bcd] flex items-center gap-[0.7vw] transition-all duration-300 ease-linear disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <ClipLoader color="white" size={20} />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Report</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportIncident;
