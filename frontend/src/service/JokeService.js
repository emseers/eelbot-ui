class JokeService {
    getAll() {
        return fetch('/joke').then(
            function(response) {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error()
                }
            }).then(
                function success(jokes) {
                    console.log(jokes)
                    return jokes
                },
                function failure() {
                    console.error('Could not retrieve jokes')
                }
            )
    }
}



export default new JokeService()