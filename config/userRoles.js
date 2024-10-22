export const roles = [
    {
        role: "admin",
        permissions: [
            "createUser",
            "assignRole",
            "updateUser",
            "deleteUser",
            // Profile
            "readOwnProfile",
            "updateOwnProfile"
        ]
    },
    {
        role: "user",
        permissions: [
            "readOwnProfile",
            "updateOwnProfile"
        ]
    },
    {
        role: "guest",
        permissions: [
            "viewPublicData"
        ]
    }
]