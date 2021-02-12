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
        return $.post(this.url,
                      user,
                      res => res,
                      'json')
    }

    /**
     * retrieves all users as an array of JSON objects
     */
    function findAllUsers() {
        return $.getJSON(this.url, res => res)
    }

    /**
     * retrieves a single user object whose id is equal to the id parameter
     * @param userId
     */
    function findUserById(userId) {
        return $.get(`${this.url}/${userId}`, res => res)
    }

    /**
     * accepts a user id and user object with new property values for the user with user id. Finds
     * the user whose id matches he id parameter and updates it with the values in the user
     * parameter
     * @param userId
     * @param user
     */
    function updateUser(userId, user) {
        return $.ajax(`${self.url}/${userId}`, { type : 'UPDATE'}).then(res => res.json())

    }

    /**
     * removes the user whose id matches the id parameter
     * @param userId
     */
    function deleteUser(userId) {
        return $.ajax(`${self.url}/${userId}`, { type : 'DELETE'}).then(res => res.json())
    }
}
