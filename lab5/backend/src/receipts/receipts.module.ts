import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { FileAccessor, FileService } from 'src/file.service';
import { Receipt } from './entities/receipt.entity';

@Module({
  controllers: [ReceiptsController],
  providers: [
    ReceiptsService,
    {
      provide: FileService,
      useFactory: (receipts: ReceiptsModule) =>
        new FileService<Receipt[]>(receipts.filePath),
      inject: [ReceiptsModule],
    },
  ],
})
export class ReceiptsModule implements FileAccessor {
  public readonly filePath = 'assets/receipts.json';
}
