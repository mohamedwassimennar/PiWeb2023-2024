
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import MatchRecord from '../app/models/matchrecord.model.js';
import {
    findAll,
    findOne,
    update,
    archive
} from '../app/controllers/matchrecord.controller.js';

chai.use(chaiHttp);
const expect = chai.expect;


describe('findAll()', () => {
    it('should retrieve all MatchRecords', async () => {
        const req = {};
        const res = {
            send: sinon.spy()
        };

        sinon.stub(MatchRecord, 'find').resolves([]);

        await findAll(req, res);

        expect(res.send.calledOnce).to.be.true;

        MatchRecord.find.restore();

        console.log("All MatchRecords:", res.send.firstCall.args[0]);
    });
});

describe('findOne()', () => {
    it('should retrieve a MatchRecord by its ID', async () => {
        const req = {
            params: {
                matchRecordId: 'mockMatchRecordId'
            }
        };
        const res = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const mockMatchRecord = {
            _id: 'mockMatchRecordId',
            date: '2024-04-25',
            opponent: 'Opponent Team',
            venue: 'Venue Name',
            team: 'Home Team',
            fixtureType: 'League Match',
            matchStatus: 'scheduled',
            score: '1-1',
            image: 'https://example.com/image.jpg'
        };

        sinon.stub(MatchRecord, 'findById').resolves(mockMatchRecord);

        await findOne(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal(mockMatchRecord);

        MatchRecord.findById.restore();

        console.log("MatchRecord:", res.send.firstCall.args[0]);
    });
});

describe('update()', () => {
    it('should update a MatchRecord', async () => {
        const req = {
            params: {
                matchRecordId: 'mockMatchRecordId'
            },
            body: {
                date: '2024-04-25',
                opponent: 'Opponent Team',
                venue: 'Venue Name',
                team: 'Home Team',
                fixtureType: 'League Match',
                matchStatus: 'scheduled',
                score: '1-1',
                image: 'https://example.com/image.jpg'
            }
        };
        const res = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const updatedMockMatchRecord = {
            _id: 'mockMatchRecordId',
            date: '2024-04-25',
            opponent: 'Opponent Team',
            venue: 'Venue Name',
            team: 'Home Team',
            fixtureType: 'League Match',
            matchStatus: 'scheduled',
            score: '1-1',
            image: 'https://example.com/image.jpg'
        };

        sinon.stub(MatchRecord, 'findByIdAndUpdate').resolves(updatedMockMatchRecord);

        await update(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal(updatedMockMatchRecord);

        MatchRecord.findByIdAndUpdate.restore();

        console.log("Updated MatchRecord:", res.send.firstCall.args[0]);
    });
});



describe('archive()', () => {
    it('should archive a MatchRecord by its ID', async () => {
        const req = {
            params: {
                matchRecordId: 'mockMatchRecordId'
            }
        };
        const res = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const archivedMockMatchRecord = {
            _id: 'mockMatchRecordId',
            date: '2024-04-25',
            opponent: 'Opponent Team',
            venue: 'Venue Name',
            team: 'Home Team',
            fixtureType: 'League Match',
            matchStatus: 'scheduled',
            score: '1-1',
            image: 'https://example.com/image.jpg',
            archived: true
        };

        sinon.stub(MatchRecord, 'findByIdAndUpdate').resolves(archivedMockMatchRecord);

        await archive(req, res);

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal(archivedMockMatchRecord);

        MatchRecord.findByIdAndUpdate.restore();

        console.log("Archived MatchRecord:", res.send.firstCall.args[0]);
    });
});
