import sinon from 'sinon';

import { expect } from 'chai';

import { describe, it, beforeEach, afterEach } from 'mocha';
import makeUserRepository from './user-repository';


class MockDb {
  constructor() {
    this.data = {};
    this.collection = {
      updateOne: this.updateOne
    };
  }

  updateOne() {
    this.data = { value: 111 }
    return this;
  }

  findOne() {
    this.data = { value: 111 };
    return this;
  }
}

describe('[repository] user-repository - user collection data access', () => {
  let mockDb = new MockDb();
  const fileRepository = makeUserRepository({
    database: mockDb,
  });
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.spy(mockDb);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call database.findOne on findOne', async () => {
    await fileRepository.findOne('192.168.1.1');

    expect(mockDb.findOne.calledWith({localIP: '192.168.1.1'})).to.equal(true);
  });

  it('should call database.updateOne on updateOne', async () => {
    sandbox.stub(mockDb.collection, 'updateOne');

    await fileRepository.updateOne('192.168.1.1', {size: 12345});

    expect(mockDb.collection.updateOne.called).to.equal(true);
  });
});