import { Body, Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get() // GET /report
    async getReport(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return await this.reportService.findAllInRange(start,end);
    }
}
