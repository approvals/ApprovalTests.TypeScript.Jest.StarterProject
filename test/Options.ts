class FileOptions {
  private options: Options;
  constructor(options: Options) {
    this.options = options;
  }

  withFileExtention(extensionWithDot: string) {
    return  this.options.modify("FileExtention", extensionWithDot);

  }

  getFileExtension() {
    return this.options.get("FileExtention", () => ".txt")
  }
}

export class Options{
  protected fields: {};
 constructor() {
    this.fields = {}
 }

  modify(key: string, value: any) {
    const next = new Options();
    for (const key1 in next.fields) {
      next.fields[key1] = this.fields[key1]
    }
    next.fields[key] = value;
    return next;
  }
  forFile() {
    return new FileOptions(this);
  }

  get(key: string, default1: () => any) {
    if (this.fields[key] == undefined){
      return default1();
    }
    return this.fields[key]

  }
}