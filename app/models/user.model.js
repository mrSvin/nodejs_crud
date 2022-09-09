module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    uid: {
      type: Sequelize.UUID
    },
    email: {
      type: Sequelize.STRING(100)
    },
    password: {
      type: Sequelize.STRING(100)
    },
    nickname: {
      type: Sequelize.STRING(30)
    }
  });

  return User;
};
