/**
 * User Admin Controller
 *
 * Handles events such as create user, find all users, find user by id, update user, and delete user
 */

(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn, $editBtn, $createBtn, $updateBtn;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
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
            $editBtn = $(".wd-edit")
            $removeBtn = $(".wd-delete")
            $updateBtn = $(".wd-update")

            // add event listeners
            $createBtn.click(createUser)
            $editBtn.click(selectUser)
            $updateBtn.click(updateUser)
            $removeBtn.click(deleteUser)

            // render users
            userService.findAllUsers().then(users => {
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
        console.log(newUser)
        const users = userService.createUser(newUser)
        renderUsers(userService.findAllUsers())
    }

    /**
     * handles delete user event when user clicks the cross icon. Reads the user id from the icon
     * id attribute. Uses user service deleteUser() to send a delete request to the server. Updates
     * user list on server response
     */
    function deleteUser(e) {
    }

    function selectUser() {
    }

    /**
     * handles update user event when user clicks on check mark icon. Reads the user id from the
     * icon id attribute. Reads new user values form the form, creates a user object and then uses
     * user service updateUser() to send the new user data to server. Updates user list on server
     * response
     */
    function updateUser() {
    }

    /**
     * accepts an array of user instances, clears the current content of the table body, iterates
     * over the array of users, clones a table row template for each user instance, populates the
     * table row with the user object properties, adds the table row to the table body
     * @param users
     */
    function renderUsers(users) {
        $tbody.empty()
        console.log(users)
        console.log(users.length)
        for (let i = 0; i < users.length; i++) {
            console.log(i)
            const user = users[i]
            console.log(user)
            $tbody.prepend(`
            <tr>
                <td>${user.username}</td>
                <td></td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.role}</td>
                <td>
                    <div class="d-flex">
                        <button id="${i}" class="btn btn-light wd-delete"><i class="fa fa-close"></i></button>
                        <button id="${user.username}" class="btn btn-light wd-edit"><i class="fa fa-pencil"></i></button>
                    </div>
                </td>
            </tr>`)
        }
    }

    // function findAllUsers() {
    // } // optional - might not need this
    // function findUserById() {
    // } // optional - might not need this
})();
