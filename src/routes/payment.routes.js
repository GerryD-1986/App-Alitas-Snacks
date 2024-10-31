import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint para crear un pago
router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount } = req.body;

        // Crear un PaymentIntent con el monto enviado desde el frontend
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // cantidad en centavos, ej. $10.00 sería 1000
            currency: "mxn", // configuracion de la moneda
            payment_method_types: ["card"],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creando PaymentIntent:", error);
        res.status(500).json({ error: "Error creando PaymentIntent" });
    }
});

export default router;
