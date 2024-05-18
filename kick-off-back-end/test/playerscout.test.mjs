// player.test.mjs
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Player from '../app/models/player.js';
import {
    findOne,
    update,
    archive,
    create,
    findAll
} from '../app/controllers/playerscout.controller.js';

chai.use(chaiHttp);
const expect = chai.expect;


    describe('findOne()', () => {
        it('should find a player by ID', async() => {
            const req = {
                params: {
                    playerId: 'mockPlayerId'
                }
            };
            const res = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            const mockPlayer = {
                _id: 'mockPlayerId',
                playerName: 'Test Player',
                marketValue: '1000000',
                contract: '2024-2028',
                club: 'Test Club'
            };

            sinon.stub(Player, 'findById').resolves(mockPlayer);

            await findOne(req, res);

            sinon.assert.calledOnce(res.status);
            expect(res.send.calledOnceWith(mockPlayer)).to.be.true;

            Player.findById.restore();
        });
    });

    describe('update()', () => {
        it('should update a player', async() => {
            const req = {
                params: {
                    playerId: 'mockPlayerId'
                },
                body: {
                    playerName: 'Updated Test Player',
                    marketValue: '2000000',
                    contract: '2024-2030',
                    club: 'Updated Test Club'
                }
            };
            const res = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            const updatedMockPlayer = {
                _id: 'mockPlayerId',
                playerName: 'Updated Test Player',
                marketValue: '2000000',
                contract: '2024-2030',
                club: 'Updated Test Club'
            };

            sinon.stub(Player, 'findByIdAndUpdate').resolves(updatedMockPlayer);

            await update(req, res);

            sinon.assert.calledOnce(res.status);
            expect(res.send.calledOnceWith({ status: 'success', player: updatedMockPlayer })).to.be.true;

            Player.findByIdAndUpdate.restore();
        });
    });


    describe('archive()', () => {
        it('should archive a player', async() => {
            const req = {
                params: {
                    playerId: 'mockPlayerId'
                }
            };
            const res = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            const archivedPlayer = {
                _id: 'mockPlayerId',
                playerName: 'Test Player',
                marketValue: '1000000',
                contract: '2024-2028',
                club: 'Test Club',
                archived: true
            };

            sinon.stub(Player, 'findByIdAndUpdate').resolves(archivedPlayer);

            await archive(req, res);

            sinon.assert.calledOnce(res.status);
            expect(res.send.calledOnceWith(archivedPlayer)).to.be.true;

            Player.findByIdAndUpdate.restore();
        });
    });
    describe('archive()', () => {
        it('should archive a player', async () => {
            const req = {
                params: {
                    playerId: 'mockPlayerId'
                }
            };
            const res = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };
    
            const archivedPlayer = {
                _id: 'mockPlayerId',
                playerName: 'Test Player',
                marketValue: '1000000',
                contract: '2024-2028',
                club: 'Test Club',
                archived: true
            };
    
            sinon.stub(Player, 'findByIdAndUpdate').resolves(archivedPlayer);
    
            await archive(req, res);
    
            sinon.assert.calledOnce(res.status);
            expect(res.send.calledOnceWith(archivedPlayer)).to.be.true;
    
            Player.findByIdAndUpdate.restore();
        });
    });
    
    
    
