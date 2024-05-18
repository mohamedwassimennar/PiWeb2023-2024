const nodemailer = require('nodemailer');

// Fonction pour créer un transporteur en fonction des informations d'identification fournies
const createTransporter = (email, password) => {
    return nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: email, // Adresse e-mail de l'expéditeur
            pass: password // Mot de passe d'application
        }
    });
};

// Contrôleur pour créer un nouveau contact et envoyer un e-mail à l'adresse kick-off@outlook.fr
exports.createContact = (req, res) => {
    const { name, email, password, message } = req.body;

    // Créer le transporteur en utilisant les informations d'identification fournies
    const transporter = createTransporter(email, password);

    // Envoyer l'e-mail à l'adresse kick-off@outlook.fr
    transporter.sendMail({
        from: email, // L'adresse e-mail de l'expéditeur sera l'adresse saisie dans le formulaire
        to: 'kick-off@outlook.fr', // Adresse e-mail du récepteur
        subject: 'Nouveau message de contact',
        text: `Bonjour,\n\nVous avez reçu un nouveau message de contact :\n Message: ${message}\n\nCordialement,\n KICK OFF`
    }, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            res.status(500).send({
                message: "Une erreur s'est produite lors de l'envoi de l'e-mail."
            });
        } else {
            console.log('E-mail envoyé avec succès:', info.response);
            res.status(200).send({
                message: "E-mail envoyé avec succès."
            });
        }
    });
};
