import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthToken } from '../common/decorators/common.authToken';

@Controller('except')
export class ExceptController {
  @Get(':code')
  executeError(@Param('code') code: HttpStatus) {
    if (code >= 200 && code < 400) {
      return 'status ok';
    } else if (code == 403) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Forbidden Error ',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('pipe/:id')
  exPipes(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `입력 받은 Number : ${id}`;
  }

  @Get('auth/token')
  getAuthToken(
    @AuthToken('token') token: string
  ) {
    return `HEADER에 입력한 토근은 ${token} 입니다.`
  }

}
