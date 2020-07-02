import { expect } from 'chai';
import DataContractFactory from '@dashevo/dpp/lib/dataContract/DataContractFactory';
import ValidationResult from '@dashevo/dpp/lib/validation/ValidationResult';
import get from './get';
import identitiesFixtures from '../../../../../../tests/fixtures/identities.json';
import contractsFixtures from '../../../../../../tests/fixtures/contracts.json';
import 'mocha';

const factory = new DataContractFactory(
  () => {
    const result = new ValidationResult();
    return result;
  },
);
const dpp = {
  dataContract: factory,
};
const getDataContract = async (id) => {
  switch (id) {
    // @ts-ignore
    case contractsFixtures.ratePlatform.id:
      const contract = await dpp.dataContract.createFromObject(contractsFixtures.ratePlatform);
      return contract.serialize();
    default:
      return null;
  }
};
const client = {
  getDAPIClient: () => ({ getDataContract }),
};
const apps = {};

describe('Client - Platform - Contracts - .get()', () => {
  it('should get a contract', async () => {
    // @ts-ignore
    const contract = await get.call({ apps, dpp, client }, contractsFixtures.ratePlatform.id);
    expect(contract.toJSON()).to.deep.equal(contractsFixtures.ratePlatform);
  });
  it('should deal when no contract', async () => {
    // @ts-ignore
    const contract = await get.call({ apps, dpp, client }, identitiesFixtures.bob.id);
    expect(contract).to.equal(null);
  });
});
