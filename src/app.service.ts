import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola carambola esta es una prueba de la API!';
  }
}
