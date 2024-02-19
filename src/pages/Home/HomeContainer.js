import React from "react";
import {AppLayout} from "src/components/AppLayout/AppLayout";
import "./Home.css"
import MainButton from "../../components/MainButton";
import {FaBookReader, FaFacebookSquare} from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { CgScreen } from "react-icons/cg";
import {IconContext} from "react-icons";
import ContactUs from "./components/ContactUs";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Footer from "../../components/AppLayout/Footer";
import {LEARNING_CENTER} from "src/navigation/CONSTANTS";
import {useHistory} from "react-router-dom";

// TODO: remove redundant css and remove fixed height and replaced with dynamic height
export default function HomeContainer() {
    let history = useHistory();
    const handleGetStarted = () => {
        history.push(LEARNING_CENTER)
    }

    return (
      <AppLayout>
          <IconContext.Provider value={{color: "#FF9900", size:"45px" }}>
              <div>
                  <div className="home-container">
                      {/*background not working */}
                      <div className="home-section1" /*style={{ background: "url(" + Background+ ")" }}*/>
                          <h1>Elevate Your English with Accountable Learning :) </h1>
                          <div className="home-p1">
                              At ACCOUNTABLE, we're not just an English learning platform;
                              we're your partners in progress. Embrace a personalized journey
                              with accountability fueling your growth.
                          </div>
                          <MainButton
                              btnLabel="Get Started"
                              onClick={handleGetStarted}
                              className = "Get-Start-Button"
                          />
                      </div>

                      <div className="home-section2">
                          <h1 className={"mb-30"}>
                              Why Choose Us
                          </h1>
                          <div className="three-icons">
                              <div className="icon-section">
                                  <FaBookReader />
                                  <span className="ft-30">
                                        Personalized Approach
                                  </span>
                                  <span className={"home-p2"}>
                                      Tailoring your learning experience to your unique pace and preferences.
                                  </span>
                              </div>

                              <div className="icon-section">
                                  <FaUsers />
                                  <span className="ft-30">
                                      Accountability
                                  </span>
                                  <span className={"home-p2"}>
                                      We stand by you, guiding your growth and progress every step of the way.
                                  </span>
                              </div>

                              <div className="icon-section">
                                  <CgScreen />
                                  <span className="ft-30">
                                      Engaging Learning
                                  </span>
                                  <span className={"home-p2"}>
                                      Experience dynamic lessons and interactive challenges.
                                  </span>
                              </div>
                          </div>
                      </div>
                      <div className="home-section3">
                          <div className="about-us" >
                              <div>
                                  <div className="ft-30">
                                      About Us
                                  </div>
                                  <span>
                                      At ACCOUNTABLE, we believe that learning English is more than acquiring a language; it's a journey of personal growth and empowerment. We are not just an English learning platform; we are your dedicated partners in progress.
                                  </span>
                              </div>
                              <div>
                                  <div className="ft-30">
                                      Our Vision
                                  </div>
                                  <span>
                                      At ACCOUNTABLE, we envision a world where language learning transcends conventional boundaries. We believe that proficiency in English is not just a skill; it's a pathway to personal and professional empowerment. Our mission is to redefine language education by seamlessly integrating personalized progress and accountability into every learning experience.
                                  </span>
                              </div>
                          </div>

                          <div className={"contact-form"}>
                              <div className="ft-30">
                                  Get in Touch!
                              </div>
                              <span>
                                      Feel free to ask any question!
                              </span>
                              <div>
                                  <ContactUs/>
                              </div>
                          </div>
                      </div>
                      <div className="home-section4">
                          <FaTwitterSquare />
                          <FaInstagram />
                          <FaFacebookSquare />
                      </div>
                      <Footer/>
                  </div>
              </div>
          </IconContext.Provider>
      </AppLayout>
    );
}
