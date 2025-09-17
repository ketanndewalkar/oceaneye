import React, { useState } from "react";
import axios from "axios";

const ReportIncident = () => {
  const [title, setTitle] = useState(""); // was hazardType
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [enableLocation, setEnableLocation] = useState(false);
  const [userEnteredLocation, setUserEnteredLocation] = useState(""); // was address
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [geolocationError, setGeolocationError] = useState("");

  const handleMediaChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
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

    // Validate required fields
    if (!title.trim()) {
      alert("Please select a hazard type.");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    // Location validation
    if (enableLocation) {
      if (!latitude || !longitude) {
        alert(
          "Location is enabled but latitude or longitude is missing. Please allow location access or disable location."
        );
        return;
      }
    } else {
      if (!userEnteredLocation.trim() && !latitude.trim() && !longitude.trim()) {
        alert(
          "Please provide either manual location (address, latitude, and longitude) or enable device location."
        );
        return;
      }
    }

    // Create FormData instance
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("enableLocation", enableLocation);
    formData.append("userEnteredLocation", userEnteredLocation);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    // Append media files
    mediaFiles.forEach((file) => {
      formData.append("image", file);
    });

    try {
      const response = await axios.post( 'http://localhost:4000/api/v1/reports/upload-report', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(response.data);

      // Reset form after success
      setTitle("");
      setDescription("");
      setMediaFiles([]);
      setEnableLocation(false);
      setUserEnteredLocation("");
      setLatitude("");
      setLongitude("");
      setGeolocationError("");
    } catch (error) {
      alert("Failed to submit report. Please try again later.");
      console.error("Submit error:", error);
    }
  };

  return (
    <>
      <div className="w-screen h-fit pt-[15vh] px-[5vw] py-[1vw] flex">
        <div className="w-full h-full flex justify-between gap-[1vw]">
          {/* Left Panel - Info and Preview */}
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
                Preview Image :{" "}
              </h1>
              <div className="w-fit border border-gray-200 rounded-lg overflow-auto p-[1vw] flex flex-wrap gap-4 max-h-[80%]">
                {mediaFiles.length === 0 && (
                  <img
                    src="https://picsum.photos/600/300/"
                    className="size-full object-center object-contain rounded-lg"
                    alt="Default preview"
                  />
                )}

                {mediaFiles.map((file, idx) => {
                  const url = URL.createObjectURL(file);
                  const type = file.type;

                  if (type.startsWith("image/")) {
                    return (
                      <img
                        key={idx}
                        src={url}
                        alt={`preview-${idx}`}
                        className="size-full rounded-lg object-contain object-center"
                        onLoad={() => URL.revokeObjectURL(url)}
                      />
                    );
                  } else if (type.startsWith("video/")) {
                    return (
                      <video
                        key={idx}
                        src={url}
                        controls
                        className="size-full rounded-lg"
                        onLoadedData={() => URL.revokeObjectURL(url)}
                      />
                    );
                  } else if (type.startsWith("audio/")) {
                    return (
                      <audio
                        key={idx}
                        src={url}
                        controls
                        className="size-full"
                        onLoadedData={() => URL.revokeObjectURL(url)}
                      />
                    );
                  } else {
                    return (
                      <p key={idx} className="text-sm text-gray-500">
                        Unsupported file: {file.name}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
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
                    Hazard Type :{" "}
                  </label>
                  <select
                    id="hazardType"
                    name="hazardType"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-500 bg-[#ffffff86] rounded-md focus:outline-none focus:ring-2 focus:ring-[#389bcd] text-[1.2vw] font-semibold text-gray-800"
                  >
                    <option value="">Select hazard type </option>
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
                    Description :{" "}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe the hazard..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-[1.2vw] px-4 py-2 border border-gray-500 bg-[#ffffff86] rounded-md focus:outline-none focus:ring-2 focus:ring-[#389bcd]"
                    rows={6}
                  ></textarea>
                </div>

                {/* Media Upload */}
                <div>
                  <label
                    htmlFor="media"
                    className="block text-[1.2vw] font-medium text-[#1a365d] mb-2"
                  >
                    Upload media (images, video) :{" "}
                  </label>
                  <input
                    id="media"
                    name="image"
                    type="file"
                    accept="image/*,video/*,audio/*"
                    multiple
                    onChange={handleMediaChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#72cefcb3] file:text-[#2995ca] hover:file:bg-blue-100"
                  />
                  {mediaFiles.length > 0 && (
                    <p className="mt-2 text-sm text-gray-500">
                      {mediaFiles.length} file(s) selected
                    </p>
                  )}
                </div>

                {/* Enable Location */}
                <div className="flex items-center space-x-2 ">
                  <input
                    id="enableLocation"
                    name="enableLocation"
                    type="checkbox"
                    value="1"
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
                    Enable device location (use browser geolocation if available)
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
                      name="address"
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
                        Latitude :{" "}
                      </label>
                      <input
                        id="latitude"
                        name="latitude"
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
                        Longitude :{" "}
                      </label>
                      <input
                        id="longitude"
                        name="longitude"
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
                    type="submit"
                    className="inline-block text-[1.2vw] px-[1vw] py-[0.5vw] bg-[#389bcd] text-white font-semibold rounded-md shadow-sm hover:bg-[#12648d] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#389bcd]"
                  >
                    Submit Report
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
