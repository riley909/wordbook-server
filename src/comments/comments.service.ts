import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
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
}
