import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import logo from '../../../images/logo.png'
function Header() {
    return (
        <ReactNavbar
            burgerColorHover="#eb4034"
            logo={logo}
            logoWidth="20vmax"
            navColor1="#fffc"
            // navColor2="rgba(0,0,0,0.4)"
            logoHoverSize="10px"
            logoHoverColor="#eb4034"
            link1Text="Home"
            link2Text="Products"
            link3Text="Contact Us"
            link4Text="About Us"
            link1Url="/"
            link2Url="/products"
            link3Url="/contact"
            link4Url="/about"
            link1Size="2.2vmax"
            link2Size="2.2vmax"
            link3Size="2.2vmax"
            link1Color="rgba(35,35,35,0.8)"
            link1ColorHover="#eb4034"
            nav1JustifyContent="flex-end"
            nav2JustifyContent="flex-end"
            nav3JustifyContent="flex-start"
            nav4JustifyContent="flex-start"
            // link2ColorHover="#eb4034"
            link3ColorHover="#eb4034"
            link4ColorHover="#eb4034"
            link1Margin="1vmax"
            link2Margin="1vmax"
            profileIconColor="rgba(35,35,,35,0.8)"
            searchIconColor="rgba(35,35,,35,0.8)"
            cartIconColor="rgba(35,35,,35,0.8)"
            profileIconColorHover="#eb4034"
            searchIconColorHover="#eb4034"
            cartIconColorHover="#eb4034"
            cartIconMargin="1vmax"
            searchIconUrl="/search"
            profileIconUrl="/login"
        />
    )
}

export default Header
