const mail = require('@sendgrid/mail');

mail.setApiKey('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');

export default async (req, res) => {
    const body = JSON.parse(req.body);

    const id = body.id;

    const subject = 'Cianfrusalia - Nuovo messaggio dal modulo contatti';
    const message = `Ciao Diego, è stato inviato un nuovo messaggio dal modulo contatti del sito Cianfrusaglia.it. Puoi visualizzarlo qui: https://www.cianfrusalia.it/backend/admin/content-manager/collectionType/api::contact.contact/${id}`;

    await mail.send({
        to: 'daniele.benedetto@appius.it',
        from: 'daniele.benedetto@appius.it',
        subject: subject,
        text: message,
        html: message.replace(/\r\n/g, '<br>'),
    });

    res.status(200).json({ status: 'Ok' });
}