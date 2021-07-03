import sinon from 'sinon';

import { expect } from 'chai';

import { describe, it, beforeEach, afterEach } from 'mocha';

import makeGetFile from './get-file';

class FileRepository {
  constructor() {
    this.data = {};
  }

  findOne() {
    return { size: 111 }
  }
}

class FileRepositoryFailed {
  constructor() {
    this.data = {};
  }

  findOne() {
    return { size: 1111111 }
  }
}

class UserRepository {
  constructor() {
    this.data = {};
  }

  findOne() {
    return { downloadLimit: 111 }
  }
}

const sampleIP = '192.168.1.1';
const helpers = {
  localIpLookup() {
    return sampleIP;
  },
}
const sampleKey = 123456789;

describe('[use-cases] get file use case', () => {
  const req = {
    params: {
      publicKey: sampleKey,
    }
  };
  let mockFileRepo = new FileRepository();
  let mockFileRepoFailed = new FileRepositoryFailed();
  let mockUserRepo = new UserRepository();

  const getFile = makeGetFile({
    helpers,
    fileRepository: mockFileRepo,
    userRepository: mockUserRepo,
  });

  const getFileFailed = makeGetFile({
    helpers,
    fileRepository: mockFileRepoFailed,
    userRepository: mockUserRepo,
  });

  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.spy(mockFileRepo);
    sandbox.spy(mockUserRepo);
    sandbox.spy(helpers);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call repositories findOne on getFile function', async () => {
    await getFile(req);

    expect(mockFileRepo.findOne.calledWith(sampleKey)).to.equal(true);
    expect(mockUserRepo.findOne.calledWith(sampleIP)).to.equal(true);
  });

  it('should prevent user from downloading when cap has been reached', async () => {
    const file = await getFileFailed(req);

    expect(file.error).to.equal('User download limit reached');
  });
});
