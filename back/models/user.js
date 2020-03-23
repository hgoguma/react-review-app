module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email : {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        nickname : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        password : {
            type : DataTypes.STRING(100),
            allowNull : false,
        }
    }, {
        charset : 'utf8',
        collate : 'utf8_general_ci',
    });

    //관계 설정
    User.associate = (db) => {
        db.User.hasMany(db.Review, { as : 'Reviews' });
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Review, { through: 'Like', as: 'Liked' });
    }
    
    return User;
}