const mail = require('@sendgrid/mail');

mail.setApiKey('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');

export default async (req, res) => {
    try {
        const body = JSON.parse(req.body);
        const name = body.name;
        const address = body.address;
        const products = body.products;
        const email = body.email;
        const total = body.total;

        let prodotti = '';
        products.map((p) => {
            prodotti += `${p.name} - ${p.quantity} \n`;
        });

        const subject = 'Cianfrusalia - Nuovo messaggio dal modulo contatti';

        const message = {
            to: email,
            from: 'daniele.benedetto@appius.it',
            subject: subject,
            templateId: 'd-ff1ced243ae14886924493f4b7a8f920',
            dynamicTemplateData: {
                first_name: name,
                address_line_1: address,
                line: prodotti,
            }
        };

        await mail.send(message);

        const message2 = {
            to: 'daniele.benedetto@appius.it',
            from: 'daniele.benedetto@appius.it',
            subject: 'Cianfrusalia - Nuovo ordine',
            text: `È stato effettuato un nuovo ordine da ${name} per un totale di ${total.toFixed(2)}€.
            Per visualizzare i dettagli dell'ordine visita il pannello di amministrazione.`,
        };

        await mail.send(message2);

        res.status(200).json({ status: 'Ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error', error: error.message });
    }
};
