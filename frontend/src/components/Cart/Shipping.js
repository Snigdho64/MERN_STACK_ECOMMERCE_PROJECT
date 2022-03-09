import {
    AddLocationTwoTone,
    HomeTwoTone,
    LocationCityTwoTone,
    PhoneCallbackTwoTone,
    PublicTwoTone,
    PushPinTwoTone,
} from '@mui/icons-material'
import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Metadata from '../layout/Metadata'
import { City, Country, State } from 'country-state-city'
import './Shipping.css'
import CheckoutSteps from './CheckoutSteps'
import { saveShippingInfo } from '../../actions/cartAction'

const Shipping = () => {
    const { shippingInfo } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    const shippingSubmit = (e) => {
        e.preventDefault()
        if (phoneNo.length !== 10) return alert.error('Phone No must be valid')
        dispatch(
            saveShippingInfo({
                country,
                state,
                city,
                pinCode,
                phoneNo,
                address,
            })
        )
        navigate('/confirm')
    }

    return (
        <>
            <Metadata title="Shipping" />
            <CheckoutSteps activeStep={0} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2>Shipping Details</h2>
                    <form className="shippingForm" onSubmit={shippingSubmit}>
                        <div>
                            <PublicTwoTone />
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country.getAllCountries().map((country) => (
                                    <option
                                        value={country.isoCode}
                                        key={country.isoCode}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {country && (
                            <div>
                                <AddLocationTwoTone />
                                <select
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State.getStatesOfCountry(country).map(
                                        (state) => (
                                            <option
                                                value={state.isoCode}
                                                key={state.isoCode}
                                            >
                                                {state.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        )}
                        {country && state && (
                            <div>
                                <LocationCityTwoTone />
                                <select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option value="">City</option>
                                    {City.getCitiesOfState(country, state).map(
                                        (city) => (
                                            <option
                                                value={city.name}
                                                key={city.name}
                                            >
                                                {city.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        )}
                        <div>
                            <PushPinTwoTone />
                            <input
                                type="number"
                                value={pinCode}
                                placeholder="PinCode"
                                required
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <HomeTwoTone />
                            <textarea
                                type="text"
                                value={address}
                                placeholder="Address"
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <PhoneCallbackTwoTone />
                            <input
                                type="number"
                                placeholder="Phone No"
                                required="required"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value={'Save and Continue'}
                            className="shippingButton"
                            disabled={city ? false : true}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping
