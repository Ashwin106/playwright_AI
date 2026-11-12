import { readFile } from 'node:fs/promises';
import path from 'node:path';

export interface ProcessedInput {
  inputType: 'requirement_document';
  content: string;
  sourcepath: string;
}

export class InputProcessor {
  static async readRequirementFile(filePath: string): Promise<ProcessedInput> {
    return InputProcessor.processFile(filePath);
  }

  static async processFile(filePath: string): Promise<ProcessedInput> {
    const absolutePath = path.resolve(filePath);

    if (path.extname(absolutePath).toLowerCase() !== '.txt') {
      throw new Error('Invalid file type. Only .txt files are allowed.');
    }

    const content = await readFile(absolutePath, 'utf-8');

    if (!content.trim()) {
      throw new Error('File is empty.');
    }

    return {
      inputType: 'requirement_document',
      content,
      sourcepath: absolutePath,
    };
  }

  async readInputFile(filePath: string): Promise<ProcessedInput> {
    return InputProcessor.readRequirementFile(filePath);
  }
}

export default InputProcessor;
