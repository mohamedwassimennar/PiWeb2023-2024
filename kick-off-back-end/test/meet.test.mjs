import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Meet from '../app/models/meet.model.js';
import {
    createMeet,
    getAllMeets,
    getMeetById,
    updateMeet,
    deleteMeet,
    archiveMeet
} from '../app/controllers/meet.controller.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('createMeet()', () => {
    it('devrait créer une nouvelle réunion', async() => {
        const req = {
            body: {
                date: '2024-04-25',
                time: '10:00',
                link: 'https://meet.jit.si/space-dev',
                meettype: 'player'
            }
        };
        const res = {
            status: sinon.stub().returnsThis(), // Stub de status
            json: sinon.spy() // Spy sur json
        };

        // Stub de la méthode Meet.save pour qu'elle renvoie quelque chose
        sinon.stub(Meet.prototype, 'save').resolves(req.body);

        // Appel de la fonction à tester
        await createMeet(req, res);

        // Vérification que res.status est appelée avec le code de statut 201
        sinon.assert.calledWith(res.status, 201);

        // Vérification que res.json est appelée avec les données attendues
        sinon.assert.calledWith(res.json, req.body);

        // Restauration du stub
        Meet.prototype.save.restore();

        // Affichage des résultats retournés
        console.log("Résultat du test de création de réunion :", res.json.firstCall.args[0]);
    });
});

describe('getAllMeets()', () => {
    it('devrait récupérer toutes les réunions', async() => {
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(), // Stub de status
            json: sinon.spy()
        };

        sinon.stub(Meet, 'find').resolves([]);

        await getAllMeets(req, res);

        sinon.assert.calledOnce(res.status); // Vérifie que res.status est appelé
        expect(res.json.calledOnce).to.be.true;

        Meet.find.restore();

        // Affichage des résultats retournés
        console.log("Liste des réunions récupérées :", res.json.firstCall.args[0]);
    });
});

describe('getMeetById()', () => {
    it('devrait récupérer une réunion par son ID', async() => {
        const req = {
            params: {
                meetId: 'mockMeetId'
            }
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        const mockMeet = {
            _id: 'mockMeetId',
            date: '2024-04-25',
            time: '10:00',
            link: 'https://meet.jit.si/space-dev',
            meettype: 'player'
        };

        sinon.stub(Meet, 'findById').resolves(mockMeet);

        await getMeetById(req, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.firstCall.args[0]).to.deep.equal(mockMeet);

        Meet.findById.restore();

        // Affichage du résultat retourné
        console.log("Détails de la réunion récupérée :", res.json.firstCall.args[0]);
    });
});

describe('updateMeet()', () => {
    it('devrait mettre à jour une réunion', async() => {
        const req = {
            params: {
                meetId: 'mockMeetId'
            },
            body: {
                date: '2024-04-26',
                time: '11:00',
                link: 'https://meet.jit.si/space-pro',
                meettype: 'docteur'
            }
        };
        const res = {
            status: sinon.stub().returnsThis(), // Stub de status
            json: sinon.spy()
        };

        const updatedMockMeet = {
            _id: 'mockMeetId',
            date: '2024-04-26',
            time: '11:00',
            link: 'https://meet.jit.si/space-pro',
            meettype: 'docteur'
        };

        sinon.stub(Meet, 'findByIdAndUpdate').resolves(updatedMockMeet);

        await updateMeet(req, res);

        sinon.assert.calledOnce(res.status); // Vérifie que res.status est appelé
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.firstCall.args[0]).to.deep.equal(updatedMockMeet);

        Meet.findByIdAndUpdate.restore();

        // Affichage du résultat retourné
        console.log("Détails de la réunion mise à jour :", res.json.firstCall.args[0]);
    });
});