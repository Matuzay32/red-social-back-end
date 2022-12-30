import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpVersionNotSupportedException,
  HttpStatus,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { join } from 'path';
import { of } from 'rxjs';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime';
import fs from 'fs';

@ApiTags('albums')
@ApiBearerAuth()
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Get('findAllComments/:id')
  findAllComments(@Param('id') id: string) {
    return this.albumsService.findAllComments(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }

  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('files')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const extension = file.originalname
            .toLowerCase()
            .match(/(.gif|.png|.jpg|.jpeg|.mp4)$/);

          callback(null, `${uuidv4()}${extension[0]}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const nameOriginal = file.originalname.toLocaleLowerCase();
        if (!nameOriginal.match(/(.gif|.png|.jpg|.jpeg|.mp4)$/)) {
          return callback(
            new HttpVersionNotSupportedException({
              status: HttpStatus.NOT_FOUND,
              error: `Uno de los archivos tiene una extension no valida. Validas: gif png jpg jpeg`,
            }),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  uploadFiles(@UploadedFiles() files: Array<any>) {
    return files.map((item) => {
      return item.filename;
    });
  }

  // @Get('uploads/:id')
  // @ApiResponse({ type: Buffer })
  // findProfileImage(@Param('id') id: string, @Res() res) {
  //   return of(res.sendFile(join(process.cwd(), `uploads/${id}`)));
  // }

  @Get('uploads/:id')
  findProfileImage(@Param('id') id: string, @Res() res) {
    const filePath = join(process.cwd(), `uploads/${id}`);
    const fileType = mime.getType(filePath);

    return of(
      res.send(fs.readFileSync(filePath), { 'Content-Type': fileType }),
    );
  }
}
