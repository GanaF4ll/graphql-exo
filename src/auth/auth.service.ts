import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Response } from 'express';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private setCookieToken(
    response: Response,
    userId: number,
    email: string,
  ): string {
    const payload = { email, sub: userId };
    const token = this.jwtService.sign(payload);

    response.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
      domain: 'localhost',
    });

    return token;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await argon2.verify(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string, response: Response) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.setCookieToken(response, user.id, user.email);

    return {
      user,
      access_token: token,
    };
  }

  async signup(dto: CreateUserInput, response: Response) {
    const { email, password, firstname, lastname } = dto;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const user = await this.usersService.create({
      email,
      password,
      firstname,
      lastname,
    });
    if (!user) {
      throw new UnauthorizedException('User not created');
    }
    const token = this.setCookieToken(response, user.id, user.email);

    return {
      user,
      access_token: token,
    };
  }

  async logout(response: Response) {
    response.cookie('jwt', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
      domain: 'localhost',
    });
    return { message: 'Logged out successfully' };
  }
}
