import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import RecoveryPlan from '../app/models/recovery.model.js';
import {
    create,
    findOne,
    update,
    archive,
    delete as deleteRecoveryPlan,
    restore
} from '../app/controllers/recovery.controller.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('create()', () => {
    it('devrait créer un nouveau plan de récupération', async () => {
        const req = {
            body: {
                playerName: 'Nom du joueur',
                injuryStatus: 'Blessure mineure',
                recoveryStartDate: '2024-05-01',
                recoveryEndDate: '2024-06-01',
                recoveryActivities: ['Activité de récupération 1', 'Activité de récupération 2']
            }
        };
        const res = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const mockRecoveryPlan = {
            _id: 'mockRecoveryPlanId',
            playerName: 'Nom du joueur',
            injuryStatus: 'Blessure mineure',
            recoveryStartDate: '2024-05-01',
            recoveryEndDate: '2024-06-01',
            recoveryActivities: ['Activité de récupération 1', 'Activité de récupération 2']
        };

        sinon.stub(RecoveryPlan.prototype, 'save').resolves(mockRecoveryPlan);

        await create(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal(mockRecoveryPlan);

        RecoveryPlan.prototype.save.restore();

        console.log("Détails du plan de récupération créé :", res.send.firstCall.args[0]);
    });
});

describe('findOne()', () => {
    it('devrait récupérer un plan de récupération par son ID', async () => {
        const req = {
            params: {
                recoveryPlanId: 'mockRecoveryPlanId'
            }
        };
        const res = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const mockRecoveryPlan = {
            _id: 'mockRecoveryPlanId',
            playerName: 'Nom du joueur',
            injuryStatus: 'Blessure mineure',
            recoveryStartDate: '2024-05-01',
            recoveryEndDate: '2024-06-01',
            recoveryActivities: ['Activité de récupération 1', 'Activité de récupération 2']
        };

        sinon.stub(RecoveryPlan, 'findById').resolves(mockRecoveryPlan);

        await findOne(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal(mockRecoveryPlan);

        RecoveryPlan.findById.restore();

        console.log("Détails du plan de récupération récupéré :", res.send.firstCall.args[0]);
    });
});

describe('update()', () => {
    it('devrait mettre à jour un plan de récupération', async () => {
        const req = {
            params: {
                recoveryPlanId: 'mockRecoveryPlanId'
            },
            body: {
                playerName: 'Nouveau nom du joueur',
                injuryStatus: 'Blessure modérée',
                recoveryStartDate: '2024-05-02',
                recoveryEndDate: '2024-06-02',
                recoveryActivities: ['Nouvelle activité de récupération 1', 'Nouvelle activité de récupération 2']
            }
        };
        const res = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const updatedMockRecoveryPlan = {
            _id: 'mockRecoveryPlanId',
            playerName: 'Nouveau nom du joueur',
            injuryStatus: 'Blessure modérée',
            recoveryStartDate: '2024-05-02',
            recoveryEndDate: '2024-06-02',
            recoveryActivities: ['Nouvelle activité de récupération 1', 'Nouvelle activité de récupération 2']
        };

        sinon.stub(RecoveryPlan, 'findByIdAndUpdate').resolves(updatedMockRecoveryPlan);

        await update(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal(updatedMockRecoveryPlan);

        RecoveryPlan.findByIdAndUpdate.restore();

        console.log("Détails du plan de récupération mis à jour :", res.send.firstCall.args[0]);
    });
});

describe('archive()', () => {
    it('devrait archiver un plan de récupération par son ID', async () => {
        const req = {
            params: {
                recoveryPlanId: 'mockRecoveryPlanId'
            }
        };
        const res = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const archivedMockRecoveryPlan = {
            _id: 'mockRecoveryPlanId',
            playerName: 'Nom du joueur',
            injuryStatus: 'Blessure mineure',
            recoveryStartDate: '2024-05-01',
            recoveryEndDate: '2024-06-01',
            recoveryActivities: ['Activité de récupération 1', 'Activité de récupération 2'],
            archived: true
        };

        sinon.stub(RecoveryPlan, 'findByIdAndUpdate').resolves(archivedMockRecoveryPlan);

        await archive(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal({
            message: "Plan de récupération archivé avec succès!"
        });

        RecoveryPlan.findByIdAndUpdate.restore();

        console.log("Détails du plan de récupération archivé :", res.send.firstCall.args[0]);
    });
});

describe('delete()', () => {
    it('devrait supprimer un plan de récupération par son ID', async () => {
        const req = {
            params: {
                recoveryPlanId: 'mockRecoveryPlanId'
            }
        };
        const res = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        sinon.stub(RecoveryPlan, 'findByIdAndRemove').resolves({
            message: "Plan de récupération supprimé avec succès!"
        });

        await deleteRecoveryPlan(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal({
            message: "Plan de récupération supprimé avec succès!"
        });

        RecoveryPlan.findByIdAndRemove.restore();

        console.log("Plan de récupération supprimé avec succès!");
    });
});


describe('restore()', () => {
    it('devrait restaurer un plan de récupération archivé par son ID', async () => {
        const req = {
            params: {
                recoveryPlanId: 'mockRecoveryPlanId'
            }
        };
        const res = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const restoredMockRecoveryPlan = {
            _id: 'mockRecoveryPlanId',
            playerName: 'Nom du joueur',
            injuryStatus: 'Blessure mineure',
            recoveryStartDate: '2024-05-01',
            recoveryEndDate: '2024-06-01',
            recoveryActivities: ['Activité de récupération 1', 'Activité de récupération 2'],
            archived: false
        };

        sinon.stub(RecoveryPlan, 'findByIdAndUpdate').resolves(restoredMockRecoveryPlan);

        await restore(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal({
            message: "Plan de récupération restauré avec succès!"
        });

        RecoveryPlan.findByIdAndUpdate.restore();

        console.log("Détails du plan de récupération restauré :", res.send.firstCall.args[0]);
    });
});
