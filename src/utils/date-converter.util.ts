// src/utils/date-converter.util.ts

import * as moment from 'moment-timezone';

export class DateConverter {
  static convertDates(data: any, toDateObject: boolean = false): any {
    if (data instanceof Date) {
      return toDateObject
        ? moment(data).tz('Asia/Vientiane').toDate()
        : moment(data).tz('Asia/Vientiane').format();
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.convertDates(item, toDateObject));
    }

    if (typeof data === 'object' && data !== null) {
      const newObj: any = {};
      for (const key in data) {
        newObj[key] = this.convertDates(data[key], toDateObject);
      }
      return newObj;
    }

    return data;
  }

  static toVientianeDateObject(
    date: Date | string | number = new Date(),
  ): Date {
    return moment(date).tz('Asia/Vientiane').toDate();
  }

  static formatToVientianeString(
    date: Date | string | number = new Date(),
  ): string {
    return moment(date).tz('Asia/Vientiane').format();
  }
}
