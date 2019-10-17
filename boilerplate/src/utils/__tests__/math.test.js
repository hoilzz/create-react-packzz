import { add } from '../math';

describe('mathUtils', () => {
  it('add(3,5) returns 8', () => {
    expect(add(3, 5)).toBe(8);
  });
});
