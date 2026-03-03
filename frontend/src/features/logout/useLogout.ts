import { useAuthStore } from '../../entities/user';

export function useLogout() {
  return useAuthStore((s) => s.logout);
}
