import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transectionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart,refetch] = useCart();
    const navigate = useNavigate();
    const totalPrice = cart.reduce((total, item) => total + item.price,0)

 useEffect(() => {
   if (totalPrice > 0) {
     axiosSecure
       .post("/create-payment-intent", { price: totalPrice })
       .then((res) => {
         setClientSecret(res.data.clientSecret);
       })
       .catch((error) =>
         console.error("Error creating payment intent:", error)
       );
   } else {
     console.warn("Total price is 0, skipping API call.");
   }
 }, [axiosSecure, totalPrice]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)
        }
        else {
            setError('');
        }

        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
            }
          },
        });
        if (confirmError) {
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id)

                // now save the payment in the database
                const payment = {
                  email: user?.email,
                  price: totalPrice,
                  transectionId: paymentIntent.id,
                  date: new Date(), // utc date convert. use moment js to
                  cartIds: cart.map((item) => item._id),
                  menuItemIds: cart.map((item) => item.manuId),
                  status: "pending",
                };

                const res = await axiosSecure.post("/payment", payment);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Thank You for the taka paisa",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    navigate('/dashboard/paymentHistory');
                }
            }
        }
    }
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm btn-primary my-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
            <p className="text-red-600">{error}</p>
            {transectionId && <p className="text-green-700">Your transaction id: { transectionId}</p> }
      </form>
    );
};

export default CheckoutForm;