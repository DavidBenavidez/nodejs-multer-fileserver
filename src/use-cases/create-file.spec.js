import sinon from 'sinon';

import { expect } from 'chai';

import { describe, it, beforeEach, afterEach } from 'mocha';

import makeCreateFile from './create-file';

class FileRepository {
  constructor() {
    this.data = {};
  }

  create() {
    this.data = { value: 111 }
    return this;
  }
}

class UserRepository {
  constructor() {
    this.data = {};
  }

  updateOne() {
    this.data = { value: 111 }
    return this;
  }
}

const sampleIP = '192.168.1.1';
const sampleExp = 123456789;
const helpers = {
  localIpLookup() {
    return sampleIP;
  },
  getDocumentExpireTime() {
    return sampleExp;
  }
}

describe('[use-cases] create file use case', () => {
  const req = {
    file: {
      size: 12345,
    }
  };
  let mockFileRepo = new FileRepository();
  let mockUserRepo = new UserRepository();

  const createFile = makeCreateFile({
    helpers,
    fileRepository: mockFileRepo,
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

  it('should call repository create on create function', async () => {
    await createFile(req);

    expect(mockFileRepo.create.calledWith(
      req.file,
      {
        localIp: sampleIP,
        expiresAt: sampleExp,
      }
    )).to.equal(true);
    expect(mockUserRepo.updateOne.calledWith(sampleIP, {
      size: req.file.size,
    })).to.equal(true);
  });
});
