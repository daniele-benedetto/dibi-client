const mail = require("@sendgrid/mail");

mail.setApiKey("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");

export default async (req, res) => {
	const body = JSON.parse(req.body);

	const id = body.id;

	const subject = "Cianfrusalia - Nuovo messaggio dal modulo contatti";
	const message = `Ciao Diego, è stato inviato un nuovo messaggio dal modulo contatti del sito Cianfrusaglia.it. Puoi visualizzarlo qui: https://www.cianfrusalia.it/backend/admin/content-manager/collectionType/api::contact.contact/${id}`;

	await mail.send({
		to: "mrcianfrusalia@cianfrusalia.it",
		from: "mrcianfrusalia@cianfrusalia.it",
		subject: subject,
		text: message,
		html: message.replace(/\r\n/g, "<br>"),
	});

	res.status(200).json({ status: "Ok" });
};
