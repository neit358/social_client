import { userService } from '@/services/user.services';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useUpdate = () => {
    return useMutation({
        mutationKey: ['updateUser'],
        mutationFn: async (data: { id: string; name: string; file?: File }) => {
            const { id, name, file } = data;
            const formData = new FormData();
            if (file) formData.append('avatar', file);
            const response = await userService.updateUser(id, { name }, formData);
            return response;
        },
    });
};
