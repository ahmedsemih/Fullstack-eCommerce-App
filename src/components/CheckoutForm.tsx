'use client'

import { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message!);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <main className="flex justify-center items-center h-[calc(100vh-146px)] bg-lightGreen">
            <form className="md:w-1/2 p-8 rounded-lg bg-white" onSubmit={handleSubmit}>
                <PaymentElement options={{ layout: 'tabs' }} />
                <div className="w-full flex justify-end">
                    <button className="bg-mainGreen py-2 px-5 rounded-lg text-center mt-8 font-semibold text-xl" disabled={isLoading || !stripe || !elements}>
                        Pay now
                    </button>
                </div>
                {message && <div className="text-black mt-4 text-center">{message}</div>}
            </form>
        </main>
    )
}

export default CheckoutForm;