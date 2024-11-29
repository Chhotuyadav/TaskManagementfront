"use client";
import React, { useState } from "react";

function ChatPage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => prevImages.concat(imageUrls));

    const placeholders = files.map(
      (_, index) => `[Image${selectedImages.length + index + 1}]`
    );
    setMessage((prevMessage) => prevMessage + " " + placeholders.join(" "));
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <section
        className="aai-signup-in"
        style={{
          background:
            "url(/assets/img/sign-in-up.jpeg) center center / cover no-repeat",
        }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-12 d-flex flex-column chat-section">
              <div className="aai-form-wrapper p-4">
                <div className="chat-box flex-grow-1 mb-3 p-3 bg-white border rounded overflow-auto">
                  <div className="chat-message mb-2">
                    <div className="chat-message-inner question">
                      PM Modi’s Vision Fuels Delhi’s Development
                    </div>
                    <div className="answer">
                      Share Join PM Modi on WhatsApp “Delhi has the good fortune
                      to get an opportunity of keeping the flag of nations'
                      prestige flying high.” - PM Narendra Modi as Delhi
                      prepared to host the G20 Summit The last ten years of
                      Prime Minister Narendra Modi’s government have set in
                      motion the creation of a New India—from rural to urban,
                      from water to electricity, from houses to health, from
                      education to employment, from castes to classes—a
                      comprehensive plan bringing growth and prosperity to each
                      doorstep. The National Capital Territory of Delhi has
                      emerged as a pivotal part of this dynamic developmental
                      momentum spearheaded by PM Modi throughout this
                      transformative decade. The city has been at the heart of
                      the infrastructural shift that has given a dedicated
                      facelift to the entire nation. Today infrastructural
                      marvels like Atal Setu, Chenab Bridge, Statue of Unity,
                      and Zojila Tunnel dot India’s ever-evolving landscape.
                      With its focus on revamping transportation networks,
                      upgrading urban amenities, and expanding digital
                      infrastructure, the Modi government has launched an array
                      of transformative initiatives. From railways, highways to
                      airports, these initiatives have been key in galvanising
                      inclusive and sustainable development across the length
                      and breadth of the country. The impressive expansion of
                      the metro rail network has revolutionised urban commuting
                      in India. From a mere 5 cities in 2014, the metro rail
                      network now serves 21 cities across the nation—expanding
                      from 248 km in 2014 to 945 km by 2024, with 919 km of
                      lines under construction in 26 additional cities. The
                      Union Cabinet has recently approved two new corridors of
                      Delhi Metro Phase-IV—Lajpat Nagar to Saket G-Block and
                      Inderlok to Indraprastha. Both the lines have a combined
                      length of over 20 kms with a project cost of over Rs.
                      8,000 crore (funding being sourced from the Union Govt,
                      Govt of Delhi, and international agencies). The Inderlok-
                      Indraprastha line will play a significant role in
                      enhancing connectivity to the Bahadurgarh region of
                      Haryana. Additionally, India’s first Namo Bharat train,
                      operating on the Delhi-Meerut Regional Rapid Transit
                      System (RRTS) corridor further underlines the Modi
                      government’s commitment to enhancing regional connectivity
                      and upgrading its transportation infrastructure. Further,
                      the Bharatmala Pariyojana envisages improved logistics
                      efficiency and connectivity via the development of nearly
                      35,000 km of National Highway corridors. 25 greenfield
                      high-speed corridors have been planned under the plan out
                      of which four intersect with Delhi’s growing infra
                      capacity: Delhi-Mumbai Expressway, Delhi-Amritsar-Katra
                      Expressway, Delhi-Saharanpur-Dehradun Expressway, and the
                      Urban Extension Road-II. The total project length
                      sanctioned for Delhi is 203 km with an allocation of over
                      Rs. 18,000 crore. Over the past decade, the Modi
                      government has consistently dedicated efforts towards
                      augmenting capacity and decongestion of airports. After
                      the IGI Airport Delhi became the first airport in the
                      country to have four runways and an elevated taxiway, the
                      expanded state-of-the-art Terminal 1 has also been
                      inaugurated recently. In addition, the upcoming Noida
                      International Airport (Jewar) shall further contribute to
                      decongestion of the Delhi airport which is serving
                      millions of passengers annually.
                      {/* New div wrapper for the button */}
                      <div className="button-container">
                        <button
                          className="aai-gradient-outline-btn play-btn"
                          title="Explain"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 3l14 9-14 9V3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="chat-message-inner question">
                      PM Modi’s Vision Fuels Delhi’s Development
                    </div>
                  </div>
                </div>

                <div className="aai-form-container d-flex align-items-center custom-input">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="form-control me-2"
                    style={{ display: "none" }} // Hide the actual input
                  />

                  <label
                    htmlFor="file-upload"
                    className="btn btn-outline-secondary me-2"
                    style={{ cursor: "pointer" }}
                    title="Select One Or More Images"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </label>

                  {/* Display image thumbnails above textarea */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {selectedImages.length > 0 &&
                      selectedImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Uploaded Preview ${index}`}
                          style={{
                            height: "50px",
                            width: "50px",
                            objectFit: "cover",
                            marginRight: "5px",
                            borderRadius: "4px",
                            border: "1px solid",
                          }}
                        />
                      ))}
                  </div>

                  <textarea
                    onChange={handleMessageChange}
                    placeholder="Type your message..."
                    className="form-control shadow-none me-2"
                    rows={1}
                    style={{
                      resize: "none",
                      width: "100%",
                      maxHeight: "150px",
                      overflowY: "auto",
                    }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${Math.min(
                        e.target.scrollHeight,
                        150
                      )}px`;
                    }}
                  />

                  <button className="aai-btn btn-pill-solid">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChatPage;
