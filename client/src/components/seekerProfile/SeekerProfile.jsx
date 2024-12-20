import React from 'react';
import './seekerPrifile.css';
import Navbar2 from '../navbar2/Navbar2';
import Footer from '../footer/Footer';
import SeekerSideBar from '../seekerSideBar/SeekerSideBar';
import ReadOnlyRating from '../readOnlyRating/ReadOnlyRating';
import Advisor2 from '../../assets/Advisor2.jpg';


const AdvisorReviews = (props) => (
  <div className="seekerprofile-advisorReviews">
    <div className='seekerprofile-advisorReviews-content1'>
      <img src={ props.imgUrl } 
      alt={ props.alt || 'Image' } />
    </div>
    <div className="seekerprofile-advisorReviews-content2">
      <h2>{ props.title }</h2>
      <div className='seekerprofile-advisorReviews-rating'> {props.homeRating}</div>
      <p className='seekerprofile-advisorReviews-desc'>"{props.subtitle}</p>
    </div>  
  </div>
);

const AdvisorReviewsContainer = (props) => (
  <div className="seekerprofile-advisorReviews-container">
    {
      props.reviews.map((review) => (
        <AdvisorReviews title={ review.title }
          personalDes={ review.personalDes }
          imgUrl={ review.imgUrl }
          timeText = {review.timeText} 
          homeRating = {review.homeRating}
          subtitle = {review.subtitle}/>
      ))
    }
  </div>
);

function SeekerProfile() {

  const seekerReviews = [
    {id: 1, homeRating:<ReadOnlyRating/>, title: 'Serenity Stone',subtitle:`“I’ve always struggled with budgeting, but the financial Advisor I connected with made everything so simple. I feel confident in managing my money now`, imgUrl: 'https://unsplash.it/200/200'},
    {id: 2, homeRating:<ReadOnlyRating/>, title: 'Michel Jackson',subtitle:`“I’ve always struggled with budgeting, but the financial Advisor I connected with made everything so simple. I feel confident in managing my money now`, imgUrl: 'https://unsplash.it/201/200'},
    {id: 3, homeRating:<ReadOnlyRating/>, title: 'Serenity Stone',subtitle:`“I’ve always struggled with budgeting, but the financial Advisor I connected with made everything so simple. I feel confident in managing my money now`, imgUrl: 'https://unsplash.it/200/201'},
    {id: 4, homeRating:<ReadOnlyRating/>, title: 'Leo Doe',subtitle:`“I’ve always struggled with budgeting, but the financial Advisor I connected with made everything so simple. I feel confident in managing my money now`, imgUrl: 'https://unsplash.it/200/199'},
    {id: 5, homeRating:<ReadOnlyRating/>, title: 'Jony Dep',subtitle:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, imgUrl: 'https://unsplash.it/200/198'},
    {id: 6, homeRating:<ReadOnlyRating/>, title: 'Karoline Jude',subtitle:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, imgUrl: 'https://unsplash.it/200/200'},
    {id: 7, homeRating:<ReadOnlyRating/>, title: 'charle Jhosep',subtitle:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, imgUrl: 'https://unsplash.it/200/201'},  
  ]

  return (
    <div className='seekerProfile-main'>
      <Navbar2 />
      <div className='seekerprofile-container'>
        <div className='seekerprofile-sidebar'>
          <SeekerSideBar />
        </div>
        <div className='seekerprofile-rightcontainer'>
            <div className='seekerprofile-rightcontainer-top'>
              <div className='seekerprofile-userdetails1'>
                  <div className='seekerprofile-header' >
                    <h1>Nisal Prabhashwara</h1>
                    <div className='seekerprofile-onlinestatus'></div>
                  </div>
                  <hr />
                  <div className='seekerprofile-rating'>
                    <h4>Rating</h4>
                    <ReadOnlyRating/>
                  </div>
                  <p className='seekerprofile-bio'>
                    Hi, I’m Sukumal, a seasoned business consultant specializing in helping entrepreneurs 
                    and small business owners grow and
                    optimize their ventures. With over 15 years of experience across various industries, I’ve worked with startups, established
                    businesses, and everything in between. My expertise ranges from business strategy, financial planning, and operations management 
                    to scaling businesses and improving profitability. <br />
                    My passion is helping others succeed by providing actionable insights and personalized strategies that make a real difference. Whether you’re looking to launch a new business, streamline your operations, or plan for long-term growth, I’m here to help guide
                    you every step of the way. Let’s work together to turn your goals into reality!
                  </p>
                  <h4>My Interests</h4>
                  <p> Business , Astrology , Travelling , Food </p>
              </div>

              <div className='seekerprofile-userdetails2'>
                <div>
                    <img className='seekerprofile-image' src={Advisor2} alt="" />
                </div>
                <button className='seekerprofile-messagingbutton'>Start Messaging</button>
                <h2 className='seekerprofile-language'>Language : English</h2>
                
              </div>


            </div>
            <div className='seekerprofile-rightcontainer-bottom'>
              <div className='seekerprofile-advisor-rewiews-content'>
                <AdvisorReviewsContainer reviews={ seekerReviews } />
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SeekerProfile
