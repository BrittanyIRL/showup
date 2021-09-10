import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
    isVerifiedAccount: checkbox({
        defaultValue: false,
        label: 'User has been validated and may upload posters for all users to see'
    }),
    canManageUsers: checkbox({
        defaultValue: false,
        label: 'User can edit other users'
    }),
    canManageRoles: checkbox({
        defaultValue: false,
        label: 'User can update assigned roles'
    })
}