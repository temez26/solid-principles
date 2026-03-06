import { useAuthActions } from '../../entities/user';

export function useLogout() {
  return useAuthActions().logout;
}
