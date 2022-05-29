import logoMielo from '../../assets/image/logo-mielo.png';
import AndreyPesh from '../../assets/image/AndreyPesh.png';
import umidullo from '../../assets/image/umidullo.png';
import { Developer } from '../interfaces/interfaces';

export const RESET_TOKEN = '';
export const TOKEN = 'token';

// export const BASE_URL = 'https://mighty-earth-43476.herokuapp.com';
// export const BASE_URL = 'https://pure-chamber-11952.herokuapp.com';
export const BASE_URL = 'https://fierce-scrubland-40967.herokuapp.com';
export const SIGNIN_URL = '/signin';
export const SIGNUP_URL = '/signup';
export const ALL_USERS_URL = '/users';
export const CREATE_BOARD_URL = '/boards';
export const COLUMNS_URL = '/columns';
export const TASKS_URL = '/tasks';
export const PARAMS_ID_DASHBOARD = ':id';

export const GENERAL_ERROR_TEXT = 'Something went wrong';
export const EMPTY_STRING = '';

export const TAG_NAME_BUTTON = 'BUTTON';

export const TEAM: Array<Developer> = [
  {
    name: 'Mentor: Maryna Rastargueva',
    github: 'https://github.com/maryna-js',
    avatarUrl: '',
    nickname: 'maryna-js',
    jobStatus: 'Team leader, Frontend-developer',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Andrey Peshko',
    github: 'https://github.com/AndreyPesh',
    avatarUrl: AndreyPesh,
    nickname: 'AndreyPesh',
    jobStatus: 'Team leader, Frontend-developer',
    description: 'Router, main and board pages, CI/CD',
  },
  {
    name: 'Nataliya Belyaeva',
    github: 'https://github.com/MielomankA',
    avatarUrl: logoMielo,
    nickname: 'MielomankA',
    jobStatus: 'Frontend-developer',
    description: 'Welcome page, header/footer, edit profile',
  },
  {
    name: 'Umidullo Suyunov',
    github: 'https://github.com/umidullo',
    avatarUrl: umidullo,
    nickname: 'umidullo',
    jobStatus: 'Frontend-developer',
    description: 'Sign in/sing up, localization, validation forms',
  },
];

export const NAME_DATA_ATRR_SHOW_TASK = 'data-show';
