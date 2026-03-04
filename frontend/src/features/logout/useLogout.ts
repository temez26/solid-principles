import { useAuthRepository } from '../../entities/user';

export function useLogout() {
  return useAuthRepository().logout;
}