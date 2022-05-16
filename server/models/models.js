const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique: true},
    name:{type: DataTypes.STRING},
    surname:{type: DataTypes.STRING},
    address:{type: DataTypes.STRING},
    password:{type: DataTypes.STRING},
    phone:{type: DataTypes.STRING, unique: true},
    role:{type: DataTypes.STRING, defaultValue: "USER"},
});

const Cart = sequelize.define('cart', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const CartItem = sequelize.define('cart_item', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Category = sequelize.define('category', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false, unique: true},
});

const Brand = sequelize.define('brand', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false, unique: true},
});

const Item = sequelize.define('item', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false, unique: true},
    price:{type: DataTypes.INTEGER, allowNull: false},
    rating:{type: DataTypes.INTEGER, defaultValue: 0},
    img:{type: DataTypes.STRING, allowNull: false},
    qty:{type: DataTypes.INTEGER, defaultValue: 0},
});

const ItemInfo = sequelize.define('item_info', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING, allowNull: false},
    desc:{type: DataTypes.STRING, allowNull: false},
});

const Rating = sequelize.define('rating', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate:{type: DataTypes.INTEGER, allowNull: false},
});

const BrandCategory = sequelize.define('brand_category', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate:{type: DataTypes.INTEGER, allowNull: false},
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Category.hasMany(Item);
Item.belongsTo(Category);

Brand.hasMany(Item);
Item.belongsTo(Brand);

Item.hasMany(Rating);
Rating.belongsTo(Item);

Item.hasMany(ItemInfo);
ItemInfo.belongsTo(Item);

Item.hasMany(CartItem);
CartItem.belongsTo(Item);

Category.belongsToMany(Brand, {through: BrandCategory});
Brand.belongsToMany(Category, {through: BrandCategory});


module.exports = {
    User,
    Cart,
    CartItem,
    Rating,
    Item,
    Category,
    Brand,
    ItemInfo,
    BrandCategory,
}