import React from 'react'

const Sidebar = () => {
    return (
        <>
            {/* <!-- Sidenav start --> */}
            <nav id="sidebar" className="nav-sidebar">
                {/* <!-- Close btn--> */}
                <div id="dismiss">
                    <i className="fa fa-close"></i>
                </div>
                <div className="sidebar-inner">
                    <div className="sidebar-logo">
                        <a href="index.html">
                            <img src="img/logos/black-logo.png" alt="logo" />
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
        </>
    )
}

export default Sidebar