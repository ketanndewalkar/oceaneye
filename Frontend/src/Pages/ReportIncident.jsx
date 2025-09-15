import React, { useState, useRef } from 'react';

// You can use a library like `lucide-react` for icons, but for simplicity, here are SVG icons.
const UploadCloudIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-5 w-5"
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-5 w-5"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DownloadIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="mr-2 h-5 w-5"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);


export default function reportIncident() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setStatusMessage('');
    }
  };

  const handleEnableLocation = async () => {
    if (!navigator.geolocation) {
      setStatusMessage('Geolocation is not supported by your browser.');
      return;
    }

    // Success callback for getCurrentPosition
    const onLocationSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setIsLocationEnabled(true);
        setStatusMessage(`Location enabled: Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
    };

    // Error callback for getCurrentPosition
    const onLocationError = (error) => {
        let message = 'Unable to retrieve your location.';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = 'You denied the request for Geolocation. Please enable it in your browser settings to use this feature.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Location information is currently unavailable.';
                break;
            case error.TIMEOUT:
                message = 'The request to get your location timed out.';
                break;
        }
        setStatusMessage(message);
        setIsLocationEnabled(false);
    };

    // Use the Permissions API for a better user experience
    if (navigator.permissions) {
        try {
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

            if (permissionStatus.state === 'granted') {
                setStatusMessage('Fetching location...');
                navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
            } else if (permissionStatus.state === 'prompt') {
                // The browser will now show the permission pop-up.
                setStatusMessage('Please grant location access in the browser prompt.');
                navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
            } else if (permissionStatus.state === 'denied') {
                // If permission was already denied, we can't show the pop-up again.
                setStatusMessage('Location access was previously denied. Please enable it in your browser\'s site settings.');
                setIsLocationEnabled(false);
            }
        } catch (e) {
            // Fallback for browsers that might not support this query
            console.error("Error checking permissions: ", e);
            setStatusMessage('Requesting location permission...');
            navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
        }
    } else {
        // Fallback for older browsers without the Permissions API
        setStatusMessage('Requesting location permission...');
        navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !location) {
      setStatusMessage('Please select a file and enable location before uploading.');
      return;
    }
    
    setIsUploading(true);
    setStatusMessage('Uploading...');

    // Simulate an upload process
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Uploading file:', selectedFile.name);
    console.log('Description:', description);
    console.log('Location:', location);
    
    // Reset state after upload
    setIsUploading(false);
    setStatusMessage('Upload successful!');
    setSelectedFile(null);
    setDescription('');
    setLocation(null);
    setIsLocationEnabled(false);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };
  
  const handleExportCSV = () => {
      // This is a placeholder for CSV export functionality
      setStatusMessage('Exporting data as CSV...');
      console.log("Exporting CSV...");
       // Simulate a download process
      setTimeout(() => {
          setStatusMessage('CSV export initiated.');
      }, 1500);
  }

  const isUploadDisabled = !selectedFile || !location || isUploading;

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4 font-sans home2">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Geotagged Photo Upload</h1>
          <p className="text-slate-500 mt-2">Upload a photo with its geographical location.</p>
        </header>

        <div className="space-y-4">
          {/* File Input */}
          <div>
            <label htmlFor="file-upload" className="sr-only">Choose file</label>
            <div className="flex items-center space-x-4">
                 <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#389bcd] hover:file:bg-violet-100"
                />
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="sr-only">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description for your photo..."
              rows="4"
              className="w-full px-4 py-2 text-slate-700 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            ></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleEnableLocation}
              className={`flex items-center justify-center w-full px-4 py-3 font-semibold text-white rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLocationEnabled 
                  ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500' 
                  : 'bg-[#389bcd] focus:ring-blue-500'
              }`}
            >
              <MapPinIcon />
              {isLocationEnabled ? 'Location Enabled' : 'Enable Location'}
            </button>

          <button
            onClick={handleUpload}
            disabled={isUploadDisabled}
            className="flex items-center justify-center w-full px-4 py-3 font-semibold text-white bg-violet-500 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            <UploadCloudIcon />
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        
        {/* Export Button */}
        <div className="border-t border-slate-200 pt-4">
             <button
                onClick={handleExportCSV}
                className="flex items-center justify-center w-full px-4 py-3 font-semibold text-slate-700 bg-slate-200 rounded-lg shadow-sm hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition"
             >
                <DownloadIcon />
                Export CSV
            </button>
        </div>


        {/* Status Message */}
        {statusMessage && (
          <div className="text-center text-sm text-slate-600 p-3 bg-slate-100 rounded-lg">
            <p>{statusMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

