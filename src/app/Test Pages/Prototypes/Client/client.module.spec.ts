import { ClientModule } from './client/client.module';

describe('ClientModule', () => {
  let clientModule: ClientModule;

  beforeEach(() => {
    clientModule = new ClientModule();
  });

  it('should create an instance', () => {
    expect(clientModule).toBeTruthy();
  });
});
