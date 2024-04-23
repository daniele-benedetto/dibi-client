const mail = require("@sendgrid/mail");

//mail.setApiKey(process.env.SENDGRID_API_KEY || "");

export default async (req, res) => {
	try {
		const body = JSON.parse(req.body);
		const name = body.name;
		const address = body.address;
		const products = body.products;
		const email = body.email;
		const total = body.total;

		let prodotti = "";
		products.map(p => {
			prodotti += `${p.name} - ${p.quantity} \n`;
		});

		const subject = "Cianfrusalia - Nuovo messaggio dal modulo contatti";

		const message = {
			to: email,
			from: "mrcianfrusalia@cianfrusalia.it",
			subject: subject,
			templateId: "d-0a76064bc06943b8b3e296a4f21fb9ba",
			dynamicTemplateData: {
				first_name: name,
				address_line_1: address,
				line: prodotti,
			},
		};

		await mail.send(message);

		const message2 = {
			to: "mrcianfrusalia@cianfrusalia.it",
			from: "mrcianfrusalia@cianfrusalia.it",
			subject: "Cianfrusalia - Nuovo ordine",
			text: `È stato effettuato un nuovo ordine da ${name} per un totale di ${total.toFixed(2)}€.
            Per visualizzare i dettagli dell'ordine visita il pannello di amministrazione.`,
		};

		await mail.send(message2);

		res.status(200).json({ status: "Ok" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ status: "Error", error: error.message });
	}
};
