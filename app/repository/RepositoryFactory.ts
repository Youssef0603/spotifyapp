import UserRepository from './user/UserRepository';
import ArtistsRepository from './artists/ArtistsRepository';

const repositories = {
  user: UserRepository,
  artists: ArtistsRepository
};

export const RepositoryFactory = {
  get: (name: string | number) => repositories[name],
};
