import { Controller, Get } from "@nestjs/common";

Controller;
@Controller("/app")
export class AppController {
  @Get("/abc")
  getRootRoute() {
    return "hello";
  }

  @Get("/bye")
  getByeThere() {
    return "bye";
  }
}
