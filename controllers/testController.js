// TESTING CONNECTION


const testController = {
    testMethod: (req, res) => {
        const { time } = req.query

        setTimeout(() => {
            res.send(`Your request took ${time} seconds to complete`)
        }, time * 1000)
    }
}

module.exports = testController;