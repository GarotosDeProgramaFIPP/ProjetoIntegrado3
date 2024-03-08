const Database = require('../utils/database');
let db = new Database();

class UserModel {
    #UserId;
    #UserName;
    #UserEmail;
    #UserPassword;
    #UserActive;
    #PermitionId;

    constructor(){
        this.#UserId;
        this.#UserName;
        this.#UserEmail;
        this.#UserPassword;
        this.#UserActive;
        this.#PermitionId;
    }

    async getUserByName(userName){
        try {
            let res = await db.ExecutaComando(`SELECT * FROM tb_users WHERE UserName = "${userName}"`);
            console.log(res);
            this.#UserId = res[0].UserId;
            this.#UserName = res[0].UserName;
            this.#UserEmail = res[0].UserEmail;
            this.#UserPassword = res[0].UserPassword;
            this.#UserActive = res[0].UserActive;
            this.#PermitionId = res[0].PermitionId;
        } catch (error) {
            throw error;
        }

    }

    async getAllUsers(){
        try {
            let res = await db.ExecutaComando("SELECT * FROM tb_users");
            console.log(res);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;