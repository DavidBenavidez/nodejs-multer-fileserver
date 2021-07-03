import sinon from 'sinon';

import { expect } from 'chai';

import { describe, it, beforeEach, afterEach } from 'mocha';
import makeFileRepository from './file-repository';


class MockDb {
  constructor() {
    this.data = {};
  }

  create() {
    this.data = { value: 111 }
    return this;
  }

  deleteOne() {
    this.data = { deletedCount: 1 };
    return this;
  }

  findOne() {
    this.data = { value: 111 };
    return this;
  }

  find() {
    this.data = [{ value: 111 }];
    return this;
  }
}

const mockFile = {
  filename: 'mockFilename',
  originalname: 'mockOriginalName',
  timestamp: '1625294044974-192.168.0.10',
  size: 12345,
}

describe('[repository] file-repository - files collection data access', () => {
  let mockDb = new MockDb();
  const fileRepository = makeFileRepository({
    database: mockDb,
  });
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.spy(mockDb);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call find({}) on findAll', async () => {
    await fileRepository.findAll();

    expect(mockDb.find.calledWith({})).to.equal(true);
  });

  it('should call findOne({ publickKey }) on findOne', async () => {
    await fileRepository.findOne('mockKey');

    expect(mockDb.findOne.calledWith({publicKey: 'mockKey'})).to.equal(true);
  });

  it('should call deleteOne({ privateKey }) on deleteOne', async () => {
    await fileRepository.deleteOne('mockKey');

    expect(mockDb.deleteOne.calledWith({privateKey: 'mockKey'})).to.equal(true);
  });

  it('should call database.create() on create', async () => {
      const options = {
        localIp: '192.168.100.5',
        expiresAt: 'June 21, 2021',
      };
      const timestamp = '1625294044974-192.168.0.10';

      await fileRepository.create(mockFile, options);

      const expectedPayload = {
        expiresAt: 'June 21, 2021',
        filename: 'mockFilename',
        originalname: 'mockOriginalName',
        publicKey: timestamp,
        privateKey: `${timestamp}-${'192.168.100.5'}`,
        size: 12345,
      }
      expect(mockDb.create.calledWith(expectedPayload)).to.equal(true);
    });
});