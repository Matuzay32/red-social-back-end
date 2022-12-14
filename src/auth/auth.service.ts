import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtServie: JwtService,
  ) {}

  //Usamos bcrypt para encryptar la password
  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainPass = await hash(password, 10);
    const usuarioEncriptado = { ...userObject, password: plainPass };
    return this.userModel.insertMany(usuarioEncriptado);
  }

  //Comparamos el usuario con el que tenemos en la base de datos
  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject;
    const findUser = await this.userModel.findOne({ email });

    if (!findUser)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const checkPass = await compare(password, findUser.password);

    if (!checkPass)
      throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN);
    const payload = { id: findUser._id, username: findUser.username };

    const token = await this.jwtServie.sign(payload);

    const data = {
      user: findUser,
      token,
    };
    return data;
  }
}
