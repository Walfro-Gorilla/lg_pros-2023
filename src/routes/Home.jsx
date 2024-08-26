import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../context/UserProvider'
import { Button, Carousel, Modal, Row, Space, Typography } from 'antd'

import Login from './Login'

const { Text } = Typography;

// HOOKS
import { useFirestore } from '../hooks/useFirestore'
import Sidebar from '../components/Sidebar'





const Home = () => {

  // states e lainfo de la pagina
  const [logoURL, setLogoURL] = useState('')


  const {
    data, error, loading, getData
  } = useFirestore()

  useEffect(() => {
    // Obtenemos la info de la BD
    getData()


    console.log(data ? data : 'aun no carga...')
  }, [])

  // setLogoURL(data ? data[0].logoURL : '')
  // Evaluamos error y loading antes de mostrar compoente
  if (loading.getData) return <p>Loading Data...</p>
  if (error) return <p>{error}</p>

  return (
    <div>







      {/* <!-- Sidenav start --> */}
      <nav id="sidebar" className="nav-sidebar">
        {/* <!-- Close btn--> */}
        <div id="dismiss">
          <i className="fa fa-close"></i>
        </div>
        <div className="sidebar-inner">
          <div className="sidebar-logo">
            <a href="index.html">
              <img src={data.logoURL} alt="logo" />
            </a>
          </div>
          <div className="sidebar-navigation">
            <h3 className="heading">Menu</h3>
            <ul className="menu-list">
              <li>
                <a href="index.html" className="active pt0">Home </a>
              </li>

              <li>
                <a href="services.html">Services</a>
              </li>

              <li>
                <a href="about.html">About</a>
              </li>

              {/* <!-- <li>
                <a href="contact.html">Contact</a>
              </li> --> */}
            </ul>
          </div>
          <div className="get-in-touch">
            <h3 className="heading">Get in Touch</h3>
            <div className="media">
              <i className="flaticon-phone"></i>
              <div className="media-body">
                <a href="tel:1-915-474-1087"><i className="fa fa-phone"></i>{data.telephone}</a>
              </div>
            </div>
            <div className="media">
              <i className="flaticon-mail"></i>
              <div className="media-body">
                <a href="#">info@LGProshvac.com</a>
              </div>
            </div>
            <div className="media mb-0">
              <i className="flaticon-earth"></i>
              <div className="media-body">
                <a href="#">www.LGProshvac.com</a>
              </div>
            </div>
          </div>
          <div className="get-social">
            <h3 className="heading">Get Social</h3>
            <a href="https://www.facebook.com/lgproselp" className="facebook-bg">
              <i className="fa fa-facebook"></i>
            </a>

          </div>
        </div>
      </nav>
      {/* <!-- Sidenav end --> */}

      <Navbar data={data ? data : []} />

      {/* <!-- Banner start --> */}
      <div className="banner banner-3" id="banner">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner banner-slider-inner text-center">
            <Carousel autoplay >

              <div className="carousel-item banner-max-height active item-bg">
                <img className="d-block w-100 h-100" src="img/banner/img-5.png" alt="banner" />
                <div className="carousel-content container banner-info-2">
                </div>
              </div>
              <div className="carousel-item banner-max-height item-bg">
                <img className="d-block w-100 h-100" src="img/banner/img-1.png" alt="banner" />
                <div className="carousel-content container banner-info-2"></div>
              </div>
              <div className="carousel-item banner-max-height item-bg">
                <img className="d-block w-100 h-100" src="img/banner/img-2.png" alt="banner" />
              </div>
            </Carousel>
          </div>

          <div className="bs">
            <div className="container">
              <div className="row">
                <div className="col-6 col-md-8">
                  <div className="banner-info-inner">

                    <h3>Heating & Cooling</h3>
                    <h3><span>Services</span></h3>
                    <h5>Get the best performance from your</h5>
                    <Row>
                      <Space>
                        <Button type='primary'>
                          <Text style={{ color: '#fff' }}>
                            FREE estimate
                          </Text>
                        </Button>
                        <a
                          href="https://www.bbb.org/us/tx/el-paso/profile/heating-and-air-conditioning/lg-pros-heating-and-cooling-llc-0895-99151719">
                          <img className="img_partner" src="img/brand/BBB-Logo.png" alt="partenr" />
                        </a>
                      </Space>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
        </div>
      </div>
      {/* <!-- Banner end --> */}

      {/* <!-- Search box 3 start */}
      <div className="search-box-3 sb-7">
        <div className="container">
          <div className="search-area-inner">
            <div className="search-contents">
              <form method="GET">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                    <div className="form-group">
                      <select className="selectpicker search-fields" name="select-brand">
                        <option>Select Brand</option>
                        <option>Audi</option>
                        <option>BMW</option>
                        <option>Honda</option>
                        <option>Nissan</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                    <div className="form-group">
                      <select className="selectpicker search-fields" name="select-make">
                        <option>Select Make</option>
                        <option>BMW</option>
                        <option>Honda</option>
                        <option>Lamborghini</option>
                        <option>Sports Car</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                    <div className="form-group">
                      <select className="selectpicker search-fields" name="select-location">
                        <option>Select Location</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                    <div className="form-group">
                      <select className="selectpicker search-fields" name="select-year">
                        <option>Select Year</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                    <div className="form-group">
                      <select className="selectpicker search-fields" name="select-type">
                        <option>Select Type Of Car</option>
                        <option>New Car</option>
                        <option>Used Car</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                    <div className="form-group">
                      <select className="selectpicker search-fields" name="transmission">
                        <option>Transmission</option>
                        <option>Automatic</option>
                        <option>Manual</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                    <div className="form-group">
                      <div className="range-slider">
                        <div data-min="0" data-max="150000" data-unit="USD" data-min-name="min_price" data-max-name="max_price" className="range-slider-ui ui-slider" aria-disabled="false"></div>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                    <div className="form-group">
                      <button className="btn btn-block button-theme btn-md">
                        <i className="fa fa-search"></i>Find
                      </button>
                    </div>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Search box 3 end --> */}


      {/* <!-- partenrs start --> */}

      <div className="content-area-logos">
        <div className="container">
          <div className="row">

            <div className="col-lg-6 parent">
              <img className="child" src="img/brand/Champion-Logo.png" alt="logo" />
            </div>

            <div className="col-lg-6 parent">
              <h5 align="justify">
                As a Champion HVAC Contractor, it's important that your home comfort system fits your needs,
                your lifestyle and your budget. That's why we'll work with you every step of the way, beyond
                installation, to ensure your system runs smoothly for years to come. From heating to cooling to
                indoor air quality, we will specify an HVAC solution that provides you with optimal comfort,
                exceptional energy savings and lasting performance.
              </h5>
            </div>


          </div>
        </div>

      </div>

      {/* <!-- partenrs end --> */}


      {/* <!-- services-2 start --> */}
      <div className="services-2 content-area">
        <div className="container">
          {/* <!-- Main title --> */}
          <div className="main-title text-center">
            <h1>Our Services</h1>
            <p>
              We are experts in the sale, installation, repair and maintenance of commercial, residential and
              comercial air conditioning equipment for more than 3 years.
            </p>
          </div>
          <div className="row">

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="service-info-2">
                <div className="icon">
                  <img className="logo-panel" src="./img/flaticons/minisplit.png" alt="" />
                </div>
                <div className="detail">
                  <h3>Instalations</h3>
                  <p>HVAC, Minisplits & Heat Pumps</p>
                  <a href="instalations.html" className="read-more">Read more...</a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="service-info-2">
                <div className="icon">
                  <img className="logo-panel" src="./img/flaticons/air-conditioner.png" alt="" />
                </div>
                <div className="detail">
                  <h3>Duct Work</h3>
                  <p>We work ducts that are required by the client</p>
                  <a href="duct_work.html" className="read-more">Read more...</a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="service-info-2">
                <div className="icon">
                  <img className="logo-panel" src="./img/flaticons/medical-report.png" alt="" />
                </div>
                <div className="detail">
                  <h3>Diagnostics</h3>
                  <p>We carry out professional diagnoses to your facilities</p>
                  <a href="diagnostic.html" className="read-more">Read more...</a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="service-info-2">
                <div className="icon">
                  <img className="logo-panel" src="./img/flaticons/maintenance.png" alt="" />
                </div>
                <div className="detail">
                  <h3>Maintance</h3>
                  <p>
                    Save money and extend the life of your products.
                  </p>
                  <a href="maintances.html" className="read-more">Read more...</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- services-2 end --> */}

      {/* <!-- Service center strat --> */}
      <div className="service-center content-area-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="inside-car service-car">
                <iframe
                  src="https://firebasestorage.googleapis.com/v0/b/lg-pros.appspot.com/o/Champion-Cooling-Season%20RV1.mp4?alt=media&token=66b09c2b-3cda-4e9f-a945-53528cff3a47"
                  allowFullScreen=""></iframe>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="best-used-car">
                <h3>Welcome to LG-Pros</h3>
                <p align="justify">LG Pros, emerged in the year of 2019, with the firm idea of providing the
                  best specialized
                  service in heating and cooling to the homes and businesses of the residents of El Paso, TX
                  and surroundings. Performing in each of our jobs a guaranteed and high
                  quality service, with honesty and integrity, always seeking to obtain the satisfaction of
                  our customers, since we work with the best brands in the market.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Service center end --> */}


      {/* <!-- Testimonial start --> */}
      <div className="testimonial-4 content-area-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Main title --> */}
              <div className="main-title">
                <h1>Our Testimonial</h1>
                <p>See what our customers say...</p>
              </div>
            </div>
            <div className="col-lg-12">
              {/* <!-- Slick slider area start --> */}
              <div className="slick-slider-area">
                <div >

                  {/* Agregamos el Carousel*/}
                  <Carousel autoplay>
                    <div>
                      <div className="testimonial-info">
                        <div className="user-section">
                          <div className="user-thumb">
                            <img src="img/avatar/avatar-1.png" alt="testimonial" />
                            <div className="icon">
                              <i className="fa fa-quote-right"></i>
                            </div>
                          </div>
                          <div className="user-name">
                            <h5>Edwin Gonzalez</h5>
                            <p>Consultant</p>
                          </div>
                        </div>
                        <div className="text">
                          <p>
                            "My heater stopped working and I called them and that same day they fixed my
                            problem. "
                          </p>
                        </div>
                      </div>
                    </div>
                    <div >
                      <div className="testimonial-info">
                        <div className="user-section">
                          <div className="user-thumb">
                            <img src="img/avatar/avatar-2.png" alt="testimonial" />
                            <div className="icon">
                              <i className="fa fa-quote-right"></i>
                            </div>
                          </div>
                          <div className="user-name">
                            <h5>Anne Brady</h5>
                            <p>Web Designer, Uk</p>
                          </div>
                        </div>
                        <div className="text">
                          <p>
                            "Luis and Hector are such professionals, and very expert at what they do. We
                            could not be happier with the way they performed their jobs here!"
                          </p>
                        </div>
                      </div>
                    </div>
                    <div >
                      <div className="testimonial-info">
                        <div className="user-section">
                          <div className="user-thumb">
                            <img src="img/avatar/avatar-3.png" alt="testimonial" />
                            <div className="icon">
                              <i className="fa fa-quote-right"></i>
                            </div>
                          </div>
                          <div className="user-name">
                            <h5>Cynthia Rios</h5>
                            <p>Designer</p>
                          </div>
                        </div>
                        <div className="text">
                          <p>
                            "Excelente servicio. Instalación Rápida y muy buen costo !! recomendados!."
                          </p>
                        </div>
                      </div>
                    </div>
                  </Carousel>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Testimonial end --> */}


      {/* <!-- Featured  start --> */}
      <div className="featured-car content-area-5">
        <div className="container">
          {/* <!-- Main title --> */}
          <div className="main-title">
            <h1>Featured Services</h1>
            <p>
              Offering air conditioning solutions focused on the wellness and comfort of the market, for more than
              10 years, the brand has been backed by service and support throughout El Paso, Texas.
            </p>
          </div>
          {/* <!-- Slick slider area start --> */}
          <div className="slick-slider-area clearfix">
            {/* <div className="row slick-carousel"
              data-slick='{"slidesToShow": 2, "responsive":[{"breakpoint": 1024,"settings":{"slidesToShow": 2}}, {"breakpoint": 768,"settings":{"slidesToShow": 1}}]}'> */}
            <Carousel autoplay>

              <div className="slick-slide-item">
                <div className="car-box-4 car-photo-1">
                  <div className="tag-2 bg-active">For Sale</div>
                  <div className="ling-section">
                    <h3>
                      <a href="">Minisplit</a>
                    </h3>
                    <ul className="facilities-list clearfix">

                      <li>
                        <strong>Fan:</strong> 3-speed
                      </li>
                      <li>
                        <strong>Refrigerant:</strong>R-410A
                      </li>
                    </ul>
                    <a href="services.html" className="read-more-btn">Read More</a>
                  </div>
                </div>
              </div>
              <div className="slick-slide-item">
                <div className="car-box-4 car-photo-3">
                  <div className="tag-2 bg-active">Service</div>
                  <div className="ling-section">
                    <h3>
                      <a href="">Minsplit</a>
                    </h3>
                    <ul className="facilities-list clearfix">

                      <li>
                        <strong>Fan:</strong> 5-speed
                      </li>
                      <li>
                        <strong>Refrigerant:</strong>R-410A
                      </li>
                    </ul>
                    <a href="services.html" className="read-more-btn">Read More</a>
                  </div>
                </div>
              </div>
              <div className="slick-slide-item">
                <div className="car-box-4 car-photo-4">
                  <div className="tag-2 bg-active">installation</div>
                  <div className="ling-section">
                    <h3>
                      <a href="">Cooling & Heating</a>
                    </h3>
                    <ul className="facilities-list clearfix">

                      <li>
                        <strong>Fan:</strong> 5-speed
                      </li>
                      <li>
                        <strong>Refrigerant:</strong>R-410A
                      </li>
                    </ul>
                    <a href="services.html" className="read-more-btn">Read More</a>
                  </div>
                </div>
              </div>
              <div className="slick-slide-item">
                <div className="car-box-4 car-photo-2">
                  <div className="tag-2 bg-active">Service</div>
                  <div className="ling-section">
                    <h3>
                      <a href="">Business Service</a>
                    </h3>
                    <ul className="facilities-list clearfix">
                      <li>
                        <strong>Fuel:</strong> Gasoline
                      </li>

                      <li>
                        <strong>Gear:</strong> 5
                      </li>

                      <li>
                        <strong>Category:</strong> Bussines
                      </li>
                    </ul>
                    <a href="services.html" className="read-more-btn">Read More</a>
                  </div>
                </div>
              </div>
            </Carousel>

            {/* </div> */}
            <div className="slick-prev slick-arrow-buton">
              <i className="fa fa-angle-left"></i>
            </div>
            <div className="slick-next slick-arrow-buton">
              <i className="fa fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Featured car end --> */}








      {/* <!-- Counters 3 strat --> */}
      <div className="counters-3">

        <div className="container">
          <div className="row">

            <div className="col-lg-4 col-md-6 col-sm-6 border-l border-r">
              <div className="counter-box-3">
                <div className="icon">
                  <i className="flaticon-earth"></i>
                </div>
                <h1 className="counter">120</h1>
                <h5>Total Homes

                </h5>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 border-r">
              <div className="counter-box-3">
                <div className="icon">
                  <i className="flaticon-blog"></i>
                </div>
                <h1 className="counter">17</h1>
                <h5>Dealer Reviews</h5>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 border-r">
              <div className="counter-box-3">
                <div className="icon">
                  <i className="flaticon-user"></i>
                </div>
                <h1 className="counter">86</h1>
                <h5>Happy Clients</h5>
              </div>
            </div>



          </div>
        </div>

      </div>
      {/* <!-- Counters 3 end --> */}

      {/* <!-- Contact 2 start --> */}
      <div className="contact-2 content-area-5">
        <div className="container">
          {/* <!-- Main title --> */}
          <div className="main-title text-center">
            <h1>Service Schedule</h1>
            <p>Contact us now! and get a FREE estimate</p>
            <p>HABLAMOS</p>
            <br />
            <span className="w3-tag w3-xlarge w3-padding w3-red" style={{ transform: 'rotate(-10deg)' }}>
              ESPAÑOL
            </span>
          </div>
          <form action="#" method="GET" encType="multipart/form-data">
            <div className="row">
              <div className="col-lg-7">
                <div className="row">
                  <div className="col-md-6 text-left">
                    <div className="form-group name">
                      <input type="text" name="name" className="form-control" placeholder="Name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group email">
                      <input type="email" name="email" className="form-control" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group subject">
                      <input type="text" name="subject" className="form-control" placeholder="Subject" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group number">
                      <input type="text" name="phone" className="form-control" placeholder="Number" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group message">
                      <textarea className="form-control" name="message"
                        placeholder="Write message"></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="send-btn text-center">
                      <button type="submit" className="btn btn-5">Send Message</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="contact-info-2">
                  <div className="ci-box">
                    <div className="icon">
                      <i className="flaticon-phone"></i>
                    </div>
                    <div className="detail">
                      <h5>Phone:</h5>
                      <p><a href="#">1-915-474-1087</a></p>
                    </div>
                  </div>
                  <div className="ci-box">
                    <div className="icon">
                      <i className="flaticon-mail"></i>
                    </div>
                    <div className="detail">
                      <h5>Email:</h5>
                      <p><a href="#">info@LGProshvac.com</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <!-- Contact 2 end --> */}





      {/* <!-- Footer start --> */}
      <footer className="footer overview-bgi">
        <div className="container footer-inner">
          <div className="row">
            <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6">
              <div className="footer-item clearfix">
                <h1>LG-Pros</h1>
                <div className="s-border"></div>
                <div className="m-border"></div>
                <div className="text">
                  <p>We are experts in cooling and heating, our commitment is that our client is completely
                    satisfied.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="footer-item clearfix">
                <h4>
                  Contact Info
                </h4>
                <div className="s-border"></div>
                <div className="m-border"></div>
                <ul className="contact-info">
                  <li>
                    <i className="flaticon-pin"></i>Socorro, Texas 79927, EE. UU.
                  </li>
                  <li>
                    <i className="flaticon-mail"></i><a
                      href="mailto:info@LGProshvac.com">info@LGProshvac.com</a>
                  </li>
                  <li>
                    <i className="flaticon-phone"></i><a href="tel:+1-915-474-1087">+1-915-474-1087</a>
                  </li>

                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="footer-item clearfix">
                <h4>Subscribe</h4>
                <div className="s-border"></div>
                <div className="m-border"></div>
                <div className="Subscribe-box">
                  <p>Subscribe to get update and information. Don't worry, we won't send spam!.</p>
                  <form className="form-inline" action="#" method="GET">
                    <input type="text" className="form-control mb-sm-0" id="inlineFormInputName3"
                      placeholder="Email Address" />
                    <button type="submit" className="btn"><i className="fa fa-paper-plane"></i></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sub-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <p className="copy">© 2021 <a href="#">LG-Pros.</a> All Rights Reserved.</p>
              </div>
              <div className="col-lg-6">
                <div className="social-list-2">
                  <ul />
                  <li><a href="https://www.facebook.com/lgproselp" className="facebook-bg"><i
                    className="fa fa-facebook"></i></a></li>

                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Footer end --> */}

      {/* <!-- Full Page Search --> */}
      <div id="full-page-search">
        <button type="button" className="close">×</button>
        <form action="index.html#">
          <input type="search" placeholder="type keyword(s) here" />
          <button type="submit" className="btn btn-sm button-theme">Search</button>
        </form>
      </div>

      {/* <!-- Car Overview Modal --> */}
      <div className="car-model-2">
        <div className="modal fade" id="carOverviewModal" tabIndex="-1" role="dialog"
          aria-labelledby="carOverviewModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title" id="carOverviewModalLabel">
                  <h4>Find Your Dream Car</h4>
                  <h5><i className="flaticon-pin"></i> 123 Kathal St. Tampa City,</h5>
                </div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row modal-raw">
                  <div className="col-lg-6 modal-left">
                    <div className="item active">
                      <img src="img/car-11.png" alt="best-car" className="img-fluid" />
                      <div className="sobuz">
                        <div className="price-box">
                          <span className="del"><del>$950.00</del></span>
                          <br />
                          <span className="del-2">$1050.00</span>
                        </div>
                        <div className="ratings-2">
                          <span className="ratings-box">4.5/5</span>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i> ( 7 Reviews )
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 modal-right">
                    <div className="modal-right-content">
                      <section>
                        <h3>Features</h3>
                        <div className="features">
                          <ul className="bullets">
                            <li>Cruise Control</li>
                            <li>Airbags</li>
                            <li>Air Conditioning</li>
                            <li>Alarm System</li>
                            <li>Audio Interface</li>
                            <li>CDR Audio</li>
                            <li>Seat Heating</li>
                            <li>ParkAssist</li>
                          </ul>
                        </div>
                      </section>
                      <section>
                        <h3>Overview</h3>
                        <ul className="bullets">
                          <li>Model</li>
                          <li>Year</li>
                          <li>Condition</li>
                          <li>Price</li>
                          <li>Audi</li>
                          <li>2020</li>
                          <li>Brand New</li>
                          <li>$178,000</li>
                        </ul>
                      </section>
                      <div className="description">
                        <h3>Description</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          Lorem Ipsum has been the comercial's standard.</p>
                        <a href="car-details.html" className="btn btn-md btn-round btn-theme">Show
                          Detail</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--START WA Code --> */}
      <a href="https://wa.me/+19154741087?text=Me%20interesa%20el%20algun%20servicio%20de%20Cooling%20&%20Heating."
        className="whatsapp" target="_blank">
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
      {/* <!--END WA Code --> */}


    </div>
  )
}

export default Home