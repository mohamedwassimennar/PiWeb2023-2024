import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Stage from '../app/models/stage.model.js';
import {
    createStage,
    getStages,
    getStage,
    updateStage,
    deleteStage,
    archiveStage
} from '../app/controllers/stage.controller.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('createStage()', () => {
    it('devrait créer un nouveau stage', async() => {
        const req = {
            body: {
                startDate: '2024-04-25',
                endDate: '2024-05-25',
                lieu: 'Nom du lieu de stage'
            }
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        sinon.stub(Stage, 'create').resolves(req.body); // Stub de la fonction create pour simuler la création d'un stage

        await createStage(req, res); // Appel de la fonction createStage avec les requêtes simulées

        expect(res.status.calledWith(201)).to.be.true; // Vérifie que la fonction status a été appelée avec le statut 201
        expect(res.json.calledWith(req.body)).to.be.true; // Vérifie que la fonction json a été appelée avec le corps de la requête

        Stage.create.restore(); // Restaure la fonction create

        // Affichage des résultats retournés
        console.log("Résultat du test de création de stage :", res.json.firstCall.args[0]);
    });
});


describe('getStages()', () => {
    it('devrait récupérer tous les stages', async() => {
        const req = {};
        const res = {
            json: sinon.spy()
        };

        sinon.stub(Stage, 'find').resolves([]);

        await getStages(req, res);

        expect(res.json.calledOnce).to.be.true;

        Stage.find.restore();

        // Affichage des résultats retournés
        console.log("Liste des stages récupérés :", res.json.firstCall.args[0]);
    });
});

describe('getStage()', () => {
    it('devrait récupérer un stage par son ID', async() => {
        const req = {
            params: {
                id: 'mockStageId'
            }
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        const mockStage = {
            _id: 'mockStageId',
            startDate: '2024-04-25',
            endDate: '2024-05-25',
            lieu: 'Nom du lieu de stage'
        };

        sinon.stub(Stage, 'findById').resolves(mockStage);

        await getStage(req, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.firstCall.args[0]).to.deep.equal(mockStage);

        Stage.findById.restore();

        // Affichage du résultat retourné
        console.log("Détails du stage récupéré :", res.json.firstCall.args[0]);
    });
});

describe('updateStage()', () => {
    it('devrait mettre à jour un stage', async() => {
        const req = {
            params: {
                id: 'mockStageId'
            },
            body: {
                startDate: '2024-04-25',
                endDate: '2024-05-25',
                lieu: 'Nouveau lieu de stage'
            }
        };
        const res = {
            json: sinon.spy()
        };

        const updatedMockStage = {
            _id: 'mockStageId',
            startDate: '2024-04-25',
            endDate: '2024-05-25',
            lieu: 'Nouveau lieu de stage'
        };

        sinon.stub(Stage, 'findByIdAndUpdate').resolves(updatedMockStage);

        await updateStage(req, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.firstCall.args[0]).to.deep.equal(updatedMockStage);

        Stage.findByIdAndUpdate.restore();

        // Affichage du résultat retourné
        console.log("Détails du stage mis à jour :", res.json.firstCall.args[0]);
    });
});

describe('deleteStage()', () => {
    it('devrait supprimer un stage par son ID', async() => {
        const req = {
            params: {
                id: 'mockStageId'
            }
        };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis() // Stub de la méthode status
        };

        // Stub de la fonction findByIdAndDelete pour simuler la suppression d'un stage
        sinon.stub(Stage, 'findByIdAndDelete').resolves({ message: 'Stage supprimé' });

        // Appel de la fonction deleteStage avec les requêtes simulées
        await deleteStage(req, res);

        // Vérification que la fonction status a été appelée avec le bon statut (200)
        expect(res.status.calledWith(200)).to.be.false;

        // Vérification que la fonction json a été appelée avec le bon message de suppression
        expect(res.json.calledWith({ message: 'Stage supprimé' })).to.be.true;

        // Restauration de la fonction findByIdAndDelete
        Stage.findByIdAndDelete.restore();

        // Affichage du résultat retourné
        console.log("Résultat de la suppression du stage :", res.json.firstCall.args[0]);
    });
});



describe('archiveStage()', () => {
    it('devrait archiver un stage par son ID', async() => {
        const req = {
            params: {
                id: 'mockStageId'
            }
        };
        const res = {
            json: sinon.spy()
        };

        const archivedMockStage = {
            _id: 'mockStageId',
            startDate: '2024-04-25',
            endDate: '2024-05-25',
            lieu: 'Nom du lieu de stage',
            archived: true
        };

        sinon.stub(Stage, 'findByIdAndUpdate').resolves(archivedMockStage);

        await archiveStage(req, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.firstCall.args[0]).to.deep.equal(archivedMockStage);

        Stage.findByIdAndUpdate.restore();

        // Affichage du résultat retourné
        console.log("Détails du stage archivé :", res.json.firstCall.args[0]);
    });
});