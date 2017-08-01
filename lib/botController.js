module.exports = (botService) => {
    const botController = {}
    
    botController.parser = botService.message().parser()

    return botController
}