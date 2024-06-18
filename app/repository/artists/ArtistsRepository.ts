import Repository from '../Repository';
const source = '/artists';
export default {
  getArtists(ids: string) {
    return Repository.get(source, {
      params: {ids},
    });
  },
  searchArtists(
    query: string,
    market: string = 'US',
    limit: number = 10,
    offset: number = 0,
  ) {
    return Repository.get('/search', {
      params: {
        q: `artist:${query}`,
        type: 'artist',
        market,
        limit,
        offset,
      },
    });
  },
  getArtistAlbums(
    id: string,
    include_groups: string = 'single,appears_on',
    market: string = 'ES',
    limit: number = 10,
    offset: number = 5,
  ) {
    return Repository.get(`/artists/${id}/albums`, {
      params: {
        include_groups,
        market,
        limit,
        offset,
      },
    });
  },
};
