import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto, user: User) {
    const { content, refComment, studyLogId } = createCommentDto;

    const comment = await this.commentsRepository.create({
      content,
      refComment,
      studyLog: { id: studyLogId },
      user,
    });
    const result = await this.commentsRepository.save(comment);
    return {
      message: `Comment with id "${result.id}" is created`,
      comment,
    };
  }

  async getComments(getCommentsDto: GetCommentsDto, user: User) {
    let { studyLogId, limit, offset } = getCommentsDto;
    limit = limit || 5;
    offset = offset || 1;

    const query = await this.commentsRepository.createQueryBuilder('comment');
    query.where({ user });

    if (studyLogId) {
      query.andWhere('comment.studyLogId = :studyLogId', {
        studyLogId: studyLogId,
      });
    }

    query.orderBy('comment.id', 'DESC');
    query.take(limit).skip(limit * (offset - 1));

    try {
      const total = await query.getCount();
      const comments = await query.getMany();
      return {
        studyLogId: studyLogId,
        total: total,
        limit: limit,
        currentPage: offset,
        data: comments,
      };
    } catch (error) {
      console.log(error.stack);
    }
  }

  async getCommentById(id: number, user: User) {
    const comment = await this.commentsRepository.findOne({ id, user });

    if (!comment) {
      throw new NotFoundException(`Comment with id "${id}" not found`);
    }
    return comment;
  }

  async deleteComment(id: number, user: User) {
    const result = await this.commentsRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with id "${id}" not found`);
    }
    return {
      message: `Comment with id "${id}" is deleted`,
    };
  }

  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
    user: User,
  ) {
    const { content } = updateCommentDto;
    const comment = await this.commentsRepository.findOne({ id, user });
    comment.content = content;
    await this.commentsRepository.save(comment);

    return {
      message: `Comment with id "${id}" is updated`,
      comment,
    };
  }
}
