export const roles = [
    {
        role: "admin",
        permissions: [
            "createUser",
            "assignRole",
            "updateUser",
            "deleteUser"
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