export class PhoneNumber {
    country = '';
    area = '';
    prefix = '';
    line = '';
  
    // format phone numbers as E.164
    get e164() {
      const num = this.country + this.area + this.prefix + this.line
      return `+${num}`
    }
  
  }