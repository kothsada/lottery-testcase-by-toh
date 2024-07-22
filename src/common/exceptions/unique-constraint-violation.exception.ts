import { ConflictException } from '@nestjs/common';

export class UniqueConstraintViolationException extends ConflictException {
  constructor(field: string) {
    super(
      `ທີມງານພົບເຫັນວ່າມີຄ່າບາງໂຕໃນກະບວນການເຮັດວຽກ ${field} ແມ່ນມີແລ້ວ ສ້າງໃຫມ່ເດີ`,
    );
  }
}
