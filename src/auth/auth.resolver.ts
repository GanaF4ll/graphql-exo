import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { Response } from 'express';
import { LoginResponse } from './dto/login-response';
import { LogoutResponse } from './dto/logout-response';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('input') loginInput: LoginInput,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(
      loginInput.email,
      loginInput.password,
      context.res,
    );
  }

  @Mutation(() => LoginResponse)
  async signup(
    @Args('input') createUserInput: CreateUserInput,
    @Context() context: { res: Response },
  ) {
    return this.authService.signup(createUserInput, context.res);
  }

  @Mutation(() => LogoutResponse)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }
}
