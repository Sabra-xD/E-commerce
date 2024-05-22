import React from 'react';
import FormInput from '../Form/FormInput/index';
import Button from '../Form/Button/index';
import './styles.scss';

const BillingForm = () => {

    const handleOnSubmit = (e)=>{
        
        e.preventDefault();
        //Here we need to make push ALL the information to the user.
        //We also need to use the setUser.

    }
    return (
        <div className="form-container1">
            <form className="billing-form">
                <p className="form-description default-text">Please enter your delivery information</p>
                <p className="form-description mobile-text">Delivery Information</p>
                <FormInput
                    type="text"
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                />
                <FormInput
                    type="text"
                    name="address"
                    label="Address"
                    placeholder="Enter your address"
                    required
                />
                <FormInput
                    type="text"
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    required
                />
                <FormInput
                    type="text"
                    name="state"
                    label="State"
                    placeholder="Enter your state"
                    required
                />
                <FormInput
                    type="text"
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Enter your postal code"
                    required
                />
                <FormInput
                    type="text"
                    name="country"
                    label="Country"
                    placeholder="Enter your country"
                    required
                />
                <FormInput
                    type="tel"
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    required
                />
                <Button type="submit" onClick={(e)=>{
                    handleOnSubmit(e);
                }}>Submit</Button>
            </form>
        </div>
    );
};

export default BillingForm;
