import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './Controllers/books/books.controller';
import { BookRepository } from './Mongo/Repository/book.repository';
import { BookSchema } from './Mongo/Schemas/book.schema';
import { BooksService } from './Services/books/books.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://docker:docker@localhost', {
      dbName: 'biblioteca',
    }),
    MongooseModule.forFeature([{ name: 'book', schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
