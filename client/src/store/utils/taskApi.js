const axios = require("axios");
const taskUtils = {
    endTask: (task, robot) => {
        return axios({
            method: "POST",
            url: "/api/tasks",
            data: {
              task,
              robot
            }
          })
    },

};

module.exports = taskUtils;