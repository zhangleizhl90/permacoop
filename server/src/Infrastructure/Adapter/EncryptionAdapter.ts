import {Injectable} from '@nestjs/common';
import * as argon2 from 'argon2';
import {IEncryptionAdapter} from 'src/Application/Adapter/IEncryptionAdapter';

@Injectable()
export class EncryptionAdapter implements IEncryptionAdapter {
  public hash = (payload: string): Promise<string> => {
    return argon2.hash(payload);
  };

  public compare = (hash: string, payload: string): Promise<boolean> => {
    return argon2.verify(hash, payload);
  };
}
