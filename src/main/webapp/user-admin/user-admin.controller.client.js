/**
 * User Admin Controller
 *
 * Handles events such as create user, find all users, find user by id, update user, and delete user
 */

(function () {
    let $usernameFld, $passwordFld;
    let $firstNameFld, $lastNameFld, $roleFld;
    let $createBtn, $updateBtn;
    let $tbody;
    let users, selectedUser;
    let userService = new AdminUserServiceClient();
    $(main);

    /**
     * executes on document load, when the browser is done parsing the html page and the dom is
     * ready. Retrieved the dom elements needed later in the controller such as the form elements,
     * action icons, and templates. Binds action icons, such as create, update, select, and delete,
     * to respective event handlers
     */
    function main() {
        $(document).ready(function () {
            // set jquery variables
            $usernameFld = $("#wd-username-input")
            $passwordFld = $("#wd-password-input")
            $firstNameFld = $("#wd-first-name-input")
            $lastNameFld = $("#wd-last-name-input")
            $roleFld = $("#wd-role-input")

            $tbody = $("#wd-users-table-body")

            $createBtn = $(".wd-create")
            $updateBtn = $(".wd-update")

            // add event listeners
            $createBtn.click(createUser)
            $updateBtn.click(updateUser)

            // render users
            userService.findAllUsers().then(serverUsers => {
                users = serverUsers
                renderUsers(users)
            })
        })
    }

    /**
     * handles create user event when user clicks on plus icon. Reads from the form elements and
     * creates a user object. Uses the user service createUser() function to create the new user.
     * Updates the list of users on server response
     */
    function createUser() {
        const newUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }
        userService.createUser(newUser).then(res => {
            users.push(res)
            renderUsers(users)
        })

    }

    /**
     * handles delete user event when user clicks the cross icon. Reads the user id from the icon
     * id attribute. Uses user service deleteUser() to send a delete request to the server. Updates
     * user list on server response
     */
    function deleteUser(e) {
        const target = $(e.target.closest("*[data-id]"))
        const id = target.attr("data-id")
        const index = target.attr("id")
        userService.deleteUser(id).then(status => {
            users.splice(index, 1)
            renderUsers(users)
        })
    }

    function selectUser(e) {
        const target = $(e.target.closest("*[id]"))
        const id = target.attr("id")
        selectedUser = users.find(u => u._id === id)
        $usernameFld.val(selectedUser.username)
        $passwordFld.val(selectedUser.password)
        $firstNameFld.val(selectedUser.firstName)
        $lastNameFld.val(selectedUser.lastName)
        $roleFld.val(selectedUser.role)
    }

    /**
     * handles update user event when user clicks on check mark icon. Reads the user id from the
     * icon id attribute. Reads new user values form the form, creates a user object and then uses
     * user service updateUser() to send the new user data to server. Updates user list on server
     * response
     */
    function updateUser() {
        const updatedUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val(),
            _id: selectedUser._id
        }
        userService.updateUser(selectedUser._id, updatedUser).then(status => {
            $($usernameFld, $passwordFld, $firstNameFld, $lastNameFld, $roleFld).val('')
            const index = users.findIndex(u => u._id == selectedUser._id)
            users[index] = {_id: selectedUser._id, ...updatedUser}
            console.log(users)
            renderUsers(users)
        })
    }

    /**
     * accepts an array of user instances, clears the current content of the table body, iterates
     * over the array of users, clones a table row template for each user instance, populates the
     * table row with the user object properties, adds the table row to the table body
     * @param users
     */
    function renderUsers(users) {
        $tbody.empty()
        // render users
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            $tbody.prepend(`
            <tr data-id="${user._id}">
                <td>${user.username}</td>
                <td></td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.role}</td>
                <td>
                    <div class="d-flex">
                        <button id="${i}" data-id="${user._id}" class="btn btn-light wd-delete">
                            <i class="fa fa-close"></i>
                        </button>
                        <button id="${user._id}" class="btn btn-light wd-edit">
                            <i class="fa fa-pencil"></i>
                        </button>
                    </div>
                </td>
            </tr>`)
        }

        // add event listeners
        $('.wd-edit').click(selectUser)
        $('.wd-delete').click(deleteUser)
    }

    // function findAllUsers() {
    // } // optional - might not need this
    // function findUserById() {
    // } // optional - might not need this
})();
