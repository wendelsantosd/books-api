import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { Book } from 'src/Mongo/Interfaces/book.interface';
import { BooksService } from 'src/Services/books/books.service';

@Controller('books')
export class BooksController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly bookService: BooksService) { }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBooks();
  }

  @Get('id/:bookID')
  async getBookById(@Param('bookID') bookID: string): Promise<Book> {
    return await this.bookService.getBookById(bookID);
  }

  @Post()
  async saveBook(@Body() newBook: BookDTO): Promise<Book> {
    return await this.bookService.saveBook(newBook);
  }

  @Patch('id/:bookID')
  async updateBook(
    @Param('bookID') bookID: string,
    @Body() newBook: BookDTO,
  ): Promise<Book> {
    return await this.bookService.updateBookById(bookID, newBook);
  }

  @Get('author/:authorName')
  async getBookByAuthorName(
    @Param('authorName') authorName: string,
  ): Promise<Book[]> {
    return await this.bookService.getBookByAuthorName(authorName);
  }

  @Get('name/:bookName')
  async getBookByName(@Param('bookName') bookName: string): Promise<Book[]> {
    return await this.bookService.getBookByName(bookName);
  }

  @Delete('id/:bookID')
  async deleteBook(@Param('bookID') bookID: string): Promise<Book> {
    return await this.bookService.deleteBookById(bookID);
  }
}
