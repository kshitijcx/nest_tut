import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { UserDto } from 'src/users/dtos/user.dto';

interface ClassConstructor {
    new (...args:any[]):{}
}

//creating custom decorator
export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {} //to use a dto sent in the controller file
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //run something before a req
    //is handled by the req handler
    // console.log('running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        //run something before the reponse is sent out
        // console.log('running before response is sent', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
