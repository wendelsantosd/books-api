import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { Book } from 'src/Mongo/Interfaces/book.interface';
import { BookRepository } from 'src/Mongo/Repository/book.repository';

@Injectable()
export class BooksService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly bookRepository: BookRepository) { }

  async getAllBooks(): Promise<Book[]> {
    const allBooks = await this.bookRepository.getAllBooks();

    if (!allBooks.length)
      throw new NotFoundException('There are no books registered yet');

    return allBooks;
  }

  async getBookById(bookID: string): Promise<Book> {
    try {
      const existBook = await this.bookRepository.getBookById(bookID);

      if (!existBook) throw new NotFoundException('This book does not exist');

      return existBook;
    } catch (e) {
      throw new NotFoundException('This book does not exist');
    }
  }

  async saveBook(newBook: BookDTO): Promise<Book> {
    return await this.bookRepository.saveBook(newBook);
  }

  async updateBookById(bookID: string, newBook: BookDTO): Promise<Book> {
    try {
      const existBook = await this.bookRepository.getBookById(bookID);

      if (!existBook) throw new NotFoundException('This book does not exist');

      const result = await this.bookRepository.updateBookById(bookID, newBook);

      if (!result) throw new BadRequestException('Error in update book');

      return await this.getBookById(bookID);
    } catch (e) {
      throw new NotFoundException('This book does not exist');
    }
  }

  async getBookByAuthorName(authorName: string): Promise<Book[]> {
    const splitedAuthorName = authorName.split(' ');

    const foundBooks = await this.bookRepository.getBooksByAuthorName(
      splitedAuthorName,
    );

    if (!foundBooks) throw new NotFoundException('No results for this author');

    return foundBooks;
  }

  async getBookByName(bookName: string): Promise<Book[]> {
    const foundBooks = await this.bookRepository.getBookByName(bookName);

    if (foundBooks.length < 1)
      throw new NotFoundException('No results for this book name');

    return foundBooks;
  }

  async deleteBookById(bookID: string): Promise<Book> {
    try {
      return await this.bookRepository.deleteBookById(bookID);
    } catch (e) {
      throw new NotFoundException('This book does not exist');
    }
  }
}
