import fs from 'fs';
import sinon from 'sinon';

import { expect } from 'chai';

import { describe, it, beforeEach, afterEach } from 'mocha';
import makeListFiles from './list-files';

class FileRepository {
  constructor() {
    this.data = {};
  }

  findAll() {
    return [
      { filename: `sample_filename` }
    ]
  }
}
const sampleKey = 12345;

describe('[use-cases] list files use case', () => {
  const req = {
    params: {
      privateKey: sampleKey,
    }
  };
  let mockFileRepo = new FileRepository();

  const listFiles = makeListFiles({
    fileRepository: mockFileRepo,
  });
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.spy(mockFileRepo);
    sandbox.stub(fs, 'readdirSync').returns([
      'sample_filename',
      'sample_filename2',
      'sample_filename3',
    ]);
    sandbox.stub(fs, 'unlinkSync').returns();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call repository findAll on listFiles function', async () => {
    const files = await listFiles();

    expect(files).to.deep.equal([{
      filename: 'sample_filename',
    }]);
    expect(mockFileRepo.findAll.called).to.equal(true);
  });
});
