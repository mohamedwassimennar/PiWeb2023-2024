const Injury = require('../models/injury.model');
const pdf = require('html-pdf');
const fs = require('fs');

// Créer une nouvelle blessure pour un joueur
exports.create = async (req, res) => {
    // Extraire les données de la requête
    const { playerName, playerId, type, description, date, estimatedRecoveryTime } = req.body;

    // Créer une nouvelle instance de blessure
    const injury = new Injury({
        playerName: playerName,
        type: type,
        description: description,
        date: date,
        estimatedRecoveryTime: estimatedRecoveryTime
    });

    // Sauvegarder la blessure dans la base de données
    try {
        const savedInjury = await injury.save();
        res.send(savedInjury);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la création de la blessure."
        });
    }
};

// Récupérer toutes les blessures
exports.findAll = async (req, res) => {
    try {
        const injuries = await Injury.find();
        res.send(injuries);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Une erreur s'est produite lors de la récupération des blessures."
        });
    }
};

// Récupérer une blessure spécifique par son ID
exports.findOne = async (req, res) => {
    try {
        const injury = await Injury.findById(req.params.injuryId);
        if (!injury) {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        res.send(injury);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de la blessure avec l'identifiant " + req.params.injuryId
        });
    }
};

// Mettre à jour une blessure par son ID
exports.update = async (req, res) => {
    // Valider la requête
    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides"
        });
    }

    try {
        const updatedInjury = await Injury.findByIdAndUpdate(req.params.injuryId, req.body, { new: true });
        if (!updatedInjury) {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        res.send(updatedInjury);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la mise à jour de la blessure avec l'identifiant " + req.params.injuryId
        });
    }
};

// Supprimer une blessure par son ID
exports.delete = async (req, res) => {
    try {
        const deletedInjury = await Injury.findByIdAndRemove(req.params.injuryId);
        if (!deletedInjury) {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        res.send({ message: "Blessure supprimée avec succès!" });
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        return res.status(500).send({
            message: "Impossible de supprimer la blessure avec l'identifiant " + req.params.injuryId
        });
    }
};

exports.extractToPdf = async (req, res) => {
    try {
        const injuries = await Injury.find({ archived: false }); // Filtrer les blessures archivées uniquement
        const pageSize = 4;
        const numPages = Math.ceil(injuries.length / pageSize);

        let htmlContent = '';
        for (let page = 0; page < numPages; page++) {
            htmlContent += `
                <div style="page-break-after: always;">
                    <div style="padding: 20px;">
                        <div style="text-align: left; margin-bottom: 20px;">
                            <p style="font-size: 30px; color: #19204e; font-weight: bold;">KickOff</p>
                            <p>Email: kickoff_pi@outlook.com</p>
                            <p>Phone: +216 29 803 907</p>
                        </div>
                        <h1 style="text-align: center; color: #19204e; ">INJURIES LIST</h1>
            `;
            
            const startIndex = page * pageSize;
            const endIndex = Math.min(startIndex + pageSize, injuries.length);
            for (let i = startIndex; i < endIndex; i++) {
                const injury = injuries[i];
                htmlContent += `
                <div style="margin-bottom: 20px;"> <!-- Ajout de la marge inférieure -->
                    <h2 style="font-size: 24px;">${injury.playerName}</h2>
                    <p><strong>Type:</strong> ${injury.type}</p>
                    <p><strong>Description:</strong> ${injury.description}</p>
                    <p><strong>Date:</strong> ${injury.date}</p>
                    <p><strong>Estimated Recovery Time:</strong> ${injury.estimatedRecoveryTime}</p>
                </div>
                `;
            }

            htmlContent += `
                <div style="text-align: right; margin-top: 50px;">
                    <p>Doctor's Signature</p>
                </div>
            </div>
        </div>
        `;
    }

    const pdfPath = './injuries_certificate.pdf';
    pdf.create(htmlContent, { format: 'A4' }).toFile(pdfPath, (err, result) => {
        if (err) {
            throw err;
        }
        console.log('PDF créé:', result);

        res.download(pdfPath);
    });
} catch (error) {
    res.status(500).send({
        message: error.message || "Une erreur s'est produite lors de la création du certificat médical des blessures."
    });
}
};


// Archiver une blessure par son ID
exports.archive = async (req, res) => {
    try {
        const archivedInjury = await Injury.findByIdAndUpdate(req.params.injuryId, { archived: true }, { new: true });
        if (!archivedInjury) {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        res.send({ message: "Blessure archivée avec succès!" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        return res.status(500).send({
            message: "Impossible d'archiver la blessure avec l'identifiant " + req.params.injuryId
        });
    }
};

// Fonction pour récupérer les blessures archivées
exports.getArchivedInjuries = async (req, res) => {
    try {
      const archivedInjuries = await Injury.find({ archived: true });
      res.status(200).json(archivedInjuries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

    // Restaurer une blessure archivée par son ID
exports.restore = async (req, res) => {
    try {
        const restoredInjury = await Injury.findByIdAndUpdate(req.params.injuryId, { archived: false }, { new: true });
        if (!restoredInjury) {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        res.send({ message: "Blessure restaurée avec succès!" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Blessure non trouvée avec l'identifiant " + req.params.injuryId
            });
        }
        return res.status(500).send({
            message: "Impossible de restaurer la blessure avec l'identifiant " + req.params.injuryId
        });
    }
};



