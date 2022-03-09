import React from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import { Facebook, GitHub, YouTube } from '@mui/icons-material'
import devAvatar from '../../../images/dev_avatar.jpeg'
import './About.css'

const About = () => {
    const visitInstagram = () => {
        window.location = 'https://www.instagram.com'
    }

    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>
                <div>
                    <div className="aboutSectionContainer1">
                        <Avatar
                            style={{
                                width: '10vmax',
                                height: '10vmax',
                                margin: '2vmax 0',
                            }}
                            src={devAvatar}
                            alt="Developer"
                        />
                        <Typography>Snigdha Dutta</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This a MERN E-Commerce Website created and devloped
                            by Snigdha Dutta as a part of a independent project
                            for his Protfolio. You can create your own account
                            and test the demo project!
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a href="https://github.com/">
                            <GitHub />
                        </a>
                        <a href="htttps://youtube.com">
                            <YouTube />
                        </a>
                        <a href="https://facebook.com">
                            <Facebook />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
