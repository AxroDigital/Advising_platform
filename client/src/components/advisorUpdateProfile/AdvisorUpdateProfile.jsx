import React, { useState, useEffect } from 'react';
import "./advisorUpdateProfile.css";
import TimezoneSelect from 'react-timezone-select';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer'; 
import Navbar2 from '../navbar2/Navbar2';

const AdvisorUpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    displayName: '',
    qualifications: '',
    certifications: '',
    description: '',
    address: '',
    perMinuteRate: {
      amount: 0,
      currency: 'USD'
    },
    timeZone: {},
    availableDays: [],
    availableHoursstart: '',
    availableHoursend: '',
    languages: '',
    phoneNumber: '',
    email: '',
    paypalpaymentlink: '',
    socialLinks: {
      facebook: '',
      linkedin: '',
      twitter: ''
    },
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing user data if available
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/google-login');
        if (response.ok) {
          const userData = await response.json();
          setProfileData(prevData => ({...prevData, ...userData}));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith('socialLinks.')) {
      // Handle nested socialLinks field update
      const field = name.split('.')[1]; // Extract the key (facebook, linkedin, twitter)
      setProfileData((prevData) => ({
        ...prevData,
        socialLinks: {
          ...prevData.socialLinks,
          [field]: value,
        }
      }));
    } else if (name === 'phoneNumber') {
      // Automatically prepend the "+" sign if it's not there
      let formattedValue = value;
      if (!formattedValue.startsWith("+")) {
        formattedValue = "+" + formattedValue;
      }
      setProfileData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      // Handle other fields
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  

  const handleRateChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      perMinuteRate: {
        ...prevData.perMinuteRate,
        [name]: name === 'amount' || name === 'minutes' ? parseFloat(value) : value
      }
    }));
  };

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.keys(profileData).forEach(key => {
      if (key === 'perMinuteRate' || key === 'socialLinks') {
        formData.append(key, JSON.stringify(profileData[key]));
      } else {
        formData.append(key, profileData[key]);
      }
    });

    formData.append('timeZone', selectedTimezone.value);

    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    try {
      const res = await fetch('http://localhost:5000/api/update-advisor-profile', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        navigate('/advisor-profile');
      } else {
        // Handle error
        console.error('Profile update failed:', data.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='advisor-profile-update-main'>
      <Navbar2 />
      <div className='advisor-profile-update-container'>
        <div className='advisor-profile-update-tipstobuildprofile'>
          <h2 className='advisor-profile-update-tipstobuildprofile-tittle'>Tips to build a good profile</h2>
          <ul className='advisor-profile-update-tipstobuildprofile-list'>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Professional Profile Picture: Use a clear, high-quality headshot that reflects your professionalism.</li>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Compelling Bio: Write a brief, engaging bio that highlights your expertise and how you can help Seeker.</li>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Relevant Expertise: Select categories that best represent your skills—focus on what you excel at.</li>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Competitive Rate: Research other Advisors' rates and set a price that reflects your experience.</li>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Show Experience: Highlight certifications, qualifications, and years of experience.</li>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Update Availability: Keep your schedule current to attract more consultations</li>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Use Keywords: Add relevant keywords naturally to increase profile visibilit</li>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Transparency: Clearly explain what Seekers can expect from your advic</li>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Unique Selling Point: Highlight what makes you stand out—your experience, method, or results.</li>
            <li className='advisor-profile-update-tipstobuildprofile-list-item'>Stay Updated: Regularly refresh your profile with new achievements and experiences.</li>
          </ul>
        </div>
        <form className="advisor-profile-update-form-container" onSubmit={handleSubmit}>
          <h1 className='advisor-profile-update-form-tittle'>Update Your Profile</h1>
          <div className='advisor-profile-update-firstinput-div'>
            <input
              className='advisor-updateform-input1'
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
            />

            <input
              className='advisor-updateform-input1'
              type="text"
              name="displayName"
              value={profileData.displayName}
              onChange={handleInputChange}
              placeholder="Display Name"
              required
            />

            <h4>Add Your Registered Email Address</h4>

            <input
              className='advisor-updateform-input1'
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />

            <input
              className='advisor-updateform-input1'
              type="tel"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
            />

            <input
              className='advisor-updateform-input1'
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />

            <textarea
              className='advisor-updateform-textarea'
              type="text"
              name="qualifications"
              value={profileData.qualifications}
              onChange={handleInputChange}
              placeholder="Professional Qualifications"
            />

            <textarea
              className='advisor-updateform-textarea'
              type="text"
              name="certifications"
              value={profileData.certifications}
              onChange={handleInputChange}
              placeholder="Certifications and other qualifications"
            />

            <textarea 
              className='advisor-updateform-textarea'
              name="description"
              value={profileData.description}
              onChange={handleInputChange}
              placeholder="Short Bio or Description"
              required
            />

            <input
              className='advisor-updateform-input1'
              type="text"
              name="languages"
              value={profileData.languages}
              onChange={handleInputChange}
              placeholder="Languages"
              required
            />

            <h4>1 min/USD</h4>
            <div>
              <input
                className='advisor-updateform-ratefor-amount'
                type="number"
                name="amount"
                value={profileData.perMinuteRate.amount}
                onChange={handleRateChange}
                placeholder="Rate per Minute"
                step="1"
                min="1"
                required
              />
              <select
                className='advisor-updateform-currency'
                name="currency"
                value={profileData.perMinuteRate.currency}
                onChange={handleRateChange}
              >
                <option value="USD">USD</option>
              </select>
            </div>

            <label htmlFor=""> 
              <h4 style={{marginTop:"60px"}}>Add your Profile Photo</h4>
              <input
                className='advisor-updateform-uploadpic'
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                aria-labelledby="firstname"
              />
            </label> 

            
            <label htmlFor="timeZone" style={{marginTop:"40px"}}><h4>Select Time Zone</h4></label>
            <TimezoneSelect
              className='advisor-updateform-timezone'
              value={selectedTimezone}
              onChange={setSelectedTimezone}
            />

            <div className='advisor-available-days'>
              <h4 >Available Days</h4>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <div className='advisor-available-days-item' key={day}>
                  <input
                    className='advisor-updateform-days'
                    type="checkbox"
                    name="availableDays"
                    value={day}
                    onChange={handleInputChange}
                  />
                  {day}
                </div>
              ))}
            </div>

            <h4 style={{marginTop:'60px'}}>Add your Available Hours</h4>

            <div className='advisor-updateform-hours'>
              <input
                className='advisor-updateform-hours-start'
                type="time"
                name="availableHoursstart"
                value={profileData.availableHoursstart}
                onChange={handleInputChange}
                placeholder="Available Hours Start"
                
              />
              <h6>to</h6> 
              <input
                className='advisor-updateform-hours-end'
                type="time"
                name="availableHoursend"
                value={profileData.availableHoursend}
                onChange={handleInputChange}
                placeholder="Available Hours End"
              
              />
            </div>

            <h4>Add your PayPal payment link</h4>

            <input
                className='advisor-updateform-input1'
                type="url"
                name="availableHoursend"
                value={profileData.paypalpaymentlink}
                onChange={handleInputChange}
                placeholder="Payment Link"
                
              />

            <h4>Social Links</h4>
            <input
              className='advisor-updateform-input1'
              type="text"
              name="socialLinks.facebook"
              value={profileData.socialLinks.facebook}
              onChange={handleInputChange}
              placeholder="Facebook URL"
            />
            <input
              className='advisor-updateform-input1'
              type="text"
              name="socialLinks.linkedin"
              value={profileData.socialLinks.linkedin}
              onChange={handleInputChange}
              placeholder="LinkedIn URL"
            />
            <input
              className='advisor-updateform-input1'
              type="text"
              name="socialLinks.twitter"
              value={profileData.socialLinks.twitter}
              onChange={handleInputChange}
              placeholder="Twitter URL"
            />

            <button  className='Advisor-profileUpdatebutton' type="submit">Update Profile</button>
          </div> 
        </form>
        <div className='advisor-profile-update-advantagesasAdvisor'>
          <h2 className='advisor-profile-update-advantagesasAdvisor-tittle'>What advantages you get by becomming an advisor on spiritual insights</h2>
          <ul className='advisor-profile-update-advantagesasAdvisor-tittle-list'>
            <li className='advisor-profile-update-advantagesasAdvisor-tittle-list-item'>
              <h5>Earn on Your Own Terms</h5>
              <p>Set your own rates and get paid per minute for the advice you offer. The more consultations you have, the more you earn. </p>
            </li>
            <li className='advisor-profile-update-advantagesasAdvisor-tittle-list-item'>
              <h5>Flexible Schedule</h5>
              <p>Work when it suits you. You can set your own availability and manage your hours based on your lifestyle. </p>
            </li>
            <li className='advisor-profile-update-advantagesasAdvisor-tittle-list-item'>
              <h5>Build Your Reputation</h5>
              <p>Showcase your expertise, gain reviews from satisfied Seekers, and grow your credibility in your field. </p>
            </li>
            <li className='advisor-profile-update-advantagesasAdvisor-tittle-list-item'>
              <h5>Expand Your Network</h5>
              <p>Connect with people from diverse backgrounds who value your knowledge. Each session is an opportunity to build new professional relationships. </p>
            </li>
            <li className='advisor-profile-update-advantagesasAdvisor-tittle-list-item'>
              <h5>Help Others</h5>
              <p>Use your knowledge and experience to guide Seekers through challenges and help them achieve their goals.  </p>
            </li>
            <li className='advisor-profile-update-advantagesasAdvisor-tittle-list-item'>
              <h5>Grow Professionally</h5>
              <p>Advising others often enhances your own skills and understanding, making you better at your profession while helping. </p>
            </li>
            <li className='advisor-profile-update-advantagesasAdvisor-tittle-list-item'>
              <h5>Global Reach</h5>
              <p>Work with clients from around the world. There are no geographical limitations, allowing you to expand your influence glob.</p>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvisorUpdateProfile;