import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { FileService } from 'src/file.service';
import { Receipt } from './entities/receipt.entity';

@Injectable()
export class ReceiptsService {
  constructor(private fileService: FileService<Receipt[]>) { }

  create(createReceiptDto: CreateReceiptDto) {
    const receipts = this.fileService.read();

    // для простоты новый id = текущее количество карточек + 1
    const receipt = { ...createReceiptDto, id: receipts.length + 1 };

    this.fileService.add(receipt);
  }

  findAll(title?: string): Receipt[] {
    const receipts = this.fileService.read();

    return title
      ? receipts.filter((receipt) =>
        receipt.title.toLowerCase().includes(title.toLowerCase()),
      )
      : receipts;
  }

  findOne(id: number): Receipt | null {
    const receipts = this.fileService.read();

    return receipts.find((receipt) => receipt.id === id) ?? null;
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto): void {
    const receipts = this.fileService.read();

    const updatedReceipts = receipts.map((receipt) =>
      receipt.id === id ? { ...receipt, ...updateReceiptDto } : receipt,
    );

    this.fileService.write(updatedReceipts);
  }

  remove(id: number): void {
    const filteredReceipts = this.fileService
      .read()
      .filter((receipt) => receipt.id !== id);

    this.fileService.write(filteredReceipts);
  }
}
