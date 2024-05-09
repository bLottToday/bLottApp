import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  Query,
  Request,
} from '@nestjs/common';
import { CreateAuditTxDto } from './dto/create.dto';
import { UpdateAuditTxDto } from './dto/update.dto';
import { AuditTxService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';
import { Public } from '../flatworks/roles/public.api.decorator';

@Public()
@Controller('dapptxs')
export class AuditTxController {
  constructor(private readonly service: AuditTxService) {}

  @Get()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createAuditTxDto: CreateAuditTxDto, @Request() req) {
    return await this.service.create({
      ...createAuditTxDto,
      lockDate: new Date(),
    });
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuditTxDto: UpdateAuditTxDto,
  ) {
    return await this.service.update(id, updateAuditTxDto);
  }

  @Put('/unlock/:lockedTxHash')
  async approve(
    @Param('lockedTxHash') lockedTxHash: string,
    @Body() updateAuditTxDto: UpdateAuditTxDto,
  ) {
    return await this.service.findByTxHashAndUpdate(lockedTxHash, {
      ...updateAuditTxDto,
      unlockDate: new Date(),
    });
  }

  //only admin can delete
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
