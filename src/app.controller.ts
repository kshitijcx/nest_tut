import { Controller,Get } from "@nestjs/common";

Controller
@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return "hello";
  }
}