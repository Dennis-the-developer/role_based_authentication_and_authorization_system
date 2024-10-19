export const roles = [
    {
        role: "admin",
        permissions: [
            "createUser",
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