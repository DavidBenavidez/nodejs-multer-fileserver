import sinon from 'sinon';

import { expect } from 'chai';

import { describe, it, beforeEach, afterEach } from 'mocha';

import makeDeleteFile from './delete-file';

class FileRepository {
  constructor() {
    this.data = {};
  }

  deleteOne() {
    this.data = { deletedCount: 1 }
    return this;
  }
}

const sampleKey = 12345;
describe('[use-cases] delete file use case', () => {
  const req = {
    params: {
      privateKey: sampleKey,
    }
  };
  let mockFileRepo = new FileRepository();

  const deleteFile = makeDeleteFile({
    fileRepository: mockFileRepo,
  });
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.spy(mockFileRepo);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call repository deleteOne on delete function', async () => {
    await deleteFile(req);

    expect(mockFileRepo.deleteOne.calledWith(sampleKey)).to.equal(true);
  });
});
