import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDTO } from 'src/DTO/books.dto';
import { Book } from '../Interfaces/book.interface';

@Injectable()
export class BookRepository {
  // eslint-disable-next-line prettier/prettier
  constructor(@InjectModel('book') private readonly bookModel: Model<Book>) { }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookModel
      .find({}, { __v: false })
      .sort({ name: +1 })
      .exec();
  }

  async getBookById(bookID: string): Promise<Book> {
    return await this.bookModel.findById(bookID, { __v: false });
  }

  async saveBook(newBook: BookDTO): Promise<Book> {
    const savedBook = new this.bookModel(newBook);
    return await savedBook.save();
  }

  async updateBookById(bookID: string, newBook: BookDTO): Promise<number> {
    const { modifiedCount } = await this.bookModel.replaceOne(
      { _id: bookID },
      newBook,
    );

    if (modifiedCount === 1) return modifiedCount;
  }

  async getBooksByAuthorName(authorName: string[]): Promise<Book[]> {
    return await this.bookModel.find({
      $or: [
        { 'author.name': { $in: authorName } },
        { 'author.surname': { $in: authorName } },
      ],
    });
  }

  async getBookByName(bookName: string): Promise<Book[]> {
    return await this.bookModel.find(
      {
        name: { $regex: bookName, $options: 'i' },
      },
      {
        __v: false,
      },
    );
  }

  async deleteBookById(bookID: string): Promise<Book> {
    return this.bookModel.findOneAndDelete({ _id: bookID });
  }
}
