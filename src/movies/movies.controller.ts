import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateMovieDTO } from "./dto/create-movie.dto";
import { UpdateMovieDTO } from "./dto/update-movie.dto";
import { MoviesService } from "./movies.service";

// url의 엔트리포인트를 생성
@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  //
  @Get()
  getAll() {
    return this.moviesService.getAll();
  }

  // :id 밑으로 가면 search가 id로 인식됨
  // @Get("search")
  // search(@Query("year") searchingYear: string) {
  //     return `We are searching for a movie made after: ${searchingYear}`
  // }

  @Get(":id")
  getOne(@Param("id") movieId: number) {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Delete(":id")
  remove(@Param("id") movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(":id")
  patch(@Param("id") movieId: string, @Body() updateData: UpdateMovieDTO) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
