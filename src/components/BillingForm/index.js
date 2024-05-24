import React, { useState } from 'react';
import FormInput from '../Form/FormInput/index';
import Button from '../Form/Button/index';
import './styles.scss';
import { updateUserDeliveryInfo } from '../../rtk/user/userUtils';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../rtk/user/userSlice';
import ReactFlagsSelect from 'react-flags-select';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import { fetchData } from '../../customHooks/useStripe';

const BillingForm = () => {

    //Controls whether we go for the my-account or the check out.
    const location = useLocation();
    const routedState = location.state;
    const noAddress = routedState ? routedState.noAddress : null;
    const products = routedState ? routedState.products : null;

    const user = useSelector(selectCurrentUser);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        return Object.values(formData).every(field => field.trim() !== '');
    };

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        if (validateForm()) {
            try{

                setLoading(true);
                
                await dispatch(updateUserDeliveryInfo(formData, user));
                
                if(noAddress && products) {
                    await fetchData(products);
                    setLoading(false);
                } else {
                    navigator("/myaccount");
                }

                setLoading(false);
            }catch(error){
                setLoading(false);
                //We should create an errors page here.
                console.log("The error when dispatching the updateUserInfo: ",error);
            }
            
        } else {
            console.log("Please fill out all fields.");
        }
    };

    return (
        loading ? (<LoadingSpinner/>) :
            (<div className="form-container1">
            <form className="billing-form" onSubmit={handleOnSubmit}>
                <p className="form-description default-text">Please enter your delivery information</p>
                <p className="form-description mobile-text">Delivery Information</p>
                <FormInput
                    type="text"
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    type="text"
                    name="address"
                    label="Address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />

                <FormInput
                    type="text"
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                />

                <FormInput
                    type="text"
                    name="state"
                    label="State/Governate"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    type="text"
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Enter your postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                />
                
                <label className="countryLabel">Country</label>
                <ReactFlagsSelect
                    className='selectCountry'
                    name="country"
                    onSelect={(code) => {
                        setFormData({ ...formData, country: code });
                    }}
                    selected={formData.country}
                    placeholder="Select Country"
                    searchable
                    searchPlaceholder='Search Countries'
                />   

                <FormInput
                    type="tel"
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
)

    );
};

export default BillingForm;
