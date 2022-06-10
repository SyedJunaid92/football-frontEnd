import React from 'react';
import Donationform from './Donationform';
import { loadStripe } from '@stripe/stripe-js';

const Donation = () => 
{

    const handleClick = async () => {
       
        const stripe = await loadStripe(
          "pk_test_51HzOLtFInCs7SYApghcrqISbnhH0JW3i8i2J8Ntt1VfLAX6t1ozDriNzvD25fQzDtfadDhYC8OzBf1WFOkxK8MPx00GwL2lvwK"
        );
        const { result } = await stripe.redirectToCheckout({
          lineItems: [
            {
              price: "price_1KtFV0FInCs7SYApJqtwjnbc",
              quantity: 1,
            },
          ],
          mode: "payment",
          successUrl: "http://localhost:3000/donation",
          cancelUrl: "http://localhost:3000/login",
        });
      };
    const Donationform1 = (e)=>{

        // e.preventDefault();
        window.location.replace('/Donationform')
      }
    
  return <>
        <div>
        <img src='./images/iii.jpeg' className='bggimg'/>
            <h1 className='centerr'>D O N A T I O N</h1>
            <p className='centerr1'>“Sport has the power to change the world. It has the power to inspire. It has the power to unite people in a way that little else does. It speaks to youth in a language they understand. Sport can create hope where once there was only despair.”</p>
        </div>
        <div>
            <button id="buttonn1" onClick={handleClick}>Donate $5 Now</button>
            <button id="buttonn2">Discover </button>
        </div>
     </>

};
export default Donation;
