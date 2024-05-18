// prevention.test.mjs

import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Prevention from '../app/models/prevention.model.js';
import {
    findOne,
    update,
    archive,
    getAllArchived,
    restore
} from '../app/controllers/prevention.controller.js';

chai.use(chaiHttp);
const expect = chai.expect;



describe('findOne()', () => {
    it('devrait récupérer une prévention par son ID', async() => {
        const req = {
            params: {
                preventionId: 'mockPreventionId'
            }
        };
        const res = {
            status: sinon.stub().returnsThis(),
            send: sinon.spy()
        };

        const mockPrevention = {
            _id: 'mockPreventionId',
            playerName: 'Nom du joueur',
            description: 'Description de la prévention',
            recommendedPractices: ['Conseil 1', 'Conseil 2'],
            equipmentRecommendations: ['Équipement 1', 'Équipement 2'],
            nutritionalRecommendations: ['Recommandation nutritionnelle 1', 'Recommandation nutritionnelle 2'],
            lifestyleRecommendations: ['Recommandation de style de vie 1', 'Recommandation de style de vie 2']
        };

        sinon.stub(Prevention, 'findById').resolves(mockPrevention);

        await findOne(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal(mockPrevention);

        Prevention.findById.restore();

        console.log("Détails de la prévention récupérée :", res.send.firstCall.args[0]);
    });
});

describe('update()', () => {
    it('devrait mettre à jour une prévention', async() => {
        const req = {
            params: {
                preventionId: 'mockPreventionId'
            },
            body: {
                playerName: 'Nouveau nom du joueur',
                description: 'Nouvelle description de la prévention',
                recommendedPractices: ['Nouveau conseil 1', 'Nouveau conseil 2'],
                equipmentRecommendations: ['Nouvel équipement 1', 'Nouvel équipement 2'],
                nutritionalRecommendations: ['Nouvelle recommandation nutritionnelle 1', 'Nouvelle recommandation nutritionnelle 2'],
                lifestyleRecommendations: ['Nouvelle recommandation de style de vie 1', 'Nouvelle recommandation de style de vie 2']
            }
        };
        const res = {
            send: sinon.spy()
        };

        const updatedMockPrevention = {
            _id: 'mockPreventionId',
            playerName: 'Nouveau nom du joueur',
            description: 'Nouvelle description de la prévention',
            recommendedPractices: ['Nouveau conseil 1', 'Nouveau conseil 2'],
            equipmentRecommendations: ['Nouvel équipement 1', 'Nouvel équipement 2'],
            nutritionalRecommendations: ['Nouvelle recommandation nutritionnelle 1', 'Nouvelle recommandation nutritionnelle 2'],
            lifestyleRecommendations: ['Nouvelle recommandation de style de vie 1', 'Nouvelle recommandation de style de vie 2']
        };

        sinon.stub(Prevention, 'findByIdAndUpdate').resolves(updatedMockPrevention);

        await update(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal(updatedMockPrevention);

        Prevention.findByIdAndUpdate.restore();

        console.log("Détails de la prévention mise à jour :", res.send.firstCall.args[0]);
    });
});


describe('archive()', () => {
    it('devrait archiver une prévention par son ID', async() => {
        const req = {
            params: {
                preventionId: 'mockPreventionId'
            }
        };
        const res = {
            send: sinon.spy()
        };

        const archivedMockPrevention = {
            _id: 'mockPreventionId',
            playerName: 'Nom du joueur',
            description: 'Description de la prévention',
            recommendedPractices: ['Conseil 1', 'Conseil 2'],
            equipmentRecommendations: ['Équipement 1', 'Équipement 2'],
            nutritionalRecommendations: ['Recommandation nutritionnelle 1', 'Recommandation nutritionnelle 2'],
            lifestyleRecommendations: ['Recommandation de style de vie 1', 'Recommandation de style de vie 2'],
            archived: true
        };

        sinon.stub(Prevention, 'findByIdAndUpdate').resolves(archivedMockPrevention);

        await archive(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal({
            message: "Prévention archivée avec succès!"
        });

        Prevention.findByIdAndUpdate.restore();

        console.log("Détails de la prévention archivée :", res.send.firstCall.args[0]);
    });
});

describe('restore()', () => {
    it('devrait restaurer une prévention archivée par son ID', async() => {
        const req = {
            params: {
                preventionId: 'mockPreventionId'
            }
        };
        const res = {
            send: sinon.spy()
        };

        const restoredMockPrevention = {
            _id: 'mockPreventionId',
            playerName: 'Nom du joueur',
            description: 'Description de la prévention',
            recommendedPractices: ['Conseil 1', 'Conseil 2'],
            equipmentRecommendations: ['Équipement 1', 'Équipement 2'],
            nutritionalRecommendations: ['Recommandation nutritionnelle 1', 'Recommandation nutritionnelle 2'],
            lifestyleRecommendations: ['Recommandation de style de vie 1', 'Recommandation de style de vie 2'],
            archived: false
        };

        sinon.stub(Prevention, 'findByIdAndUpdate').resolves(restoredMockPrevention);

        await restore(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal({
            message: "Prévention restaurée avec succès!"
        });

        Prevention.findByIdAndUpdate.restore();

        console.log("Détails de la prévention restaurée :", res.send.firstCall.args[0]);
    });
});


describe('getAllArchived()', () => {
    it('devrait récupérer toutes les préventions archivées', async() => {
        const req = {};
        const res = {
            send: sinon.spy()
        };

        sinon.stub(Prevention, 'find').resolves([]);

        await getAllArchived(req, res);

        expect(res.send.calledOnce).to.be.true;

        Prevention.find.restore();

        console.log("Liste des préventions archivées récupérées :", res.send.firstCall.args[0]);
    });
});


