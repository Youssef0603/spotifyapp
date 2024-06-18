import Repository from '../Repository';
const source = '/me';
export default {
  getProfile(params: any) {
    return Repository.get(`${source}`, {
      params: params,
    });
  },
  getTopArtists(type: string) {
    return Repository.get(`${source}/top/${type}`);
  }
};