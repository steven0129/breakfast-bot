module.exports = (botService) => {
    const botController = {}

    botController.root = (req, res) => {
        res.send('you cannot access this page.')
    }

    botController.parser = botService.message().parser()

    return botController
}