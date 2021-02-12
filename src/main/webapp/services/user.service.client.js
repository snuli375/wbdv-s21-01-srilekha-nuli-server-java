function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001860326/users';
    var self = this;

    /**
     * accepts a user object and adds it to a collection of users
     * @param user
     */
    function createUser(user) {
        return $.post(this.url, user, 'json')
    }

    /**
     * retrieves all users as an array of JSON objects
     */
    function findAllUsers() {
        return $.getJSON(this.url)
    }

    /**
     * retrieves a single user object whose id is equal to the id parameter
     * @param userId
     */
    function findUserById(userId) {
        return $.getJSON(`${this.url}/${userId}`)
    }

    /**
     * accepts a user id and user object with new property values for the user with user id. Finds
     * the user whose id matches he id parameter and updates it with the values in the user
     * parameter
     * @param userId
     * @param user
     */
    function updateUser(userId, user) {
        return $.ajax(`${self.url}/${userId}`, { type : 'PUT', data: user})

    }

    /**
     * removes the user whose id matches the id parameter
     * @param userId
     */
    function deleteUser(userId) {
        return $.ajax(`${self.url}/${userId}`, { type : 'DELETE'})
    }
}
