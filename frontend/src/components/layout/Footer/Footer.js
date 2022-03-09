import React from 'react'
import { FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa'
import Appstore from '../../../images/Appstore.png'
import Playstore from '../../../images/playstore.png'
import './footer.css'

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download Our App</h4>
                <p>Download app for androi and ios mobile</p>
                <div className="images">
                    <img src={Appstore} alt="playstore" />
                    <img src={Playstore} alt="appstore" />
                </div>
            </div>
            <div className="midFooter">
                <h1>E-Commerce Website</h1>

                <p>High Quality is our first priority</p>
                <p>Copyrights 2021 &copy; @Snigdha_Dutta</p>
            </div>
            <div className="rightFooter">
                <h4>Follow us</h4>
                <div className="images">
                    <a href="www.instagram.com">
                        <FaInstagram color="red" size={40} />
                    </a>
                    <a href="www.youtube.com">
                        <FaYoutube color="red" size={40} />
                    </a>
                    <a href="www.facebook.com">
                        <FaFacebook color="blue" size={40} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
