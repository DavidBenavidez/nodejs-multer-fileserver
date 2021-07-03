import sinon from 'sinon';

import { expect } from 'chai';

import { describe, it, beforeEach, afterEach } from 'mocha';

import makeFilesController from './files';

const sampleFile = {"_id":{"$oid":"60e00490c13e8b158a3af275"},"expiresAt":{"$date":{"$numberLong":"1625323968017"}},"filename":"1625293967713-6090326 (1).pdf","originalname":"6090326 (1).pdf","publicKey":"1625293967713","privateKey":"1625293967713-192.168.0.10","size":{"$numberInt":"5007"},"createdAt":{"$date":{"$numberLong":"1625293968027"}},"__v":{"$numberInt":"0"}};

const useCases = {
  createFile() {
    return new Promise((resolve) => resolve(sampleFile));
  },
  deleteFile() {
    return new Promise((resolve) => resolve({
      deletedCount: 1,
    }));
  },
  getFile() {
    return new Promise((resolve) => resolve(sampleFile));
  },
  listFiles() {
    return new Promise((resolve) => resolve([sampleFile]));
  },
};

describe('[controller] files - files controller', () => {
  let req = {};
  const res = {
    download() {
      sinon.spy();
    },
    status: sinon.stub().returns({
      jsonResponse() {
        sinon.spy();
      },
    }),
  };

  const filesController = makeFilesController(useCases);
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.spy(useCases);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call listFiles on list function', async () => {
    await filesController.list(req, res);

    expect(useCases.listFiles.calledWith()).to.equal(true);
  });

  it('should call createFile on create function', async () => {
    await filesController.create(req, res);

    expect(useCases.createFile.calledWith(req)).to.equal(true);
  });

  it('should call getFile on get function', async () => {
    await filesController.get(req, res);

    expect(useCases.getFile.calledWith(req)).to.equal(true);
  });

  it('should call deleteFile on get function', async () => {
    await filesController.delete(req, res);

    expect(useCases.deleteFile.calledWith(req)).to.equal(true);
  });
});
