import { userService } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';

export const useUser = (id: string) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const response = await userService.getUser(id);
            return response.data;
        },
        enabled: !!id,
    });
};
