import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import TrainingPlan from '../app/models/trainingPlan.model.js';
import {
    create,
    findAll,
    findOne,
    update,
    delete as deletePlan,
    archiveStage
} from '../app/controllers/trainingPlan.controller.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Tests du contrôleur trainingPlanModel', () => {
    describe('create()', () => {
        it('devrait créer un nouveau plan de formation', async() => {
            const req = {
                body: {
                    trainingplace: 'Salle de sport X',
                    time: '10:00',
                    date: '2024-04-25',
                    trainingType: 'Agility',
                    duration: 60,
                    intensityLevel: 'Moyen'
                }
            };
            const res = {
                status: sinon.stub().returnsThis(), // Stub de la méthode status
                json: sinon.spy() // Spy de la méthode json
            };

            sinon.stub(TrainingPlan.prototype, 'save').resolves(req.body);

            await create(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(req.body)).to.be.true;

            TrainingPlan.prototype.save.restore();
        });
    });

    describe('findAll()', () => {
        it('devrait récupérer tous les plans de formation', async() => {
            const req = {};
            const res = {
                json: sinon.spy()
            };

            sinon.stub(TrainingPlan, 'find').resolves([]);

            await findAll(req, res);

            expect(res.json.calledOnce).to.be.true;

            TrainingPlan.find.restore();
        });
    });

    describe('findOne()', () => {
        it('devrait récupérer un plan de formation par son ID', async() => {
            const req = {
                params: {
                    planId: 'mockPlanId' // ID fictif du plan de formation
                }
            };
            const res = {
                status: sinon.stub().returnsThis(), // Stub de la méthode status
                json: sinon.spy() // Spy de la méthode json
            };

            const mockPlan = {
                _id: 'mockPlanId',
                trainingplace: 'Salle de sport X',
                time: '10:00',
                date: '2024-04-25',
                trainingType: 'Agility',
                duration: 60,
                intensityLevel: 'Moyen'
            };

            sinon.stub(TrainingPlan, 'findById').resolves(mockPlan);

            await findOne(req, res);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal(mockPlan);

            TrainingPlan.findById.restore();
        });
    });

    describe('update()', () => {
        it('devrait mettre à jour un plan de formation', async() => {
            const req = {
                params: {
                    planId: 'mockPlanId'
                },
                body: {
                    trainingplace: 'Salle de sport Y',
                    time: '11:00',
                    date: '2024-04-26',
                    trainingType: 'Strength training',
                    duration: 90,
                    intensityLevel: 'Élevé'
                }
            };
            const res = {
                json: sinon.spy()
            };

            const updatedMockPlan = {
                _id: 'mockPlanId',
                trainingplace: 'Salle de sport Y',
                time: '11:00',
                date: '2024-04-26',
                trainingType: 'Strength training',
                duration: 90,
                intensityLevel: 'Élevé'
            };

            sinon.stub(TrainingPlan, 'findByIdAndUpdate').resolves(updatedMockPlan);

            await update(req, res);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal(updatedMockPlan);

            TrainingPlan.findByIdAndUpdate.restore();
        });
    });

    describe('delete()', () => {
        it('devrait supprimer un plan de formation par son ID', async() => {
            const req = {
                params: {
                    planId: 'mockPlanId'
                }
            };
            const res = {
                json: sinon.spy()
            };

            sinon.stub(TrainingPlan, 'findByIdAndDelete').resolves({ message: 'Plan de formation supprimé avec succès!' });

            await deletePlan(req, res);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({ message: 'Plan de formation supprimé avec succès!' });

            TrainingPlan.findByIdAndDelete.restore();
        });
    });

    describe('archiveStage()', () => {
        it('devrait archiver un plan de formation par son ID', async() => {
            const req = {
                params: {
                    planId: 'mockPlanId' // ID fictif du plan de formation
                }
            };
            const res = {
                json: sinon.spy()
            };

            const archivedMockPlan = {
                _id: 'mockPlanId',
                trainingplace: 'Salle de sport X',
                time: '10:00',
                date: '2024-04-25',
                trainingType: 'Agility',
                duration: 60,
                intensityLevel: 'Moyen',
                archived: true
            };

            sinon.stub(TrainingPlan, 'findByIdAndUpdate').resolves(archivedMockPlan);

            await archiveStage(req, res);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal(archivedMockPlan);

            TrainingPlan.findByIdAndUpdate.restore();
        });
    });
});