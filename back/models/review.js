module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        movieId : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        title : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        rating : {
            type : DataTypes.STRING(10),
            allowNull : false,
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        }
    }, {
        charset : 'utf8mb4',
        dateString: true,
        collate : 'utf8mb4_general_ci',
    });

    //관계 설정
    Review.associate = (db) => {
        db.Review.belongsTo(db.User);
        db.Review.hasMany(db.Comment);
        db.Review.hasMany(db.Image);
    }
    
    return Review;
}