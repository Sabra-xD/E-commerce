import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PI267IUDCCFW7xOtTbVcCbg2ItqfnJV4Us1Oy6Gu8gda5iT0oPse5glH6GXuiiQKcveko0KV4OVeJ0W6yfMT0dz00q13Bcb4p');

export default function PaymentPage() {


  return (
    <Elements stripe={stripePromise}>
      {/* <PaymentDetails /> */}
    </Elements>
  );
};