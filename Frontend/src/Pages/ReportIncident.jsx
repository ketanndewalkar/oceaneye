import React from "react";

const ReportIncident = () => {
  return (
    <>
      <div className="w-screen h-fit pt-[15vh] px-[5vw] py-[1vw]">
        <div className="size-full flex justify-between gap-[1vw]">
          <div className="w-1/2 h-screen border-1 flex flex-col justify-between p-[1vw] gap-[1vw]">
            <div className="h-1/3 w-full border-1 rounded-lg p-[1.5vw]">
              <h1 className="text-[2vw] text-gray-700 font-bold">
                Report an issue in your area
              </h1>
              <p className="text-[1vw] font-semibold">
                Help city making better by submitting real time ocean hazard
                report and help save lives
              </p>
            </div>
            <p className=" w-full text-center font-bold text-2xl">
              Powered By You , Verified By Us
            </p>
            <div className="h-full w-full border-1 rounded-lg p-[0.5vw] flex flex-col gap-[1vw]">
              <h1 className=" text-center text-[1.5vw] font-bold text-gray-700">
                Report Hazard
              </h1>
              <div className="w-full h-full border-1">
                
              </div>
            </div>
          </div>
          <div className="rounded-lg w-1/2 h-full border-1 p-[1.5vw] flex flex-col gap-[1vw]">
            <h1 className=" text-center text-[1.5vw] font-bold text-gray-700">
              Report Hazard
            </h1>
            <div className="w-full h-full border-1">
              <form action="#" method="post" enctype="multipart/form-data">
                  <label for="hazardType" className="text-[1.2vw]">Hazard type:</label>
                  <select id="hazardType" name="hazardType" className="border-1 rounded-lg ml-[0.5vw]" required>
                    <option value=""> Select hazard type </option>
                    <option value="fire">Fire</option>
                    <option value="flood">Flood</option>
                    <option value="chemical">Chemical spill</option>
                    <option value="landslide">Landslide</option>
                    <option value="structural">Structural damage</option>
                    <option value="medical">Medical emergency</option>
                    <option value="other">Other</option>
                  </select>

                  <br />
                  <br />

                  <label for="description" className="text-[1.2vw]">Description:</label>
                  <br />
                  <textarea
                    id="description"
                    name="description"
                    rows="6"
                    cols="60"
                    placeholder="Describe the hazard..."
                    required
                    className="border-1 w-full rounded-lg"
                  ></textarea>

                  <br />
                  <br />

                  <label for="media">Upload media (images, video, audio)</label>
                  <input
                    id="media"
                    name="media[]"
                    type="file"
                    accept="image/*,video/*,audio/*"
                    multiple
                  />

                  <br />
                  <br />

                  <label for="enableLocation">
                    <input
                      id="enableLocation"
                      name="enableLocation"
                      type="checkbox"
                      value="1"
                    />
                    Enable device location (use browser geolocation if
                    available)
                  </label>

                  <br />
                  <br />

                  <fieldset>
                    <legend>Manual location (optional)</legend>

                    <label for="address">Address / place name</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="e.g. 123 Main St, Springfield"
                    />

                    <br />
                    <br />

                    <label for="latitude">Latitude</label>
                    <input
                      id="latitude"
                      name="latitude"
                      type="text"
                      inputmode="decimal"
                      placeholder="e.g. 18.5204"
                    />

                    <label for="longitude">Longitude</label>
                    <input
                      id="longitude"
                      name="longitude"
                      type="text"
                      inputmode="decimal"
                      placeholder="e.g. 73.8567"
                    />
                  </fieldset>

                  <br />

                  <button type="submit">Submit report</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportIncident;
