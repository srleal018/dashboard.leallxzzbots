const functions = require("firebase-functions");
const mercadopago = require("mercadopago");

mercadopago.configurations.setAccessToken("SEU_MERCADO_PAGO_ACCESS_TOKEN");

exports.createPixPayment = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*'); // Permite acesso do GitHub Pages

    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }

    const { transaction_amount, description, email } = req.body;

    const payment_data = {
        transaction_amount: Number(transaction_amount),
        description: description,
        payment_method_id: "pix",
        payer: {
            email: email,
            first_name: "Cliente",
            last_name: "Loja"
        }
    };

    try {
        const payment = await mercadopago.payment.create(payment_data);
        res.status(201).json(payment.body);
    } catch (error) {
        res.status(500).send(error);
    }
});
