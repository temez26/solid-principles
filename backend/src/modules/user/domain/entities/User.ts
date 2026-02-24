import { UniqueId } from '../../../../shared/domain/valueObjects/UniqueId';

export interface UserProps {
  id: UniqueId;
  username: string;
  email: string;
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
    username: string,
    email: string,
    passwordHash: string,
  ): User {
    return new User({
      id: UniqueId.create(),
      username,
      email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static reconstitute(props: UserProps): User {
    return new User(props);
  }

  get id(): UniqueId        { return this.props.id; }
  get username(): string    { return this.props.username; }
  get email(): string       { return this.props.email; }
  get passwordHash(): string{ return this.props.passwordHash; }
  get createdAt(): Date     { return this.props.createdAt; }
  get updatedAt(): Date     { return this.props.updatedAt; }
}