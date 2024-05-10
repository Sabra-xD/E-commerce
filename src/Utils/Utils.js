

export const checkUserAdmin = (currentUser) => {
    console.log("The current user: ",currentUser);
    if(!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    
    const {userRoles} = currentUser;

    if(userRoles.includes('admin')) return true;

    return false;
}


