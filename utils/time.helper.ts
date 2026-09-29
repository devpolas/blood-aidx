export type Milliseconds = number & {
  readonly __brand: "Milliseconds";
};

export const Time = {
  ms: (value: number): Milliseconds => value as Milliseconds,

  second: (value: number): Milliseconds => (value * 1_000) as Milliseconds,

  minute: (value: number): Milliseconds => (value * 60_000) as Milliseconds,

  hour: (value: number): Milliseconds => (value * 3_600_000) as Milliseconds,

  day: (value: number): Milliseconds => (value * 86_400_000) as Milliseconds,
} as const;
