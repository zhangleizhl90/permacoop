import {RegisterCommand} from './RegisterCommand';
import {CommandHandler} from '@nestjs/cqrs';
import {Inject, BadRequestException} from '@nestjs/common';
import {AuthenticatedView} from '../../View/Auth/AuthenticatedView';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IEncryptionAdapter} from 'src/Application/Adapter/IEncryptionAdapter';
import {User} from 'src/Domain/User/User.entity';
import {CanRegisterSpecification} from 'src/Domain/User/Specification/CanRegisterSpecification';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
    private readonly canRegisterSpecification: CanRegisterSpecification
  ) {}

  public execute = async (
    command: RegisterCommand
  ): Promise<AuthenticatedView> => {
    const {firstName, lastName, email, password} = command;

    if (false === (await this.canRegisterSpecification.isSatisfiedBy(email))) {
      throw new BadRequestException('user.already.exists');
    }

    const hashPassword = await this.encryptionAdapter.hash(password);
    const apiToken = await this.encryptionAdapter.hash(
      email + Date.now().toString() + password
    );

    await this.userRepository.save(
      new User({
        firstName,
        lastName,
        email,
        apiToken,
        password: hashPassword
      })
    );

    return new AuthenticatedView(firstName, lastName, email, apiToken);
  };
}
