import { MilestoneFactory } from '../index';

describe.only('Transformations', () => {
  test('transform object', async () => {

    const milestone = {
      webId: "https://jaluma.inrupt.net/public/viade/1993149598/1993149598.ttl",
      name: "Prueba120",
      description: "Esto es una prueba",
      distance: "6",
      slope: "10",
      latitude: "10",
      longitude: "10",
    };

    const result = MilestoneFactory.create(milestone);

    expect(milestone.name === result.name).toBe(true);
    expect(milestone.description === result.description).toBe(true);
    expect(milestone.distance === result.distance).toBe(true);
    expect(milestone.slope === result.slope).toBe(true);
    expect(milestone.latitude === result.latitude).toBe(true);
    expect(milestone.longitude === result.longitude).toBe(true);

  });
});