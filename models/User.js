module.exports = function (sequelize, DataTypes) {
    const Users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            defaultValue: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phonenumber: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })

    Users.sync();
    return Users;
}