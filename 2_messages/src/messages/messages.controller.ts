import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  // messagesService: MessagesService;

  // constructor() {
  //   //dont do this in real app, use DI
  //   this.messagesService = new MessagesService();
  // }

  // constructor(messagesService: MessagesService) {
  //   this.messagesService = messagesService;
  // }

  constructor(public messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      return new NotFoundException('message not found');
    }
    return message;
  }
}
