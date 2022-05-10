interface MajorCredits {
  credits: number;
  brand: 'MajorBrand';
}

interface MinorCredits {
  credits: number;
  brand: 'MinorBrand';
}

function sumMajorCredits(subject1: number, subject2: number): number {
  return subject1 + subject2;
}

function sumMinorCredits(subject1: number, subject2: number): number {
  return subject1 + subject2;
}
