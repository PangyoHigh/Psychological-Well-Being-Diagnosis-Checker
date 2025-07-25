interface DataRange {
  [key: string]: string;
}

const getPercentage = (
  data: DataRange | undefined,
  score: number
): number | undefined => {
  if (!data) {
    return undefined;
  }

  for (const key in data) {
    const [min, max] = key.split("-").map(Number);

    if (score == min && score == max) {
      return Number(data[key]);
    }

    if (score >= min && score <= max) {
      return Number(data[key]);
    }
  }
  return undefined; // Return undefined if no matching range is found
};

const scoreData: { [key: string]: DataRange } = {
  종합점수: {
    boy: {
      "0-2": 10.9,
      "3-7": 35.4,
      "8-13": 61.7,
      "14-19": 75.2,
      "20-25": 87.6,
      "26-31": 92.2,
      "32-37": 94.4,
      "38-42": 96.4,
      "43-48": 97.8,
      "49-54": 99.0,
      "55-60": 99.5,
      "61-66": 99.8,
      "67-108": 100,
    },
    girl: {
      "0-2": 9.1,
      "3-9": 39.8,
      "10-15": 60.6,
      "16-21": 75.7,
      "22-28": 87.0,
      "29-34": 90.2,
      "35-41": 95.1,
      "42-47": 97.9,
      "48-53": 98.1,
      "54-60": 99.1,
      "61-66": 99.4,
      "67-73": 99.8,
      "74-108": 100,
    },
  },
  "불안 및 우울 문제": {
    boy: {
      "0-1": 16.7,
      "2-3": 35.4,
      "4-6": 57.3,
      "7-8": 72.3,
      "9-11": 85.2,
      "12-13": 90.0,
      "14-16": 96.8,
      "17-18": 98.1,
      "19-21": 99.3,
      "22-23": 99.8,
      "24-24": 100,
    },
    girl: {
      "0-2": 19.1,
      "3-4": 33.6,
      "5-7": 58.7,
      "8-10": 74.7,
      "11-12": 81.9,
      "13-15": 90.4,
      "16-17": 95.5,
      "18-20": 97.2,
      "21-23": 99.4,
      "24-24": 100,
    },
  },
  "자살 및 위기 문제": {
    boy: {
      "0-0": 70.1,
      "1-2": 85.7,
      "3-3": 90.8,
      "4-4": 93.2,
      "5-5": 94.9,
      "6-6": 96.1,
      "7-7": 97.1,
      "8-8": 98.1,
      "9-9": 98.3,
      "10-10": 99.0,
      "11-18": 100,
    },
    girl: {
      "0-0": 57.0,
      "1-1": 70.2,
      "2-2": 80.9,
      "3-4": 90.2,
      "5-5": 92.1,
      "6-7": 95.1,
      "8-8": 95.7,
      "9-10": 97.2,
      "11-11": 97.7,
      "12-13": 98.7,
      "14-14": 98.9,
      "15-18": 100,
    },
  },
  "외현화 문제": {
    boy: {
      "0-0": 29.9,
      "1-2": 66.0,
      "3-3": 78.2,
      "4-4": 86.4,
      "5-6": 93.0,
      "7-7": 94.7,
      "8-8": 95.6,
      "9-9": 97.1,
      "10-11": 99.0,
      "12-12": 99.0,
      "13-13": 99.5,
      "14-24": 100,
    },
    girl: {
      "0-0": 43.4,
      "1-1": 66.4,
      "2-2": 77.4,
      "3-3": 86.2,
      "4-4": 91.9,
      "5-5": 95.7,
      "6-6": 96.6,
      "7-7": 97.9,
      "8-8": 98.7,
      "9-9": 99.1,
      "10-10": 99.6,
      "11-24": 100,
    },
  },
  "심리외상 문제": {
    boy: {
      "0-0": 60.9,
      "1-1": 74.0,
      "2-2": 80.8,
      "3-3": 86.4,
      "4-5": 93.4,
      "6-6": 95.4,
      "7-7": 96.1,
      "8-8": 97.1,
      "9-10": 98.1,
      "11-11": 98.3,
      "12-12": 99.3,
      "13-21": 100,
    },
    girl: {
      "0-0": 55.1,
      "1-1": 69.4,
      "2-3": 82.1,
      "4-4": 86.8,
      "5-5": 91.1,
      "6-7": 94.5,
      "8-8": 95.7,
      "9-10": 97.9,
      "11-11": 98.1,
      "12-13": 98.9,
      "14-14": 98.9,
      "15-21": 100,
    },
  },
  "학교생활적응 문제": {
    boy: {
      "0-0": 19.2,
      "1-1": 37.9,
      "2-2": 53.4,
      "3-4": 77.9,
      "5-5": 86.2,
      "6-6": 91.3,
      "7-8": 95.4,
      "9-9": 96.4,
      "10-11": 98.5,
      "12-12": 99.0,
      "13-13": 99.5,
      "14-15": 100,
      "16-21": 100,
    },
    girl: {
      "0-0": 11.1,
      "1-1": 29.8,
      "2-3": 62.3,
      "4-4": 74.3,
      "5-6": 87.2,
      "7-7": 91.3,
      "8-9": 94.0,
      "10-11": 96.8,
      "12-12": 97.9,
      "13-14": 99.1,
      "15-15": 99.8,
      "16-17": 100,
      "18-21": 100,
    },
  },
};

export default function convertScoreToPercentage(
  type: string,
  gender: string,
  score: number
): number | undefined {
  const data = scoreData[type]?.[gender];
  const p = getPercentage(data, Number(score));
  return p;
}
