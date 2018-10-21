import * as React from 'react';

import { IUserProfile } from '../types';

const UserProfileContext = React.createContext<IUserProfile>({});

export { UserProfileContext }