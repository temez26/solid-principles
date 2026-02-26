import { UniqueId } from '../../../../shared/domain/valueObjects/UniqueId';
import { Email } from '../valueObjects/Email';
import { Username } from '../valueObjects/Username';

export interface UserProps {
  id: UniqueId;
  username: Username; 
  email: Email;        
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private readonly props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  public static create(
    rawUsername: string,
    rawEmail: string,
    passwordHash: string,
  ): User {
    return new User({
      id: UniqueId.create(),
      username: Username.create(rawUsername),
      email: Email.create(rawEmail),
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static reconstitute(props: UserProps): User {
    return new User(props);
  }

  public update(rawUsername: string, rawEmail: string, passwordHash: string): User {
    return new User({
      ...this.props,
      username: Username.create(rawUsername),
      email: Email.create(rawEmail),
      passwordHash,
      updatedAt: new Date(),
    });
  }

  get id(): UniqueId         { return this.props.id; }
  get username(): string     { return this.props.username.toString(); }
  get email(): string        { return this.props.email.toString(); }
  get passwordHash(): string { return this.props.passwordHash; }
  get createdAt(): Date      { return this.props.createdAt; }
  get updatedAt(): Date      { return this.props.updatedAt; }
}