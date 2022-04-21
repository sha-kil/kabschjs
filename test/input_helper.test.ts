import { checkValidPointSets } from '../src/input_helper'; 



describe("input", function() {
  function getRandom() {
    const max = 10000;
    return Math.floor(Math.random() * max);
  }

  function getRandomPoint(dimension = 3) {
    const point = [];
    while(dimension--) {
      point.push(getRandom());
    }
    return point;
  }

  function generatePoints(n: number, dimension = 3): number[][] {
    const points = [];
    for (let i = 0; i < n; i++) {
      points.push(getRandomPoint(dimension));
    }

    return points;
  }
  
  test("point sets input valid", () => {
    const pointsNum = 10;
    const pointSet1 = generatePoints(pointsNum);
    const pointSet2 = generatePoints(pointsNum);
    
    expect(checkValidPointSets(pointSet1, pointSet2)).toBe(true);
  });

  test("point sets wrong point dimension", () => {
    const pointsNum = 10;
    const pointSet1 = generatePoints(pointsNum);
    const pointSet2 = generatePoints(pointsNum, 2);

    expect(() => checkValidPointSets(pointSet1, pointSet2)).toThrow(`point dimension size must be 3`);
  });

  test("point sets size mismatch", () => {
    const pointsNum = 10;
    const pointSet1 = generatePoints(pointsNum);
    const pointSet2 = generatePoints(pointsNum+2);

    expect(() => checkValidPointSets(pointSet1, pointSet2)).toThrow(`both point sets must have same number of points`);
  });

})