import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  // constructor (
  //   public name: string,
  //   public description: string
  //   ) {}
  id?: number;
  @IsString()
  @IsNotEmpty()
  @Matches(/\w|\d/)
  name: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/g)
  password: string;
  @IsString()
  @IsOptional()
  description?: string;
}
