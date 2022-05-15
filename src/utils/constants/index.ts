import logoMielo from '../../assets/image/logo-mielo.png';
import { Developer } from '../interfaces/interfaces';

export const NAME_STORAGE_TOKEN = 'token_d_2022';
export const RESET_TOKEN = '';

export const BASE_URL = 'https://mighty-earth-43476.herokuapp.com';
export const SIGNIN_URL = '/signin';
export const ALL_USERS_URL = '/users';

export const TEAM: Array<Developer> = [
  {
    name: 'Mentor: Maryna Rastargueva',
    github: 'https://github.com/maryna-js',
    avatarUrl: logoMielo,
    nickname: 'AndreyPesh',
    jobStatus: 'Team leader, Frontend-developer',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Andrey Peshko',
    github: 'https://github.com/AndreyPesh',
    avatarUrl: logoMielo,
    nickname: 'AndreyPesh',
    jobStatus: 'Team leader, Frontend-developer',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Nataliya Belyaeva',
    github: 'https://github.com/MielomankA',
    avatarUrl: logoMielo,
    nickname: 'MielomankA',
    jobStatus: 'Frontend-developer',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Umidullo Suyunov',
    github: 'https://github.com/umidullo',
    avatarUrl: logoMielo,
    nickname: 'umidullo',
    jobStatus: 'Frontend-developer',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];
